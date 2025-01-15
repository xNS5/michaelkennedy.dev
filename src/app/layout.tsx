import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { getDocument } from "@/db/db";
import { Config } from "@/lib/config-provider";
import React from "react";
import Footer from "@/components/footer/footer";

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
        className={`${soraRegular.variable}`}
      >
      <main id="main-content">
          {children}
      </main>
      <Footer footer={footer}/>
      </body>
    </html>
  );
}
