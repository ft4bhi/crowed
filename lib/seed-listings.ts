import { db, pool } from "./db";
import { listings, users } from "./schema";
import { hash } from "crypto"; // just for ID gen if needed, or random

async function seed() {
    console.log("🌱 Seeding database...");

    try {
        // 1. Create a Seed User (Raju Farms)
        const sellerUid = "seed-user-raju";
        await db.insert(users).values({
            uid: sellerUid,
            userRole: "seller",
            phone: "+91 98765 43210",
            whatsappNumber: "+91 98765 43210",
            address: "Kochi, Kerala",
            farmingExperience: 15,
            profilePhoto: "https://api.dicebear.com/7.x/avataaars/svg?seed=Raju",
        }).onConflictDoNothing();

        // 2. Clear existing listings? Maybe not, just append.
        // await db.delete(listings); 

        // 3. Insert Mock Listings
        const mockListings = [
            {
                sellerUid,
                type: "Cow",
                breed: "Jersey",
                price: "45000",
                district: "Kochi",
                state: "Kerala",
                images: JSON.stringify(["https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?w=800&q=80"]), // Real placeholder
                milkProduction: "12",
                age: 3,
                ageUnit: "years",
                lactationStage: "Second",
                pregnancyStatus: "Yes",
                gender: "Female",
                status: "active",
                viewCount: 120,
            },
            {
                sellerUid,
                type: "Buffalo",
                breed: "Murrah",
                price: "60000",
                district: "Thrissur",
                state: "Kerala",
                images: JSON.stringify(["https://images.unsplash.com/photo-1504208434309-cb69f4fe52b0?w=800&q=80"]),
                milkProduction: "15",
                age: 4,
                ageUnit: "years",
                lactationStage: "Third",
                pregnancyStatus: "No",
                gender: "Female",
                status: "active",
                viewCount: 85,
            },
            {
                sellerUid,
                type: "Cow",
                breed: "HF Cross",
                price: "55000",
                district: "Palakkad",
                state: "Kerala",
                images: JSON.stringify(["https://images.unsplash.com/photo-1533282215383-6ab879058641?w=800&q=80"]),
                milkProduction: "18",
                age: 3,
                ageUnit: "years",
                lactationStage: "First",
                pregnancyStatus: "Yes",
                gender: "Female",
                status: "active",
                viewCount: 200,
            },
            {
                sellerUid,
                type: "Goat",
                breed: "Malabari",
                price: "12000",
                district: "Kozhikode",
                state: "Kerala",
                images: JSON.stringify(["https://images.unsplash.com/photo-1524024973431-2ad916746881?w=800&q=80"]),
                milkProduction: "2",
                age: 1,
                ageUnit: "years",
                lactationStage: "First",
                pregnancyStatus: "No",
                gender: "Female",
                status: "active",
                viewCount: 50,
            },
            {
                sellerUid,
                type: "Bull",
                breed: "Kangayam",
                price: "35000",
                district: "Coimbatore",
                state: "Tamil Nadu",
                images: JSON.stringify(["https://images.unsplash.com/photo-1551197779-115049b81372?w=800&q=80"]), // Bull img
                milkProduction: null,
                age: 2,
                ageUnit: "years",
                lactationStage: null,
                pregnancyStatus: "No",
                gender: "Male",
                status: "active",
                viewCount: 95,
            },
        ];

        console.log("📝 Inserting listings...");
        for (const listing of mockListings) {
            await db.insert(listings).values({
                ...listing,
                locationLat: "10.8505", // Mock lat
                locationLng: "76.2711", // Mock lng
            });
        }

        console.log("✅ Seeding complete!");
    } catch (error) {
        console.error("❌ Seeding failed:", error);
    } finally {
        pool.end();
    }
}

seed();
