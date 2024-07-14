import React from "react";
import { ShoppingCart } from "lucide-react";
import styles from "../products.module.css";
function ProductHeader() {
  return (
    <div className={styles.ProductHeader}>
      <h1 className="text-3xl font-extrabold text-black sm:text-5xl">
        AMD SHOPE
        <strong className="block font-extrabold text-primary">
          {" "}
          <ShoppingCart size={48} strokeWidth={3} /> Product Page
        </strong>
      </h1>

      <p className="mt-4 max-w-lg text-black sm:text-xl/relaxed">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt illo
        tenetur fuga ducimus numquam ea!
      </p>
    </div>
  );
}

export default ProductHeader;
