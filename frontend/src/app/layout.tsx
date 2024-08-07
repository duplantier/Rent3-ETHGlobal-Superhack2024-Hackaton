import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../styles/globals.css";
import { DarkModeProvider } from "@/contexts/DarkModeContext";

const poppins = Poppins({ weight: "400", style: "normal", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "House3",
  description: "App description",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} tracking-wide`}>
        <DarkModeProvider>{children}</DarkModeProvider>
      </body>
    </html>
  );
}
