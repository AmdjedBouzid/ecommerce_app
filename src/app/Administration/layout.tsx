"use client";
import React, { useState, useEffect } from "react";
import AdminLeft from "./AdminLeft";
import AdminLeftPhone from "./AdminLeftPhone";
import { verifyToken } from "@/app/utils/verifyToken";
import { redirect } from "next/navigation";
import { Jwtpaylod } from "../utils/types";
import jwt from "jsonwebtoken";
interface AdminProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminProps) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 700);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div style={{ display: "flex" }}>
      {isMobile ? <AdminLeftPhone /> : <AdminLeft />}
      {children}
    </div>
  );
};

export default AdminLayout;
