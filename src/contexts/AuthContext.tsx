
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  accountType: 'architect' | 'supplier';
  phone?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (userData: Omit<User, 'id'> & { password: string }) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = async (email: string, password: string) => {
    // Simulação de login - em um app real, isso seria uma chamada para API
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // Busca o usuário salvo no localStorage pelos dados de cadastro
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
    } else {
      // Fallback para usuário padrão se não encontrar
      const defaultUser: User = {
        id: '1',
        name: 'Usuário',
        email: email,
        accountType: 'architect' // padrão
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

    // Salva o usuário na lista de usuários
    const savedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    savedUsers.push({ ...newUser, password: userData.password });
    localStorage.setItem('users', JSON.stringify(savedUsers));
    
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    login,
    signup,
    logout,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
