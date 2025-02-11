
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "example@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const prisma = new PrismaClient();
        const { email, password } = credentials as { email: string; password: string };
        if(!email || !password){
          throw new Error("Plase enter credentials");
        }
        const exitUser = await prisma.patient.findFirst({
          where:{
            email: email,
          }
        }) 
        if (exitUser) {
          if (exitUser.password === password) {
            return { id: exitUser.id, email: exitUser.email };
          }
          return null;
        }
        try{
          const newUser = await prisma.patient.create({
            data: {
              email: email,
              password: password,
            },
          });
          return { id: newUser.id, email: newUser.email };
        }catch(e){
          console.log(e);
          throw new Error("Invalid email or password");
        }

        throw new Error("Invalid email or password");
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async session({ session, token }) {
      if (token) {
        // @ts-expect-error - token.sub exists on JWT payload but not typed in session
        session.user.id = token.sub;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};



