
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
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
        const { email, password } = credentials as { email: string; password: string };

        // Replace this with your actual authentication logic (e.g., database check)
        if (email === "admin@example.com" && password === "password123") {
          return { id: "1", name: "Admin User", email };
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






// export const authOptions = {
//   providers: [
//     GoogleProvider({
//         clientId: process.env.GOOGLE_CLIENT_ID!,
//         clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//       }),
//   ],
//   // pages:{
//   //   signIn: "/auth/signin",
//   // },
//   callbacks: {
//     //@ts-expect-error
//     async redirect({ url, baseUrl }) {
//       // console.log("1111111111----------------------------------------------------------------");
//       // console.log("URL: " + url);
//       // console.log("Base URL: " + baseUrl);
//       // console.log("1111111111111111----------------------------------------------------------------");
//       // // If the URL is already the sign-in page, don't modify i
//       // if (url.includes('/auth/signin')) return url
//       // // If it's the base URL, redirect to home
//       // if (url === baseUrl) return `${baseUrl}/home`

//       // console.log("222222222222222----------------------------------------------------------------");
//       // console.log("URL: " + url);
//       // console.log("Base URL: " + baseUrl);
//       // console.log("22222222222222222----------------------------------------------------------------");
//       // // Otherwise return the original URL
//       // url=baseUrl+"/home"; 
//       return url;
//     },
//     secret: process.env.NEXTAUTH_SECRET,
//     async session({ token, session }) {
//       session.user.id = token.sub
//       return session
//     }
//   }
// }
