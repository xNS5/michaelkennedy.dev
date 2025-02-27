import type { Metadata } from "next";
import localFont from "next/font/local";
import { getDocument } from "@/db/db";
import { Config } from "@/types/config";
import React from "react";
import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar/navbar";
import {Suspense} from "react";
import Loading from "@/app/loading";

import "./globals.css";
import Header from "@/components/header/header";


const soraRegular = localFont({
  src: "./fonts/Sora-Regular.ttf",
  variable: "--font-sora-regular",
  weight: "100 900",
});

export let metadata: Metadata;

async function getMetadata(){
 const config: Config = await getDocument<Config>("config", "config");

 if(config){
  metadata = {
    title: config.metadata.title,
    description: config.metadata.description
   }
 }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await getMetadata();

  return (
    <html lang="en">
    <body
        className={`${soraRegular.variable} bg-[url(/images/bixby-bridge.png)] bg-cover  sm:bg-[center_-10rem] min-h-[100vh] bg-no-repeat h-full w-full bg-black`}
      >
      <header>
          <Navbar/>
      </header>
      <main id="main-content" >
          <Suspense fallback={<Loading/>}>
              {children}
          </Suspense>
      </main>
      <Footer/>
      </body>
    </html>
  );
}
