// Static data for the Encyclopedia / PashuMitra Dashboard

export const breedData = {
    labels: ["Gir", "Sahiwal", "Jersey", "HF"],
    yield: [12, 14, 20, 25],
    fatPercent: [4.8, 4.5, 4.5, 3.5],
};

export interface Disease {
    id: number;
    name: string;
    tags: string[];
    severity: "Critical" | "High" | "Medium";
    desc: string;
    symptoms: string;
    action: string;
}

export const diseases: Disease[] = [
    {
        id: 1,
        name: "Mastitis",
        tags: ["udder", "milk"],
        severity: "High",
        desc: "Inflammation of the udder tissue.",
        symptoms:
            "Swollen/hot udder, flakes/clots in milk, reduced yield.",
        action:
            "Improve hygiene, strip cup test, consult vet for antibiotics.",
    },
    {
        id: 2,
        name: "Foot & Mouth (FMD)",
        tags: ["mouth", "feet", "fever"],
        severity: "Critical",
        desc: "Highly contagious viral disease.",
        symptoms:
            "High fever, blisters on tongue/lips, lameness, excessive salivation.",
        action:
            "Quarantine immediately, potassium permanganate wash, soft diet.",
    },
    {
        id: 3,
        name: "Bloat (Tympanitis)",
        tags: ["stomach"],
        severity: "High",
        desc: "Gas accumulation in the rumen.",
        symptoms:
            "Distended left flank, difficulty breathing, kicking at belly.",
        action:
            "Walk the animal, feed vegetable oil (250ml), vet assistance.",
    },
    {
        id: 4,
        name: "Lumpy Skin Disease",
        tags: ["skin", "fever"],
        severity: "High",
        desc: "Viral disease transmitted by vectors.",
        symptoms:
            "Nodules on skin, fever, nasal discharge, swollen limbs.",
        action: "Isolate animal, control flies/ticks, supportive therapy.",
    },
    {
        id: 5,
        name: "Milk Fever",
        tags: ["weakness", "calving"],
        severity: "Medium",
        desc: "Calcium deficiency post-calving.",
        symptoms:
            "Inability to stand (S-shaped neck), muscle tremors, low temp.",
        action: "IV Calcium injection (Vet required).",
    },
    {
        id: 6,
        name: "Theileriosis",
        tags: ["fever", "lymph"],
        severity: "High",
        desc: "Tick-borne blood parasite.",
        symptoms: "High fever, swollen lymph nodes, anemia.",
        action: "Tick control, specific anti-protozoal drugs.",
    },
];

export interface Scheme {
    title: string;
    category: string;
    tags: string[];
    content: string;
}

export const schemes: Scheme[] = [
    {
        title: "Kisan Credit Card (KCC)",
        category: "Credit",
        tags: ["loan", "finance"],
        content:
            "Working capital loans up to ₹3 Lakhs at 4% effective interest rate (with prompt repayment). No collateral for smaller amounts.",
    },
    {
        title: "National Livestock Mission",
        category: "Subsidy",
        tags: ["fodder", "insurance"],
        content:
            "Subsidies for fodder block making units, silage units, and livestock insurance premiums.",
    },
    {
        title: "Rashtriya Gokul Mission",
        category: "Breed",
        tags: ["genetics", "indigenous"],
        content:
            "Focuses on conservation of indigenous breeds (Gir, Sahiwal) and establishing Gokul Grams.",
    },
    {
        title: "Pashu Dhan Bima Yojana",
        category: "Insurance",
        tags: ["risk", "death"],
        content:
            "Provides insurance cover against death of cattle. Premium subsidy up to 50-70% for SC/ST/Small farmers.",
    },
    {
        title: "Dairy Processing & Infra Fund",
        category: "Infrastructure",
        tags: ["machinery", "building"],
        content:
            "Loans for modernizing processing plants and creating value-added product machinery.",
    },
];

export const vaccinations = [
    {
        quarter: "Q1",
        months: "Jan – Feb",
        name: "FMD",
        desc: "Foot & Mouth (Booster)",
    },
    {
        quarter: "Q2",
        months: "May – Jun",
        name: "HS + BQ",
        desc: "Pre-Monsoon Combo",
    },
    {
        quarter: "Q3",
        months: "August",
        name: "Brucellosis",
        desc: "Calves (4-8 months)",
    },
    {
        quarter: "Q4",
        months: "Sep – Oct",
        name: "FMD",
        desc: "Foot & Mouth (Regular)",
    },
];
