import React, { use } from "react";
import styles from "./_administrationComponnets/administration.module.css";
import FormProduct from "./_administrationComponnets/Formpproduct";
import Formpproduct from "./_administrationComponnets/Formpproduct";

const Page = () => {
  return (
    <div className={styles.body}>
      <Formpproduct />
    </div>
  );
};

export default Page;
