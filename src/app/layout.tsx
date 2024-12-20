"use client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import NavBar from "@/app/_componnets/NavBar"; // Corrected the typo in the path
import { Lato } from "next/font/google";
import { Provider } from "@/context/login"; // Grouped imports from the same module
import useFetchUser from "@/app/utils/usehot"; // Import the custom hook
import NextUIProvider from "./NextUIProvider";

const lato = Lato({ subsets: ["latin"], weight: "400" }); // Renamed to avoid conflict with inter

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={lato.className}>
        <Provider>
          <NextUIProvider>
            <ToastContainer />
            <NavBar />
            {children}
          </NextUIProvider>
        </Provider>
      </body>
    </html>
  );
}
