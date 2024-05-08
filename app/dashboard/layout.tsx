import type { Metadata } from "next";
import Navbar from "../globalComponents/navbar/Navbar";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
                <Navbar />
                {children}
        </body>
    </html>
  );
}
