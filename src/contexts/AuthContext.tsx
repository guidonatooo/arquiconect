
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { createClient, User as SupabaseUser } from '@supabase/supabase-js';

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
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (userData: Omit<User, 'id'> & { password: string }) => Promise<void>;
  logout: () => Promise<void>;
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

const buildUserFromSupabase = (supabaseUser: SupabaseUser): User => ({
  id: supabaseUser.id,
  name: supabaseUser.user_metadata?.name || supabaseUser.email?.split('@')[0] || 'Usuário',
  email: supabaseUser.email || '',
  accountType: supabaseUser.user_metadata?.accountType || 'architect',
  phone: supabaseUser.user_metadata?.phone,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [subscription, setSubscription] = useState<SubscriptionInfo>({ subscribed: false });

  useEffect(() => {
    // Restore session on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(buildUserFromSupabase(session.user));
      }
      setIsLoading(false);
    });

    // Listen to auth state changes
    const { data: { subscription: authSub } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) {
          setUser(buildUserFromSupabase(session.user));
        } else {
          setUser(null);
          setSubscription({ subscribed: false });
        }
      }
    );

    return () => authSub.unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      if (error.message.includes('Invalid login credentials')) {
        throw new Error('E-mail ou senha incorretos. Verifique seus dados e tente novamente.');
      }
      if (error.message.includes('Email not confirmed')) {
        throw new Error('Confirme seu e-mail antes de fazer login. Verifique sua caixa de entrada.');
      }
      throw new Error(error.message);
    }
  };

  const signup = async (userData: Omit<User, 'id'> & { password: string }) => {
    const { error } = await supabase.auth.signUp({
      email: userData.email,
      password: userData.password,
      options: {
        data: {
          name: userData.name,
          accountType: userData.accountType,
          phone: userData.phone,
        },
        emailRedirectTo: `${window.location.origin}/login`,
      },
    });
    if (error) {
      if (error.message.includes('already registered') || error.message.includes('already been registered')) {
        throw new Error('Este e-mail já está cadastrado. Faça login ou use outro e-mail.');
      }
      throw new Error(error.message);
    }
  };

  const checkSubscription = async () => {
    if (!user) return;
    try {
      const { data, error } = await supabase.functions.invoke('check-subscription');
      if (error) throw error;
      setSubscription({
        subscribed: data.subscribed || false,
        subscription_tier: data.subscription_tier,
        subscription_end: data.subscription_end,
      });
    } catch {
      setSubscription({ subscribed: false });
    }
  };

  const createCheckout = async (planType: string) => {
    if (!user) throw new Error('Usuário não autenticado');
    const { data, error } = await supabase.functions.invoke('create-checkout', {
      body: { planType },
    });
    if (error) throw error;
    window.open(data.url, '_blank');
  };

  const openCustomerPortal = async () => {
    if (!user) throw new Error('Usuário não autenticado');
    const { data, error } = await supabase.functions.invoke('customer-portal');
    if (error) throw error;
    window.open(data.url, '_blank');
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSubscription({ subscribed: false });
  };

  useEffect(() => {
    if (user?.id) {
      checkSubscription();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  return (
    <AuthContext.Provider value={{
      user,
      subscription,
      isLoading,
      login,
      signup,
      logout,
      isAuthenticated: !!user,
      checkSubscription,
      createCheckout,
      openCustomerPortal,
    }}>
      {children}
    </AuthContext.Provider>
  );
};
