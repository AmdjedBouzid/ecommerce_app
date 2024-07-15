"use client";
import React, { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";
import ProductHeader from "./ProductHeader";
import ProductsContainer from "./ProductsContainer";
import HeaderFpone from "./HeaderFpone";
import { Pagination } from "@nextui-org/react";
import { useAppContext } from "@/context/login";
import axios from "axios";
import { DevBundlerService } from "next/dist/server/lib/dev-bundler-service";
import connection from "@/app/config/db";

function ProductSection() {
  const {
    NumbrOfProducts,
    SetNumbrOfProducts,
    productsPagination,
    setProductsPagination,
    setCategoryProduct,
    categoryProduct,
    products,
  } = useAppContext();

  const FetchNumbrOfProducts = async () => {
    try {
      const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN1;
      const response = await axios.get(
        `https://vercel.com/amdjedbouzids-projects/ecommerce-app/api/products/number`
      );
      if (response.status === 200) {
        SetNumbrOfProducts(response.data.numberOfProducts);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const FetchProductForPagination = async (page: number) => {
    try {
      const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN1;
      const response = await axios.get(
        `https://vercel.com/amdjedbouzids-projects/ecommerce-app/api/products/pagination?pagenumber=${
          page - 1
        }&category=${categoryProduct}`
      );
      if (response.status === 200) {
        setProductsPagination(response.data.products);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    SetNumbrOfProducts(products.length);
    FetchProductForPagination(1);
  }, [products]);

  return (
    <div className="p-6">
      <ProductHeader />
      <HeaderFpone />
      <ProductsContainer />
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          marginTop: "40px",
        }}
      >
        <Pagination
          total={Math.ceil(NumbrOfProducts / 6)}
          initialPage={1}
          onChange={(page) => FetchProductForPagination(page)}
        />
      </div>
    </div>
  );
}

export default ProductSection;
