"use server";

import { db } from "@/lib/db";
import { listings, users } from "@/lib/schema";
import { desc, eq, and, gte, lte, inArray, like, sql } from "drizzle-orm";
// @ts-ignore
import { uploadToCloudinary } from "@/lib/cloudinary";

const PAGE_SIZE = 10;

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
        milk?: number; // min milk
        lactation?: string[];
        pregnancy?: string; // "Yes", "No", "All"
        locationRadius?: number; // Not implemented yet without PostGIS
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
        conditions.push(gte(listings.price, filters.minPrice.toString())); // Cast to string for decimal
    }
    if (filters.maxPrice !== undefined) {
        conditions.push(lte(listings.price, filters.maxPrice.toString()));
    }
    if (filters.lactation && filters.lactation.length > 0) {
        conditions.push(inArray(listings.lactationStage, filters.lactation));
    }
    // Simplified logic for milk (greater than eq)
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
                location: listings.district, // using district as location for card
                image: sql<string>`${listings.images}->>0`, // Get first image
                video: listings.video,
                milk: listings.milkProduction,
                isPregnant: listings.pregnancyStatus, // Map to boolean in UI if needed or check string
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
            .select()
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
        const images: File[] = formData.getAll("images") as File[];
        const video = formData.get("video") as File;

        let imageUrls: string[] = [];
        let videoUrl = "";

        // Upload images
        if (images && images.length > 0) {
            for (const image of images) {
                if (image.size > 0) {
                    const url = await uploadToCloudinary(image, "cattle-marketplace/images");
                    // @ts-ignore
                    imageUrls.push(url);
                }
            }
        }

        // Upload video
        if (video && video.size > 0) {
            const url = await uploadToCloudinary(video, "cattle-marketplace/videos");
            // @ts-ignore
            videoUrl = url;
        }

        const rawData = {
            type: formData.get("type") as string,
            breed: formData.get("breed") as string,
            gender: formData.get("gender") as string,
            age: parseInt(formData.get("age") as string),
            ageUnit: formData.get("ageUnit") as string,
            milkProduction: formData.get("milkProduction") ? (formData.get("milkProduction") as string) : null,
            lactationStage: formData.get("lactationStage") as string,
            pregnancyStatus: formData.get("pregnancyStatus") as string,
            price: formData.get("price") as string,
            isNegotiable: formData.get("isNegotiable") === "true",
            locationLat: formData.get("latitude") as string,
            locationLng: formData.get("longitude") as string,
            district: formData.get("district") as string,
            state: formData.get("state") as string,
            sellerUid: "test-user-uid", // Replace with actual auth user ID
            images: JSON.stringify(imageUrls),
            video: videoUrl,
        };

        if (!rawData.type || !rawData.price) {
            return { error: "Missing required fields" };
        }

        await db.insert(listings).values({
            // @ts-ignore
            ...rawData,
            milkProduction: rawData.milkProduction ? rawData.milkProduction.toString() : null,
            locationLat: rawData.locationLat ? rawData.locationLat.toString() : null,
            locationLng: rawData.locationLng ? rawData.locationLng.toString() : null,
            images: rawData.images, // JSON string
        });

        return { success: true };
    } catch (error) {
        console.error("Error creating listing:", error);
        return { error: "Failed to create listing" };
    }
}

export async function getUserListings(userId: string) {
    try {
        const userListings = await db
            .select()
            .from(listings)
            .where(eq(listings.sellerUid, userId))
            .orderBy(desc(listings.createdAt));

        return userListings;
    } catch (error) {
        console.error("Error fetching user listings:", error);
        return [];
    }
}
