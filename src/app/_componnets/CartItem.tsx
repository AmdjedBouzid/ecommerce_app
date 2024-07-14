import React, { useState } from "react";
import Image from "next/image";
import { Button, Spinner } from "@nextui-org/react";
import { Trash } from "lucide-react";
import { Product } from "../utils/types";
import axios from "axios";
import { useAppContext } from "@/context/login";
import { toast } from "react-toastify";
interface CartoshopeItemProps {
  product: Product;
}
function CartItem({ product }: CartoshopeItemProps) {
  const { ProductToshope, SetProductToshope } = useAppContext();

  const [DeleteFaforateSpinner, SetDeleteFaforateSpinner] = useState(false);
  const HUNDLERDELETEFAVORATE = async (id: number) => {
    const Token = window.localStorage.getItem("Token");
    const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN1;

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
    <li className="flex items-center gap-4">
      <img src={product.img} alt="" className="size-16 rounded object-cover" />

      <div>
        <h3 className="text-sm text-gray-900">Basic Tee 6-Pack</h3>

        <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
          <div>
            <dt className="inline">price:</dt>
            <dd className="inline">{product.price}</dd>
          </div>

          <Button
            isIconOnly
            color="danger"
            aria-label="Like"
            onClick={() => HUNDLERDELETEFAVORATE(product.id)}
          >
            {DeleteFaforateSpinner ? (
              <Spinner color="default" className="" />
            ) : (
              <Trash size={16} strokeWidth={1.25} />
            )}
          </Button>
        </dl>
      </div>
    </li>
  );
}

export default CartItem;
