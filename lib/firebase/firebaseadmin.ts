import admin from 'firebase-admin';

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  try {
    const serviceAccountKey = process.env.FIREBASE_ADMIN_SDK_KEY;
    if (serviceAccountKey) {
      admin.initializeApp({
        credential: admin.credential.cert(JSON.parse(serviceAccountKey)),
      });
    } else {
      console.warn("FIREBASE_ADMIN_SDK_KEY is missing, skipping Firebase Admin initialization.");
    }
  } catch (error) {
    console.error("Firebase Admin SDK initialization failed:", error);
  }
}

export const adminAuth = admin.auth();
export const adminFirestore = admin.firestore();
