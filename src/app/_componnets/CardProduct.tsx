import Link from "next/link";
import React from "react";
import styles from "./componnets.module.css";
const CardProduct = () => {
  return (
    <div className={styles.card}>
      <Link href="">
        {/* <img
          alt=""
          src="https://images.unsplash.com/photo-1613545325278-f24b0cae1224?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          className="h-56 w-full rounded-md object-cover"
        /> */}
      </Link>
    </div>
  );
};

export default CardProduct;
