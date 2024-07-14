import { Button, Spinner } from "@nextui-org/react";
import { ShoppingCart, Trash, X } from "lucide-react";
import React, { useState } from "react";
import { Product } from "../utils/types";
import axios from "axios";
import { toast } from "react-toastify";
import { useAppContext } from "@/context/login";
import { useRouter } from "next/navigation";
interface CartItemFavProps {
  product: Product;
}
const CartItemFav: React.FC<CartItemFavProps> = ({ product }) => {
  const router = useRouter();
  const { ProductFav, SetProductFav, SetProductToshope, ProductToshope } =
    useAppContext();
  const [DeleteFaforateSpinner, SetDeleteFaforateSpinner] = useState(false);
  const [AddToSopeCard, SetAddToSopeCard] = useState(false);
  const HUNDLERDELETEFAVORATE = async (id: number) => {
    const Token = window.localStorage.getItem("Token");
    const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN1;

    try {
      SetDeleteFaforateSpinner(true);
      const response = await axios.delete(`${DOMAIN}/api/addtofavorate`, {
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
        SetProductFav(
          ProductFav && ProductFav.filter((item) => product.id !== item.id)
        );
      } else {
        toast.error(response.data.message);
      }
    } catch (error: any) {
      SetDeleteFaforateSpinner(false);
      toast.error(error.data.message);
    }
  };

  const handleAddToCart = async (id: number) => {
    const Token = window.localStorage.getItem("Token");
    const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN1;

    try {
      SetAddToSopeCard(true);
      const response = await axios.post(
        `${DOMAIN}/api/addtotoshopeliste`,
        { id: id },
        {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        }
      );

      SetAddToSopeCard(false);
      if (response.status === 200) {
        const updatedProducts = ProductToshope
          ? [...ProductToshope, product]
          : [product];
        SetProductToshope(updatedProducts);
        toast.success("product added to to Sope liste");
      } else toast.error(response.data.message);
    } catch (error: any) {
      SetAddToSopeCard(false);
      toast.error(error.response.data.message);
    }
  };

  return (
    <li className="flex items-center gap-4">
      <img src={product.img} alt="" className="size-16 rounded object-cover" />

      <div>
        <h3 className="text-sm text-gray-900">{product.name}</h3>

        <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
          <div>
            <dt className="inline">price:</dt>
            <dd className="inline">{product.price}</dd>
          </div>
          <div className="flex gap-6">
            <Button
              isIconOnly
              color="danger"
              aria-label="Like"
              onClick={() => handleAddToCart(product.id)}
            >
              {AddToSopeCard ? (
                <Spinner color="default" className="" />
              ) : (
                <ShoppingCart />
              )}
            </Button>
            <Button
              isIconOnly
              color="danger"
              aria-label="Like"
              onClick={() => HUNDLERDELETEFAVORATE(product.id)}
            >
              {DeleteFaforateSpinner ? (
                <Spinner color="default" className="" />
              ) : (
                <Trash />
              )}
            </Button>
          </div>
        </dl>
      </div>
    </li>
  );
};

export default CartItemFav;
