import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string; // ✅ Ensure user has an ID
  }

  interface Session {
    user: User; // ✅ Extend session to include user ID
  }
}
