import React from "react";
import styles from "../products.module.css";
import ProductCarde from "./ProductCarde";
import { useAppContext } from "@/context/login";

function ProductsContainer() {
  const { productsPagination } = useAppContext();

  return (
    <div className={styles.productcontainer}>
      {productsPagination &&
        productsPagination.map((product) => (
          <ProductCarde key={product.id} product={product} />
        ))}
    </div>
  );
}

export default ProductsContainer;
