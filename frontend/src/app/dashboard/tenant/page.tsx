"use client";
import { Spotlight } from "@/components/ui/spotlight";
import { useDarkMode } from "@/contexts/DarkModeContext";
import Image from "next/image";
import Link from "next/link";
import React from "react";
function getItemWithExpiry({ key }: { key: string }) {
  const itemStr = localStorage.getItem(key);

  // If the item doesn't exist, return null
  if (!itemStr) {
    return null;
  }

  const item = JSON.parse(itemStr);
  const now = new Date();

  // If the item is expired, delete the item from storage and return null
  if (now.getTime() > item.expiry) {
    localStorage.removeItem(key);
    return null;
  }

  return item.value;
}
const TenantPage = () => {
  const userNullifierHash = getItemWithExpiry({ key: "nullifier_hash" });
  const { darkMode } = useDarkMode();
  const userRole = getItemWithExpiry({ key: "userRole" });
  if (
    userNullifierHash == "" ||
    userNullifierHash == null ||
    userRole != "tenants"
  ) {
    return (
      <main className="min-h-[100vh] w-full bg-brand-white dark:bg-brand-black  flex flex-col justify-center items-center bg-dot-black/[0.5] dark:bg-dot-white/[0.4] relative overflow-hidden">
        <Spotlight
          className="-top-40 left-0 md:left-0 md:-bottom-80"
          fill="#27F2CD"
        />
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <Link
          href="/"
          className="flex justify-center items-center gap-2 mb-6 z-10"
        >
          <Image
            src={`${darkMode ? `/logo-white.svg` : `/logo-black.svg`}`}
            alt="Logo"
            className="w-10 rotate-90 h-auto"
            width={20}
            height={40}
          />
          <h1 className="tracking-tight font-black md:text-2xl lg:text-3xl dark:text-brand-white">
            Rent3
          </h1>
        </Link>
        <div className="flex gap-2 py-2 px-4 mb-6 z-50 items-center rounded-lg border bg-red-100 text-red-500 border-red-400 text-md ">
          <Image
            src={`/logos/worldcoin-black.svg`}
            alt="Logo"
            className="w-6 h-auto"
            width={20}
            height={40}
          />
          <div>You are not authorized to view this page</div>
        </div>
        <Link
          href="/"
          className="w-[200px]  px-4 py-2 flex gap-2 justify-center items-center border-2 rounded-lg shadow-sm bg-gray-900 border-gray-400 hover:border-brand-primary  dark:hover:bg-gray-950  text-gray-50 dark:text-slate-300 dark:hover:text-brand-white dark:hover:border-brand-primary hover:text-brand-primary"
        >
          Go Back
        </Link>
      </main>
    );
  }
  return <div>Tenant Page</div>;
};

export default TenantPage;
