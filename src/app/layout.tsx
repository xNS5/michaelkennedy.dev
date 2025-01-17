import type { Metadata } from "next";
import localFont from "next/font/local";
import { getDocument } from "@/db/db";
import { Config } from "@/lib/config-provider";
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

export let metadata: Metadata;

async function getMetadata(){
 const {config}: Config = await getDocument<Config>("config", "config");

 if(config){
  metadata = {
    title: config.title,
    description: config.description
   }
 }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await getMetadata();
  const {footer}: Config = await getDocument<Config>("config", "config");

  return (
    <html lang="en">
      <body
        className={`${soraRegular.variable} asilomar`}
      >
      <header>
          <Navbar/>
      </header>
      <main id="main-content">
          <Suspense fallback={<Loading/>}>
              {children}
          </Suspense>
      </main>
      <Footer footer={footer}/>
      </body>
    </html>
  );
}
