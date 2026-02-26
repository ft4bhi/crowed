"use server";

import { db } from "@/lib/db";
import { users } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { adminAuth } from "@/lib/firebase/firebaseadmin";
import { SESSION_COOKIE_NAME } from "@/lib/firebase/constants";

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

export async function getUserProfile() {
    try {
        const uid = await getAuthenticatedUid();
        if (!uid) return null;

        const result = await db
            .select()
            .from(users)
            .where(eq(users.uid, uid))
            .limit(1);

        return result[0] || null;
    } catch (error) {
        console.error("Error fetching user profile:", error);
        return null;
    }
}

export async function updateUserProfile(data: {
    displayName?: string;
    bio?: string;
    phone?: string;
    whatsappNumber?: string;
    address?: string;
    farmingExperience?: number;
}) {
    try {
        const uid = await getAuthenticatedUid();
        if (!uid) return { error: "Not authenticated" };

        // Ensure user row exists
        await db
            .insert(users)
            .values({ uid })
            .onConflictDoNothing({ target: users.uid });

        await db
            .update(users)
            .set({
                displayName: data.displayName || null,
                bio: data.bio || null,
                phone: data.phone || null,
                whatsappNumber: data.whatsappNumber || null,
                address: data.address || null,
                farmingExperience: data.farmingExperience || null,
            })
            .where(eq(users.uid, uid));

        return { success: true };
    } catch (error) {
        console.error("Error updating user profile:", error);
        return { error: "Failed to update profile" };
    }
}
