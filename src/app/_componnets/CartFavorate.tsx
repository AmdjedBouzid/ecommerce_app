import React, { useEffect, useState } from "react";
import CartItemFav from "./CartItemFav";
import { Product } from "../utils/types";
import axios from "axios";
import { useAppContext } from "@/context/login";

function CartFavorate() {
  const { ProductFav, SetProductFav } = useAppContext();

  const FetchFavorateProducts = async () => {
    try {
      const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN1;
      const Token = window.localStorage.getItem("Token");
      const response = await axios.get(`${DOMAIN}/api/products/favorateliste`, {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      });
      if (response.status === 200) {
        console.log(response.data);
        SetProductFav(response.data);
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    FetchFavorateProducts();
  }, []);

  return (
    <div className="h-[300px] w-[250px] bg-gray-100 z-10 rounded-md border shadow-sm absolute max-10 left-10 top-12 p-5 overflow-auto">
      <div className="mt-4 space-y-6">
        <ul className="space-y-4">
          {ProductFav &&
            ProductFav.map((product) => (
              <CartItemFav key={product.id} product={product} />
            ))}
        </ul>
      </div>
    </div>
  );
}

export default CartFavorate;
