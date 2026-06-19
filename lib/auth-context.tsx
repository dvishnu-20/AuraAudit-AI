"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { mockUser } from "./mock-data";

interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: string;
  organization: string;
  avatar: string;
  region: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: AuthUser | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (data: Record<string, string>) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);

  const login = async (_email: string, _password: string) => {
    // Mock: any credentials work
    await new Promise((r) => setTimeout(r, 800));
    setUser(mockUser);
    setIsAuthenticated(true);
  };

  const signup = async (_data: Record<string, string>) => {
    await new Promise((r) => setTimeout(r, 1000));
    setUser(mockUser);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
