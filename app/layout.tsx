import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";


//Providers
import NextUiProvider from "@/Providers/NextUiProvider";

//Components
import CNavbar from "@/Components/Navbar";
import { WarningBanner } from "@/Components/WarningBanner";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "$HANZ Faucet",
  description: "$HANZ token faucet",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'className='dark'>
      <body className={inter.className}>
        <NextUiProvider>
          <WarningBanner/>
          <CNavbar/>
          {children}
          </NextUiProvider>
      </body>
    </html>
  );
}
