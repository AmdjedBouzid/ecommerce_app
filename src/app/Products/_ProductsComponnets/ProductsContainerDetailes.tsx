import React from "react";
import styles from "../products.module.css";
import ProductCarde from "./ProductCarde";
import { Product } from "@/app/utils/types";

interface ProductsContainerProps {
  products: Product[];
}

const ProductsContainerDetailes = ({ products }: ProductsContainerProps) => {
  return (
    <div className={styles.productcontainer}>
      {products.map((product) => (
        <ProductCarde key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductsContainerDetailes;
