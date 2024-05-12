import type { Metadata } from "next";
import Navbar from "../globalComponents/navbar/Navbar";
import { Inter } from "next/font/google";
import "@/app/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function RootLayout({ children }: { children: React.ReactNode }){
  return (
    <html lang="en">
        <body className={inter.className}>
          <Navbar />
          {children}
        </body>
    </html>
  );
}
