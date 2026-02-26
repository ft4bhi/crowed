"use client";

import { useState } from "react";
import { signInWithGoogle } from "@/lib/firebase/auth";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { markSessionSet } from "@/context/AuthContext";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { t } = useLanguage();

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await signInWithGoogle();
      const user = result.user;
      const idToken = await user.getIdToken();

      await fetch("/api/auth/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      });

      // Signal AuthContext to skip its own duplicate session call
      markSessionSet();
      // Refresh server components so they pick up the new session cookie
      router.refresh();

      if (result.isAdmin) {
        router.push("/admin");
      } else {
        router.push("/");
      }
    } catch (err: any) {
      console.error("Google login error:", err);
      if (err?.code !== "auth/popup-closed-by-user") {
        setError(err?.message || "Failed to sign in with Google");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative orbs */}
      <div className="absolute top-20 left-10 w-48 h-48 bg-emerald-300 rounded-full opacity-15 blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-56 h-56 bg-teal-400 rounded-full opacity-10 blur-3xl"></div>
      <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-emerald-500 rounded-full opacity-10 blur-2xl"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="glass-card p-8 md:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0.8, rotate: -12 }}
              animate={{ scale: 1, rotate: 12 }}
              transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
              className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg shadow-emerald-600/30"
            >
              <span className="text-3xl">🐄</span>
            </motion.div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              {t('welcomeBack')}
            </h2>
            <p className="text-neutral-500 mt-2 font-medium">
              {t('signInToAccount')}
            </p>
          </div>

          {/* Google Login */}
          <motion.button
            onClick={handleGoogleLogin}
            disabled={loading}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="group w-full p-3.5 bg-white/60 backdrop-blur-xl border-2 border-white/50 rounded-2xl shadow-lg hover:shadow-xl hover:bg-white/80 transition-all focus:outline-none focus:ring-4 focus:ring-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed mb-6"
          >
            <div className="flex items-center justify-center space-x-3">
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-neutral-300 border-t-emerald-600 rounded-full animate-spin"></div>
                  <span className="text-sm font-bold text-neutral-700">{t('signingIn')}</span>
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48">
                    <path fill="#fbc02d" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
                    <path fill="#e53935" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
                    <path fill="#4caf50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
                    <path fill="#1565c0" d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                  </svg>
                  <span className="text-sm font-bold text-neutral-700 group-hover:text-emerald-700 transition-colors">
                    {t('continueWithGoogle')}
                  </span>
                </>
              )}
            </div>
          </motion.button>

          {/* Sign Up Link */}
          <p className="text-center text-sm text-neutral-500 font-medium">
            {t('dontHaveAccount')}{" "}
            <Link href="/signup" className="text-emerald-600 font-bold hover:text-emerald-700 transition-colors">
              {t('signUp')}
            </Link>
          </p>

          {/* Error */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-4 bg-red-50/80 backdrop-blur-lg border border-red-200/50 rounded-xl"
            >
              <p className="text-red-600 text-sm text-center font-medium">{error}</p>
            </motion.div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-6 flex items-center justify-center gap-2">
          <ShieldCheck size={14} className="text-emerald-500" />
          <p className="text-emerald-600/70 text-sm font-medium">
            {t('secureAuth')}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
