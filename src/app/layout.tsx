import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SessionProvider from "./SessionProvider";
import Navbar from "../components/organisms/Navbar/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SimRacingWebApp",
  description: "Hop on track",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className + " flex justify-center"}>
        <SessionProvider>
          <div className="flex flex-col py-10 gap-24 h-screen w-screen max-w-[816px]">
            <Navbar />
            <main className="self-strech">{children}</main>
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
