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
                images: ["/card-images/jersey.jpg"],
                milkProduction: "15",
                age: 3,
                ageUnit: "years",
                lactationStage: "Second",
                pregnancyStatus: "Yes",
                gender: "Female",
                status: "active",
                viewCount: 120,
                video: "https://www.w3schools.com/html/mov_bbb.mp4",
            },
            {
                sellerUid,
                type: "Cow",
                breed: "Holstein Friesian",
                price: "62000",
                district: "Thrissur",
                state: "Kerala",
                images: ["/card-images/Holstein.jpg"],
                milkProduction: "22",
                age: 4,
                ageUnit: "years",
                lactationStage: "Third",
                pregnancyStatus: "No",
                gender: "Female",
                status: "active",
                viewCount: 85,
                video: "https://www.w3schools.com/html/mov_bbb.mp4",
            },
            {
                sellerUid,
                type: "Buffalo",
                breed: "Murrah",
                price: "85000",
                district: "Palakkad",
                state: "Kerala",
                images: ["/card-images/Murrah.jpg"],
                milkProduction: "12",
                age: 5,
                ageUnit: "years",
                lactationStage: "Second",
                pregnancyStatus: "Yes",
                gender: "Female",
                status: "active",
                viewCount: 200,
                video: null,
            },
            {
                sellerUid,
                type: "Cow",
                breed: "Vechur",
                price: "35000",
                district: "Kottayam",
                state: "Kerala",
                images: ["/card-images/vechur.jpg"],
                milkProduction: "4",
                age: 4,
                ageUnit: "years",
                lactationStage: "First",
                pregnancyStatus: "No",
                gender: "Female",
                status: "active",
                viewCount: 50,
                video: "https://www.w3schools.com/html/mov_bbb.mp4",
            },
            {
                sellerUid,
                type: "Bull",
                breed: "Kangayam",
                price: "55000",
                district: "Erode",
                state: "Tamil Nadu",
                images: ["/card-images/Kangayam.jpg"],
                milkProduction: null,
                age: 3,
                ageUnit: "years",
                lactationStage: null,
                pregnancyStatus: "No",
                gender: "Male",
                status: "active",
                viewCount: 150,
                video: null,
            },
            {
                sellerUid,
                type: "Goat",
                breed: "Malabari",
                price: "12000",
                district: "Kozhikode",
                state: "Kerala",
                images: ["/card-images/malabari.jpg"],
                milkProduction: "2",
                age: 2,
                ageUnit: "years",
                lactationStage: "First",
                pregnancyStatus: "No",
                gender: "Female",
                status: "active",
                viewCount: 95,
                video: null,
            },
            {
                sellerUid,
                type: "Cow",
                breed: "HF Cross",
                price: "48000",
                district: "Wayanad",
                state: "Kerala",
                images: ["/card-images/hf-cross.jpg"],
                milkProduction: "18",
                age: 3,
                ageUnit: "years",
                lactationStage: "Second",
                pregnancyStatus: "Yes",
                gender: "Female",
                status: "active",
                viewCount: 70,
                video: null,
            }
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
