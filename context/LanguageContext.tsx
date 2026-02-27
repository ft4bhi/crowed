"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, Language } from '@/lib/i18n/translations';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: keyof typeof translations['en']) => string;
    tDynamic: (text: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguage] = useState<Language>('en');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const savedLang = localStorage.getItem('app-language') as Language;
        if (savedLang && (savedLang === 'en' || savedLang === 'ml')) {
            setLanguage(savedLang);
        }
        setMounted(true);
    }, []);

    const handleSetLanguage = (lang: Language) => {
        setLanguage(lang);
        localStorage.setItem('app-language', lang);
    };

    const t = (key: keyof typeof translations['en']) => {
        return translations[language][key] || translations['en'][key] || key;
    };

    const tDynamic = (text: string) => {
        if (!text) return "";
        // Normalize key: "Holstein Friesian" -> "holsteinFriesian", "Cow" -> "cow"
        const key = text.charAt(0).toLowerCase() + text.slice(1).replace(/\s+/g, '');

        // Check if key exists in translations
        // @ts-ignore
        const translated = translations[language][key];
        if (translated) return translated;

        // Fallback: Try specific mappings if camelCase fails
        const map: Record<string, string> = {
            "HF Cross": "hfCross",
            "Red Sindhi": "redSindhi",
            "Other": "other",
            "Kasargod Dwarf": "kasargodDwarf",
            "Sunandini": "sunandini",
            "Kapila": "kapila",
            "Kangayam": "kangayam",

            // Sort Options
            "Latest": "latest",
            "Price: Low to High": "priceLowToHigh",
            "Price: High to Low": "priceHighToLow",
            "Milk: High to Low": "milkHighToLow",

            // Location Mappings
            "Kerala, IN": "kerala",
            "Tamil Nadu, IN": "tamilNadu",
            "Karnataka, IN": "karnataka",
            "Andhra Pradesh, IN": "andhraPradesh",
            "Telangana, IN": "telangana",
            "Maharashtra, IN": "maharashtra",
            "Gujarat, IN": "gujarat",
            "Rajasthan, IN": "rajasthan",
            "Punjab, IN": "punjab",
            "Haryana, IN": "haryana",

            "Coimbatore, IN": "coimbatore",
            "Wayanad, IN": "wayanad",
            "Kozhikode, IN": "kozhikode",
            "Kochi, IN": "kochi",
            // Add more specific districts if they appear in LocationPicker or listings
        };
        const mappedKey = map[text];
        // @ts-ignore
        if (mappedKey && translations[language][mappedKey]) return translations[language][mappedKey];

        return text;
    };

    // Avoid hydration mismatch by rendering children only after mount
    // ...

    return (
        <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t, tDynamic }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
