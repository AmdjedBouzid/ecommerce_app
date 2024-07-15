"use client";
import React, { useEffect, useState } from "react";
import { Product } from "../utils/types";
import { useAppContext } from "@/context/login";
import axios from "axios";
import { toast } from "react-toastify";
import { Spinner } from "@nextui-org/spinner";
import { useRouter } from "next/navigation";
import { DOMAIN } from "../utils/constants";
interface CartDetailesProps {
  product: Product;
}

function CarteDetaillesItem({ product }: CartDetailesProps) {
  const router = useRouter();
  const {
    TotalPrice,
    SetTotalPrice,
    numberOfProducts,
    setNumberOfProducts,
    SetProductToshope,
    ProductToshope,
  } = useAppContext();
  const [NumerOfProducts, SetNumerOfProducts] = useState<number>(1);

  useEffect(() => {
    SetTotalPrice((prevTotalPrice) => {
      // Calculate the new total price for this product
      const newTotal = NumerOfProducts * product.price;

      // Check if the product already exists in the TotalPrice array
      const productIndex = prevTotalPrice.findIndex(
        (item) => item.id === product.id
      );

      if (productIndex !== -1) {
        // Update the existing total price for the product
        const newTotalPrice = [...prevTotalPrice];
        newTotalPrice[productIndex].price = newTotal;
        return newTotalPrice;
      } else {
        // Add the new total price for the product
        return [...prevTotalPrice, { id: product.id, price: newTotal }];
      }
    });
    setNumberOfProducts((prevProducts) => {
      const pr = prevProducts.findIndex((item) => item.id === product.id);
      if (pr !== -1) {
        const newProductAmount = [...prevProducts];
        newProductAmount[pr].amount = NumerOfProducts; // Fix the amount assignment here
        return newProductAmount;
      } else {
        return [...prevProducts, { id: product.id, amount: NumerOfProducts }];
      }
    });
  }, [NumerOfProducts]);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = Number(e.target.value);
    if (newQuantity > 0) {
      SetNumerOfProducts(newQuantity);
    }
  };
  const [DeleteFaforateSpinner, SetDeleteFaforateSpinner] = useState(false);
  const HUNDLERDELETEFAVORATE = async (id: number) => {
    const Token = window.localStorage.getItem("Token");

    try {
      SetDeleteFaforateSpinner(true);
      const response = await axios.delete(`${DOMAIN}/api/addtotoshopeliste`, {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
        data: {
          id: id,
        },
      });
      SetDeleteFaforateSpinner(false);

      if (response.status === 200) {
        const updatedProducts = ProductToshope?.filter(
          (item) => product.id !== item.id
        ) as Product[];
        SetProductToshope(updatedProducts);
        setNumberOfProducts((prevProducts) =>
          prevProducts.filter((item) => item.id !== product.id)
        );
        const NewTotalPrice = TotalPrice.filter(
          (item) => item.id !== product.id
        );
        SetTotalPrice(NewTotalPrice);

        toast.success(response.data.message);
        SetProductToshope(
          ProductToshope &&
            ProductToshope.filter((item) => product.id !== item.id)
        );
      } else {
        toast.error(response.data.message);
      }
    } catch (error: any) {
      SetDeleteFaforateSpinner(false);
      toast.error(error.data.message);
    }
  };
  return (
    <li className="flex items-center gap-4 shadow-sm border-primary rounded-sm">
      <img
        src={product.img}
        alt={product.name}
        className="size-16 rounded object-cover"
      />

      <div>
        <h3 className="text-sm text-gray-900">{product.name}</h3>

        <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
          <div>
            <dt className="inline">Price:</dt>
            <dd className="inline">{product.price}</dd>
          </div>
        </dl>
      </div>

      <div className="flex flex-1 items-center justify-end gap-2">
        <form>
          <label htmlFor="Line1Qty" className="sr-only">
            Quantity
          </label>
          <input
            type="number"
            min="1"
            className="h-8 w-12 rounded border-gray-200 bg-gray-50 p-0 text-center text-xs text-gray-600"
            value={NumerOfProducts}
            onChange={handleQuantityChange}
          />
        </form>

        {!DeleteFaforateSpinner ? (
          <button
            className="text-gray-600 transition hover:text-red-600"
            onClick={() => HUNDLERDELETEFAVORATE(product.id)}
          >
            <span className="sr-only">Remove item</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </button>
        ) : (
          <Spinner color="default" className="" />
        )}
      </div>
    </li>
  );
}

export default CarteDetaillesItem;
