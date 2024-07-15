"use client";
import React, { useState } from "react";
import styles from "@/app/_componnets/componnets.module.css";
import Image from "next/image";
import axios from "axios";
import { Spinner, spinner } from "@nextui-org/react";
import { DOMAIN } from "../utils/constants";
interface Product {
  id: number;
  name: string;
  img: string;
  price: number;
  description: string;
  counter: number;
  category: string;
}

interface RowProps {
  product: Product;
  onDelete: (id: number) => void;
  onUpdate: (product: Product) => void;
}

const Row: React.FC<RowProps> = ({ product, onDelete, onUpdate }) => {
  const [isspinner, Setisspinner] = useState<boolean>(false);

  const HundlerDelete = async (id: number) => {
    const token = window.localStorage.getItem("Token");
    try {
      Setisspinner(true);
      const response = await axios.delete(
        `${DOMAIN}/api/products/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);

      onDelete(id); // Update the state in the parent component
      Setisspinner(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <tr>
      <td className="whitespace-nowrap px-4 py-2">{product.name}</td>
      <th className="whitespace-nowrap px-4 py-2">{product.price}</th>
      <td className="whitespace-nowrap px-4 py-2">{product.counter}</td>
      <td className="whitespace-nowrap px-4 py-2">
        <Image
          src={product.img}
          alt={product.name}
          className={styles.imgRow}
          width={50}
          height={50}
          priority
        />
      </td>
      <td className="whitespace-nowrap px-4 py-2">{product.category}</td>
      <td className="whitespace-nowrap px-4 py-2">
        <button
          onClick={() => onUpdate(product)}
          className={styles.buttonRow}
          style={{ backgroundColor: "#FB88B4" }}
        >
          update
        </button>
      </td>
      <td className="whitespace-nowrap px-4 py-2">
        <button
          disabled={isspinner}
          onClick={() => HundlerDelete(product.id)}
          className={styles.buttonRow}
          style={{ backgroundColor: "black", color: "white" }}
        >
          {isspinner ? (
            <Spinner color="primary" className="bg-color-gray" />
          ) : (
            <span>delete</span>
          )}
        </button>
      </td>
    </tr>
  );
};

export default Row;
