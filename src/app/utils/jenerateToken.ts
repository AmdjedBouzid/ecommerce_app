import Jwt from "jsonwebtoken";
import { UserDetails, UserToken } from "@/app/utils/types";
import { serialize } from "cookie";
const cecret = process.env.SECRETJWTKEY as string;
import { NextResponse } from "next/server";
if (!cecret) {
  console.log("SECRETJWTKEY is not defined in environment variables");
}
const token_password = process.env.NEXT_PUBLIC_TOKEN_PASSWORD as string;

export function jeneratejwt(user: UserToken): string {
  const token = Jwt.sign(user, token_password, {
    expiresIn: "20d",
  });
  return token;
}

// export function setcookie(user: Jwtpaylod): string {
//   const token = jeneratejwt(user);
//   const cookie = serialize("jwttoken", token, {
//     httpOnly: true,
//     secure: false,
//     sameSite: "strict",
//     path: "/",
//     maxAge: 60 * 60 * 24 * 33, // 30d
//   });
//   return token;
// }

// // Function to set the cookie with the token
// export function setCookie2(response: NextResponse, token: string) {
//   response.headers.append(
//     "Set-Cookie",
//     `token=${token}; Path=/; HttpOnly; Max-Age=${
//       20 * 24 * 60 * 60
//     }; Secure; SameSite=Strict`
//   );
// }
