import type { Metadata } from "next";
import "./globals.css";
import { Provider } from "./Provider";





export const metadata: Metadata = {
  title: "MediPredict",
  description: "Doctor consult app with online diagnostics and nearby hospital diagnostics",
  // icons: {
  //   icon: '/c.png',
  // }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
      >
        <Provider >
          {children}
        </Provider>
      </body>
    </html>
  );
}
