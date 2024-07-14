"use client";
import { resolve } from "path";
import React from "react";
import CardProduct from "../_componnets/CardProduct";
import NavbarProduct from "../_componnets/NavbarProduct";
import styles from "./products.module.css";
import FirstCompProducts from "./_ProductsComponnets/Collections";
import ProductSection from "./_ProductsComponnets/ProductPage";
import SideMenue from "./_ProductsComponnets/SideMenue";
import ProductPage from "./_ProductsComponnets/ProductPage";
const Page = () => {
  return (
    <div>
      <ProductPage />
    </div>
  );
};

export default Page;
