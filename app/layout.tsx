import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./globalComponents/navbar/Navbar";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PetConnect Bosna",
  description: "Dobrodošli na prvu web aplikaciju za udomljavanje i pomoć svim životinjama na području čitave Bosne i Hercegovine",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <Navbar />
        {children}
        </body>
    </html>
  );
}
