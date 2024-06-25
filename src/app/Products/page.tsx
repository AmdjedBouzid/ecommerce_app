"use client";
import { resolve } from "path";
import React from "react";
import CardProduct from "../_componnets/CardProduct";
import NavbarProduct from "../_componnets/NavbarProduct";
import styles from "../_componnets/componnets.module.css";
const Page = () => {
  return (
    <div className={styles.containerProduct}>
      <h1 className={styles.titleproducts}>Your best products</h1>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Excepturi eius
        adipisci, perspiciatis nostrum officiis ab sed velit qui quae
        voluptates.
      </p>
      <div className={styles.souscontainerProduct}>
        {/* <NavbarProduct /> */}
        <div className={styles.divProducts}>
          <CardProduct />
          <CardProduct />
          <CardProduct />
        </div>
      </div>
    </div>
  );
};

export default Page;
