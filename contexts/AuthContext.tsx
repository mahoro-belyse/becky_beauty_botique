"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session only on client side
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("becky_beauty_user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Mock login - replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API delay

      const mockUser = {
        id: "1",
        name:
          email.split("@")[0].charAt(0).toUpperCase() +
          email.split("@")[0].slice(1),
        email: email,
        avatar: "/placeholder.svg?height=40&width=40",
      };

      setUser(mockUser);
      if (typeof window !== "undefined") {
        localStorage.setItem("becky_beauty_user", JSON.stringify(mockUser));
      }
      return true;
    } catch (error) {
      return false;
    }
  };

  const signup = async (
    name: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      // Mock signup - replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API delay

      const mockUser = {
        id: Date.now().toString(),
        name: name,
        email: email,
        avatar: "/placeholder.svg?height=40&width=40",
      };

      setUser(mockUser);
      if (typeof window !== "undefined") {
        localStorage.setItem("becky_beauty_user", JSON.stringify(mockUser));
      }
      return true;
    } catch (error) {
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("becky_beauty_user");
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
