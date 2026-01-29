import React, { createContext, useContext, useState, ReactNode } from "react";
import { User } from "../types"; // User type jo humne types/index.ts mein banayi thi

// Context mein yeh sab cheezein available honge
interface AuthContextType {
  user: User | null; // Logged-in user ki details, ya null
  login: (userData: User) => void; // Login karne ka function
  logout: () => void; // Logout karne ka function
  isAuthenticated: boolean; // Kya user logged-in hai? (True/False)
  isAdmin: boolean; // Kya user admin hai? (True/False)
  token: string | null; // User ka JWT token
}

// Context ko create karein
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // State ko initialize karte waqt localStorage se user ki info load karein
  const [user, setUser] = useState<User | null>(() => {
    try {
      const savedUser = localStorage.getItem("userInfo");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      console.error("Failed to parse user info from localStorage", error);
      return null;
    }
  });

  // Login function
  const login = (userData: User) => {
    setUser(userData);
    // User ki details ko localStorage mein save karein
    localStorage.setItem("userInfo", JSON.stringify(userData));
  };

  // Logout function
  const logout = () => {
    setUser(null);
    // User ki details ko localStorage se remove karein
    localStorage.removeItem("userInfo");
    // Cart ko bhi clear kar dein (optional, lekin acha hai)
    localStorage.removeItem("cartItems");
  };

  // Derived values (in values ko state se calculate karein)
  const isAuthenticated = !!user; // Agar user hai toh true, warna false
  const isAdmin = user?.role === "admin"; // Check karein ke user admin hai ya nahi
  const token = user?.token || null; // Token provide karein

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAuthenticated, isAdmin, token }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Yeh ek custom hook hai taake AuthContext ko aasani se use kar sakein
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
