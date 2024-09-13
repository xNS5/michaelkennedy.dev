import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { getCollection, getDocument } from "@/db/db";
import { Config } from "@/lib/config-provider";
import backgroundImage from "../../public/images/asilomar.jpg";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export let metadata: Metadata;

async function getMetadata(){
 const config: Config = await getDocument<Config>("config", "michaelkennedy");

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
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased asilomar`}
      >
        {children}
      </body>
    </html>
  );
}
