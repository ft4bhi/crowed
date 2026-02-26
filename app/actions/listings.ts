"use server";

import { db } from "@/lib/db";
import { listings, users } from "@/lib/schema";
import { desc, eq, and, gte, lte, inArray, sql } from "drizzle-orm";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { cookies } from "next/headers";
import { adminAuth } from "@/lib/firebase/firebaseadmin";
import { SESSION_COOKIE_NAME } from "@/lib/firebase/constants";
import { revalidatePath } from "next/cache";

const PAGE_SIZE = 10;

/**
 * Verify the current user's session and return their UID.
 * Returns null if not authenticated.
 */
async function getAuthenticatedUid(): Promise<string | null> {
    try {
        const cookieStore = await cookies();
        const session = cookieStore.get(SESSION_COOKIE_NAME)?.value;
        if (!session || !adminAuth) return null;

        const decoded = await adminAuth.verifyIdToken(session);
        return decoded.uid;
    } catch {
        return null;
    }
}

export async function getListings({
    page = 1,
    filters = {},
}: {
    page?: number;
    filters?: {
        type?: string[];
        breed?: string[];
        minPrice?: number;
        maxPrice?: number;
        milk?: number;
        lactation?: string[];
        pregnancy?: string;
        locationRadius?: number;
        origin?: string;
    };
}) {
    const conditions = [eq(listings.status, "active")];

    if (filters.type && filters.type.length > 0) {
        conditions.push(inArray(listings.type, filters.type));
    }
    if (filters.breed && filters.breed.length > 0) {
        conditions.push(inArray(listings.breed, filters.breed));
    }
    if (filters.minPrice !== undefined) {
        conditions.push(gte(listings.price, filters.minPrice.toString()));
    }
    if (filters.maxPrice !== undefined) {
        conditions.push(lte(listings.price, filters.maxPrice.toString()));
    }
    if (filters.lactation && filters.lactation.length > 0) {
        conditions.push(inArray(listings.lactationStage, filters.lactation));
    }
    if (filters.milk) {
        conditions.push(gte(listings.milkProduction, filters.milk.toString()));
    }

    const offset = (page - 1) * PAGE_SIZE;

    try {
        const data = await db
            .select({
                id: listings.id,
                type: listings.type,
                breed: listings.breed,
                price: listings.price,
                location: listings.district,
                image: sql<string>`${listings.images}->>0`,
                video: listings.video,
                milk: listings.milkProduction,
                isPregnant: listings.pregnancyStatus,
                gender: listings.gender,
                createdAt: listings.createdAt,
            })
            .from(listings)
            .where(and(...conditions))
            .limit(PAGE_SIZE)
            .offset(offset)
            .orderBy(desc(listings.createdAt));

        return { data, nextId: data.length === PAGE_SIZE ? page + 1 : null };
    } catch (error) {
        console.error("Error fetching listings:", error);
        return { data: [], nextId: null, error: "Failed to fetch listings" };
    }
}

export async function getListingById(id: number) {
    try {
        const listing = await db
            .select()
            .from(listings)
            .where(eq(listings.id, id))
            .limit(1);

        if (!listing.length) return null;

        const seller = await db
            .select({
                uid: users.uid,
                displayName: users.displayName,
                bio: users.bio,
                phone: users.phone,
                whatsappNumber: users.whatsappNumber,
                farmingExperience: users.farmingExperience,
                profilePhoto: users.profilePhoto,
                userRole: users.userRole,
            })
            .from(users)
            .where(eq(users.uid, listing[0].sellerUid))
            .limit(1);

        return { ...listing[0], seller: seller[0] || null };
    } catch (error) {
        console.error("Error fetching listing details:", error);
        return null;
    }
}

