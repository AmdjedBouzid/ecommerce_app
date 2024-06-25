import { z } from "zod";

export const cteatobjectvalidation = z.object({
  title: z.string().min(2, "lenth is less than 2").max(200),
  body: z.string().min(10, "lenth body is less than 10"),
});

export const regester = z.object({
  username: z.string().min(3, { message: "your name is invalid" }).max(100),
  email: z
    .string()
    .min(6, { message: "your email is invalid" })
    .max(100)
    .email(),
  password: z.string().min(6, { message: "your password is invalid" }),
});
export const Login = z.object({
  email: z
    .string()
    .min(10, { message: "your data is invalid" })
    .max(100)
    .email(),
  password: z.string().min(6, { message: "your data is invalid" }),
});

export const envSchema = z.object({
  SECRETJWTKEY: z.string().nonempty(),
});
