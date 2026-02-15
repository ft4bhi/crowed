export interface ScanResult {
    breed: string;
    confidence: number;
    health: string;
    estimatedPrice: string;
    weight: string;
    features: string[];
}

const MOCK_BREEDS = [
    { name: "Murrah Buffalo", price: "₹60,000 - ₹85,000", weight: "450-600 kg", features: ["Curved Horns", "High Milk Yield"] },
    { name: "Jersey Cow", price: "₹35,000 - ₹45,000", weight: "350-450 kg", features: ["High Fat Milk", "Docile"] },
    { name: "Holstein Friesian", price: "₹40,000 - ₹55,000", weight: "500-600 kg", features: ["High Volume Milk", "Black & White"] },
    { name: "Gir Cow", price: "₹45,000 - ₹65,000", weight: "380-480 kg", features: ["Humped Back", "Disease Resistant"] },
    { name: "Vechur Cow", price: "₹15,000 - ₹25,000", weight: "130-150 kg", features: ["Dwarf Breed", "Medicinal Milk"] },
];

export const analyzeImage = async (imageSrc: string): Promise<ScanResult> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            // Pick a random breed
            const breed = MOCK_BREEDS[Math.floor(Math.random() * MOCK_BREEDS.length)];

            resolve({
                breed: breed.name,
                confidence: Math.floor(Math.random() * (99 - 85) + 85),
                health: "Healthy",
                estimatedPrice: breed.price,
                weight: breed.weight,
                features: breed.features
            });
        }, 2500); // Simulate 2.5s analysis time
    });
};
