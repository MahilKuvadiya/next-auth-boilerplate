import { authOptions } from "@/utils/auth";
import NextAuth from "next-auth/next";

export const GET =  NextAuth(authOptions)
export const POST =  NextAuth(authOptions)