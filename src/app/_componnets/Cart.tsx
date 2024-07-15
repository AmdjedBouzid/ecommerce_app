import React, { useEffect } from "react";
import CartItem from "./CartItem";
import Link from "next/link";
import { useAppContext } from "@/context/login";
import axios from "axios";
import { DOMAIN } from "../utils/constants";

function Cart() {
  const { ProductToshope, SetProductToshope } = useAppContext();
  const fetchToshopeProducts = async () => {
    try {
      const Token = window.localStorage.getItem("Token");
      const response = await axios.get(`${DOMAIN}/api/addtotoshopeliste`, {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      });
      if (response.status === 200) {
        console.log(response.data);
        SetProductToshope(response.data.products);
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchToshopeProducts();
  }, []);
  return (
    <div className="h-[300px] w-[250px] bg-gray-100 z-10 rounded-md border shadow-sm absolute max-10 right-10 top-12 p-5 overflow-auto">
      <div className="mt-4 space-y-6">
        <ul className="space-y-4">
          {ProductToshope &&
            ProductToshope.map((product) => (
              <CartItem key={product.id} product={product} />
            ))}
        </ul>
      </div>
      <div className="space-y-4 text-center mt-6">
        <Link
          href="/CartDetailles"
          className="block rounded border border-gray-600 px-5 py-3 text-clip text-gray-600 transition hover:ring-1 hover:ring-gray-400 bg-primary"
        >
          {` View my cart (${ProductToshope?.length})`}
        </Link>
      </div>
    </div>
  );
}

export default Cart;
