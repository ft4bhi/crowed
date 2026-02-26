"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User } from "firebase/auth";
import { onAuthStateChanged } from "@/lib/firebase/auth";

// Module-level flag: login page sets this to prevent duplicate session POST
let _sessionAlreadySet = false;
export function markSessionSet() {
    _sessionAlreadySet = true;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
});

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(async (authUser) => {
            setUser(authUser);

            if (authUser && !_sessionAlreadySet) {
                // Set server-side httpOnly session cookie (skip if login page already did it)
                try {
                    const idToken = await authUser.getIdToken();
                    await fetch("/api/auth/session", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ idToken }),
                    });
                } catch (error) {
                    console.warn("Failed to set server session cookie:", error);
                }
            }
            // Reset the flag after consuming it
            _sessionAlreadySet = false;

            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading }}>
            {children}
        </AuthContext.Provider>
    );
}
