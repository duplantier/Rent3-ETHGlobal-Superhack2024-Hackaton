import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../styles/globals.css";
import { DarkModeProvider } from "@/contexts/DarkModeContext";
import { config } from "@/config";
import Web3ModalProvider from "@/contexts";
import { cookieToInitialState } from "wagmi";
import { headers } from "next/headers";

const poppins = Poppins({ weight: "400", style: "normal", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Apart3",
  description: "App description",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialState = cookieToInitialState(config, headers().get("cookie"));

  return (
    <html lang="en">
      <body className={`${poppins.className} tracking-wide`}>
        <DarkModeProvider>
          <Web3ModalProvider initialState={initialState}>
            {children}
          </Web3ModalProvider>
        </DarkModeProvider>
      </body>
    </html>
  );
}
