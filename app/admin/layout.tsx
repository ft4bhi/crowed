'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from '@/lib/firebase/auth';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(async (authUser) => {
      if (authUser && authUser.email) {
        try {
          // Lazy-load Firestore only when admin page is accessed
          const { getFirestore, doc, getDoc } = await import('firebase/firestore');
          const { firebaseApp } = await import('@/lib/firebase/config');
          const firestore = getFirestore(firebaseApp);

          const userDocRef = doc(firestore, 'adminemail', authUser.email);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const role = userDoc.data()?.role;
            if (role === 'admin' || role === 'superadmin') {
              setIsAuthenticated(true);
              setUserRole(role);
            } else {
              router.push('/login');
            }
          } else {
            router.push('/login');
          }
        } catch {
          console.warn('Could not verify admin status');
          router.push('/login');
        }
      } else {
        router.push('/login');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-1">
        <main className="flex-1 overflow-auto">
          <div className="flex-1 p-4 overflow-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout; 