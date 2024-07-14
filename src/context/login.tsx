"use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { request, UserDetails } from "@/app/utils/types";
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
interface PriceProduct {
  id: number;
  price: number;
}
interface ProductNumber {
  id: number;
  amount: number;
}
// Define the context type
interface AppContextType {
  user: UserDetails | null;
  setUser: React.Dispatch<React.SetStateAction<UserDetails | null>>;
  isLogedIn: boolean;
  setIsLogedIn: React.Dispatch<React.SetStateAction<boolean>>;
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  productsPagination: Product[];
  setProductsPagination: React.Dispatch<React.SetStateAction<Product[]>>;
  Users: UserDetails[];
  setUsers: React.Dispatch<React.SetStateAction<UserDetails[]>>;
  InputSearchUsers: string;
  SetInputSearchUsers: React.Dispatch<React.SetStateAction<string>>;
  SearcheUserBy: string;
  SetSearcheUserBy: React.Dispatch<React.SetStateAction<string>>;
  NumbrOfProducts: number;
  SetNumbrOfProducts: React.Dispatch<React.SetStateAction<number>>;
  categoryProduct: string;
  setCategoryProduct: React.Dispatch<React.SetStateAction<string>>;
  ProductFav: Product[] | null;
  SetProductFav: React.Dispatch<React.SetStateAction<Product[] | null>>;
  ProductToshope: Product[] | null;
  SetProductToshope: React.Dispatch<React.SetStateAction<Product[] | null>>;
  TotalPrice: PriceProduct[];
  SetTotalPrice: React.Dispatch<React.SetStateAction<PriceProduct[]>>;
  numberOfProducts: ProductNumber[];
  setNumberOfProducts: React.Dispatch<React.SetStateAction<ProductNumber[]>>;
  RequeseForProduct: request[];
  SetRequeseForProduct: React.Dispatch<React.SetStateAction<request[]>>;
}

// Create the context with the defined type
const AppContext = createContext<AppContextType | undefined>(undefined);

export function Provider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserDetails | null>(null);
  const [isLogedIn, setIsLogedIn] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [Users, setUsers] = useState<UserDetails[]>([]);
  const [InputSearchUsers, SetInputSearchUsers] = useState("");
  const [SearcheUserBy, SetSearcheUserBy] = useState("");
  const [NumbrOfProducts, SetNumbrOfProducts] = useState(0);
  const [productsPagination, setProductsPagination] = useState<Product[]>([]);
  const [categoryProduct, setCategoryProduct] = useState("All");
  const [ProductFav, SetProductFav] = useState<Product[] | null>(null);
  const [ProductToshope, SetProductToshope] = useState<Product[] | null>(null);
  const [TotalPrice, SetTotalPrice] = useState<PriceProduct[]>([]);
  const [numberOfProducts, setNumberOfProducts] = useState<ProductNumber[]>([]);
  const [RequeseForProduct, SetRequeseForProduct] = useState<request[]>([]);
  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        isLogedIn,
        setIsLogedIn,
        products,
        setProducts,
        Users,
        setUsers,
        InputSearchUsers,
        SetInputSearchUsers,
        SearcheUserBy,
        SetSearcheUserBy,
        NumbrOfProducts,
        SetNumbrOfProducts,
        productsPagination,
        setProductsPagination,
        categoryProduct,
        setCategoryProduct,
        ProductFav,
        SetProductFav,
        ProductToshope,
        SetProductToshope,
        TotalPrice,
        SetTotalPrice,
        numberOfProducts,
        setNumberOfProducts,
        RequeseForProduct,
        SetRequeseForProduct,
      }}
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
