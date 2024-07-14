// import { Jwtpaylod } from "./types";
import { request } from "http";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { UserToken } from "@/app/utils/types";
import { any, boolean } from "zod";
const token_password = process.env.NEXT_PUBLIC_TOKEN_PASSWORD as string;
export function verifyToken(token: string): UserToken | null {
  try {
    const decoded = jwt.verify(token, token_password);
    return decoded as UserToken;
  } catch (error) {
    console.error("Error verifying token:", error);
    return null;
  }
}

// export function AdminValidation(authHeader: string | null): boolean {
//   if (!authHeader) {
//     return false;
//   }

//   const token = authHeader.split(" ")[1];
//   if (!token) {
//     return false;
//   }

//   let decoded: Jwtpaylod;
//   decoded = verifyToken(token) as Jwtpaylod;

//   if (decoded.isAdmin === false) {
//     return false;
//   }

//   return true;
// }
