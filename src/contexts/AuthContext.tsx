'use client';

import type { User } from '@/types';
import React, { createContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { useRouter } from 'next/navigation'; // Corrected import

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<boolean>;
  signup: (email: string, pass: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Simulate checking auth state on mount
    try {
      const storedUser = localStorage.getItem('shopwaveUser');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      localStorage.removeItem('shopwaveUser');
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (email: string, _pass: string): Promise<boolean> => {
    setLoading(true);
    // Simulate API call
    return new Promise(resolve => {
      setTimeout(() => {
        const mockUser: User = { 
          uid: `mock-uid-${email.replace(/[^a-zA-Z0-9]/g, '')}`, 
          email: email, 
          displayName: email.split('@')[0] 
        };
        setUser(mockUser);
        try {
          localStorage.setItem('shopwaveUser', JSON.stringify(mockUser));
        } catch (error) {
          console.error("Failed to set user in localStorage", error);
        }
        setLoading(false);
        resolve(true); // Indicate success
      }, 500);
    });
  }, []);

  const signup = useCallback(async (email: string, _pass: string): Promise<boolean> => {
    setLoading(true);
    // Simulate API call
    return new Promise(resolve => {
      setTimeout(() => {
        // For mock, signup is same as login
        const mockUser: User = { 
          uid: `mock-new-uid-${email.replace(/[^a-zA-Z0-9]/g, '')}`, 
          email: email, 
          displayName: email.split('@')[0] 
        };
        setUser(mockUser);
        try {
          localStorage.setItem('shopwaveUser', JSON.stringify(mockUser));
        } catch (error) {
          console.error("Failed to set user in localStorage", error);
        }
        setLoading(false);
        resolve(true); // Indicate success
      }, 500);
    });
  }, []);

  const logout = useCallback(async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 300));
    setUser(null);
    try {
      localStorage.removeItem('shopwaveUser');
    } catch (error) {
      console.error("Failed to remove user from localStorage", error);
    }
    setLoading(false);
    router.push('/'); // Redirect to home on logout
  }, [router]);

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {!loading ? children : (
        <div className="flex items-center justify-center min-h-screen">
          {/* You can replace this with a proper spinner component */}
          <p>Loading ShopWave...</p>
        </div>
      )}
    </AuthContext.Provider>
  );
};
