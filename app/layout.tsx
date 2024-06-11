import type { Metadata } from "next";
import { Lato } from "next/font/google";
import { Header } from "../components/Header";
import "./globals.css";

const lato = Lato({ subsets: ["latin"], weight: ['400', '700']});

export const metadata: Metadata = {
  title: "My Personal Page",
  icons: "app/favicon.ico"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={lato.className}>
      <Header />  
        {children}
        </body>
    </html>
  );
}
