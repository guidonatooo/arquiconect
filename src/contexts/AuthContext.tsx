
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { createClient } from '@supabase/supabase-js';

interface User {
  id: string;
  name: string;
  email: string;
  accountType: 'architect' | 'supplier';
  phone?: string;
}

interface SubscriptionInfo {
  subscribed: boolean;
  subscription_tier?: string;
  subscription_end?: string;
}

interface AuthContextType {
  user: User | null;
  subscription: SubscriptionInfo;
  login: (email: string, password: string) => Promise<void>;
  signup: (userData: Omit<User, 'id'> & { password: string }) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  checkSubscription: () => Promise<void>;
  createCheckout: (planType: string) => Promise<void>;
  openCustomerPortal: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [subscription, setSubscription] = useState<SubscriptionInfo>({
    subscribed: false
  });

  const login = async (email: string, password: string) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    const savedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const foundUser = savedUsers.find((u: any) => u.email === email);
    
    if (foundUser) {
      const userData: User = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        accountType: foundUser.accountType,
        phone: foundUser.phone
      };
      
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      
      // Check subscription after login
      await checkSubscription();
    } else {
      const defaultUser: User = {
        id: '1',
        name: 'Usuário',
        email: email,
        accountType: 'architect'
      };
      setUser(defaultUser);
      localStorage.setItem('user', JSON.stringify(defaultUser));
    }
  };

  const signup = async (userData: Omit<User, 'id'> & { password: string }) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    const newUser: User = {
      id: Date.now().toString(),
      name: userData.name,
      email: userData.email,
      accountType: userData.accountType,
      phone: userData.phone
    };

    const savedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    savedUsers.push({ ...newUser, password: userData.password });
    localStorage.setItem('users', JSON.stringify(savedUsers));
    
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  const checkSubscription = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase.functions.invoke('check-subscription');
      if (error) throw error;
      
      setSubscription({
        subscribed: data.subscribed || false,
        subscription_tier: data.subscription_tier,
        subscription_end: data.subscription_end
      });
    } catch (error) {
      console.error('Error checking subscription:', error);
      setSubscription({ subscribed: false });
    }
  };

  const createCheckout = async (planType: string) => {
    if (!user) throw new Error('User not authenticated');
    
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { planType }
      });
      if (error) throw error;
      
      // Open Stripe checkout in a new tab
      window.open(data.url, '_blank');
    } catch (error) {
      console.error('Error creating checkout:', error);
      throw error;
    }
  };

  const openCustomerPortal = async () => {
    if (!user) throw new Error('User not authenticated');
    
    try {
      const { data, error } = await supabase.functions.invoke('customer-portal');
      if (error) throw error;
      
      // Open customer portal in a new tab
      window.open(data.url, '_blank');
    } catch (error) {
      console.error('Error opening customer portal:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setSubscription({ subscribed: false });
    localStorage.removeItem('user');
  };

  // Check subscription on mount and when user changes
  useEffect(() => {
    if (user) {
      checkSubscription();
    }
  }, [user]);

  const value = {
    user,
    subscription,
    login,
    signup,
    logout,
    isAuthenticated: !!user,
    checkSubscription,
    createCheckout,
    openCustomerPortal
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
