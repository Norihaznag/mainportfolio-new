'use client';

import { useState, useEffect } from 'react';

interface ProtectedPageProps {
  children: React.ReactNode;
}

export function useAdminAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [admin, setAdmin] = useState<any>(null);
  const [router, setRouter] = useState<any>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/admin/auth/check');
        if (res.ok) {
          const data = await res.json();
          setAdmin(data);
          setIsLoggedIn(true);
        } else {
          // Redirect will be handled by the page using this hook
          setIsLoggedIn(false);
        }
      } catch (error) {
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  return { isLoggedIn, loading, admin };
}