export async function createListing(formData: FormData) {
    try {
        // Authenticate user from session cookie
        const sellerUid = await getAuthenticatedUid();
        if (!sellerUid) {
            return { error: "You must be logged in to create a listing" };
        }

        const images: File[] = formData.getAll("images") as File[];
        const video = formData.get("video") as File | null;

        const imageUrls: string[] = [];
        let videoUrl = "";

        // Upload images to Cloudinary
        if (images && images.length > 0) {
            for (const image of images) {
                if (image.size > 0) {
                    const url = await uploadToCloudinary(image, "cattle-marketplace/images");
                    imageUrls.push(url as string);
                }
            }
        }

        // Upload video to Cloudinary
        if (video && video.size > 0) {
            videoUrl = (await uploadToCloudinary(video, "cattle-marketplace/videos")) as string;
        }

        const type = formData.get("type") as string;
        const price = formData.get("price") as string;

        if (!type || !price) {
            return { error: "Type and price are required" };
        }

        const milkProd = formData.get("milkProduction") as string | null;
        const lat = formData.get("latitude") as string | null;
        const lng = formData.get("longitude") as string | null;

        // Ensure user exists in the users table (FK constraint)
        await db
            .insert(users)
            .values({ uid: sellerUid })
            .onConflictDoNothing({ target: users.uid });

        await db.insert(listings).values({
            sellerUid,
            type,
            breed: (formData.get("breed") as string) || null,
            gender: (formData.get("gender") as string) || null,
            age: formData.get("age") ? parseInt(formData.get("age") as string) : null,
            ageUnit: (formData.get("ageUnit") as string) || "years",
            milkProduction: milkProd || null,
            lactationStage: (formData.get("lactationStage") as string) || null,
            pregnancyStatus: (formData.get("pregnancyStatus") as string) || null,
            price,
            isNegotiable: formData.get("isNegotiable") === "true",
            locationLat: lat || null,
            locationLng: lng || null,
            district: (formData.get("district") as string) || null,
            state: (formData.get("state") as string) || null,
            images: imageUrls,
            video: videoUrl || null,
        });

        revalidatePath("/");
        return { success: true };
    } catch (error) {
        console.error("Error creating listing:", error);
        return { error: "Failed to create listing" };
    }
}

export async function getUserListings(userId?: string) {
    try {
        const uid = userId || (await getAuthenticatedUid());
        if (!uid) return [];

        const userListings = await db
            .select()
            .from(listings)
            .where(eq(listings.sellerUid, uid))
            .orderBy(desc(listings.createdAt));

        return userListings;
    } catch (error) {
        console.error("Error fetching user listings:", error);
        return [];
    }
}

export async function getMyListingsStats() {
    try {
        const uid = await getAuthenticatedUid();
        if (!uid) return { listed: 0, sold: 0, views: 0 };

        const result = await db
            .select({
                listed: sql<number>`count(*) filter (where ${listings.status} = 'active')`,
                sold: sql<number>`count(*) filter (where ${listings.status} = 'sold')`,
                views: sql<number>`coalesce(sum(${listings.viewCount}), 0)`,
            })
            .from(listings)
            .where(eq(listings.sellerUid, uid));

        const row = result[0];
        return {
            listed: Number(row?.listed ?? 0),
            sold: Number(row?.sold ?? 0),
            views: Number(row?.views ?? 0),
        };
    } catch (error) {
        console.error("Error fetching user stats:", error);
        return { listed: 0, sold: 0, views: 0 };
    }
}

export async function deleteListing(id: number) {
    try {
        const uid = await getAuthenticatedUid();
        if (!uid) return { error: "You must be logged in" };

        // Verify ownership
        const existing = await db
            .select({ sellerUid: listings.sellerUid })
            .from(listings)
            .where(eq(listings.id, id))
            .limit(1);

        if (!existing.length || existing[0].sellerUid !== uid) {
            return { error: "Listing not found or unauthorized" };
        }

        await db.delete(listings).where(eq(listings.id, id));
        revalidatePath("/");
        revalidatePath("/settings/my-listings");
        return { success: true };
    } catch (error) {
        console.error("Error deleting listing:", error);
        return { error: "Failed to delete listing" };
    }
}

export async function markAsSold(id: number) {
    try {
        const uid = await getAuthenticatedUid();
        if (!uid) return { error: "You must be logged in" };

        const existing = await db
            .select({ sellerUid: listings.sellerUid })
            .from(listings)
            .where(eq(listings.id, id))
            .limit(1);

        if (!existing.length || existing[0].sellerUid !== uid) {
            return { error: "Listing not found or unauthorized" };
        }

        await db
            .update(listings)
            .set({ status: "sold" })
            .where(eq(listings.id, id));

        revalidatePath("/");
        revalidatePath("/settings/my-listings");
        return { success: true };
    } catch (error) {
        console.error("Error marking listing as sold:", error);
        return { error: "Failed to mark as sold" };
    }
}

export async function incrementViewCount(id: number) {
    try {
        await db
            .update(listings)
            .set({ viewCount: sql`coalesce(${listings.viewCount}, 0) + 1` })
            .where(eq(listings.id, id));
    } catch (error) {
        // Fire-and-forget — don't break the page if this fails
        console.error("Error incrementing view count:", error);
    }
}
