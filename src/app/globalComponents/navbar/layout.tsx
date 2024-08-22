import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./Navbar";
import { AuthProvider } from "@/app/AuthContext";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PetConnect Bosna",
  description: "Dobrodošli na prvu web aplikaciju za udomljavanje i pomoć svim životinjama na području čitave Bosne i Hercegovine",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Navbar />
        {children}
        </AuthProvider>
        </body>
    </html>
  );
}