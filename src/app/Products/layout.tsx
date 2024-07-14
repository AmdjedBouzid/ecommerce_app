import SideMenue from "./_ProductsComponnets/SideMenue";
import HeaderFpone from "./_ProductsComponnets/HeaderFpone";
import styles from "./products.module.css";
export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section className={styles.productpage}>
      <SideMenue />
      {children}
    </section>
  );
}
