import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import {ContextProvider} from "@/components/Context";
import RecoilSetup from "./components/Recoil";
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

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en"> 
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
         <link href="https://fonts.googleapis.com/css2?family=Irish+Grover&family=Hammersmith+One&display=swap" rel="stylesheet"/> 
         <link href="https://fonts.googleapis.com/css2?family=Irish+Grover&family=Hammersmith+One&family=Inknut+Antiqua:wght@400;700&display=swap" rel="stylesheet"></link>
         <link href="https://fonts.googleapis.com/css2?family=Inknut+Antiqua&display=swap" rel="stylesheet"></link>
         <ContextProvider>
          <RecoilSetup>
          {children}
          </RecoilSetup>
          </ContextProvider> 
        
      </body>
    </html>
  );
}
