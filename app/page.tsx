"use client"; // Necessary for Next.js App Router components

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/home");
  }, [router]); // Runs only once on component mount

  return (
    <div>
      Redirecting to home...
    </div>
  );
}
