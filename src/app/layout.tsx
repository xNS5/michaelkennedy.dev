
import localFont from "next/font/local";
import { getDocument } from "@/db/db";
import { Config } from "@/types/config";
import React from "react";
import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar/navbar";
import {Suspense} from "react";
import Loading from "@/app/loading";

import "./globals.css";

const soraRegular = localFont({
  src: "./fonts/Sora-Regular.ttf",
  variable: "--font-sora-regular",
  weight: "100 900",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
    <body
        className={`flex flex-col justify-center items-center ${soraRegular.variable} bg-[url(/images/bixby-bridge.png)] bg-cover bg-center bg-no-repeat bg-black`}
      >
      <header>
          <Navbar/>
      </header>
      <main id="main-content">
          <Suspense fallback={<Loading/>}>
              {children}
          </Suspense>
      </main>
      <Footer/>
      </body>
    </html>
  );
}
