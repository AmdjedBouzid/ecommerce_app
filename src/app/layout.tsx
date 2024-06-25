"use client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import NavBar from "@/app/_componnets/NavBar"; // Corrected the typo in the path
import { Lato } from "next/font/google";
import { Provider } from "@/context/login"; // Grouped imports from the same module
import useFetchUser from "@/app/utils/usehot"; // Import the custom hook
import { useEffect } from "react";
import { useAppContext } from "@/context/login";
import NextUIProvider from "./NextUIProvider";
const lato = Lato({ subsets: ["latin"], weight: "400" }); // Renamed to avoid conflict with inter

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider>
      <RootContent>{children}</RootContent>
    </Provider>
  );
}

function RootContent({ children }: { children: React.ReactNode }) {
  useFetchUser();

  return (
    <html lang="en">
      <body className={lato.className}>
        <NextUIProvider>
          <ToastContainer />
          <NavBar />
          {children}
        </NextUIProvider>
      </body>
    </html>
  );
}
