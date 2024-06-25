"use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { UserDetails } from "@/app/utils/types";
import jwt from "jsonwebtoken";
interface Product {
  id: number;
  name: string;
  img: string;
  price: number;
  description: string;
  counter: number;
  category: string;
}
// Define the context type
interface AppContextType {
  user: UserDetails | null;
  setUser: React.Dispatch<React.SetStateAction<UserDetails | null>>;
  isLogedIn: boolean;
  setIsLogedIn: React.Dispatch<React.SetStateAction<boolean>>;
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

// Create the context with the defined type
const AppContext = createContext<AppContextType | undefined>(undefined);

export function Provider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserDetails | null>(null);
  const [isLogedIn, setIsLogedIn] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);
  return (
    <AppContext.Provider
      value={{ user, setUser, isLogedIn, setIsLogedIn, products, setProducts }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppWrapper");
  }
  return context;
}
