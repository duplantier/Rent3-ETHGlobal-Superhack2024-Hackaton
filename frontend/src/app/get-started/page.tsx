"use client";
import React, { useState } from "react";

import { useDarkMode } from "@/contexts/DarkModeContext";
import Image from "next/image";
import OnboardingForm from "@/components/home/OnboardingForm";
import Link from "next/link";
import { Spotlight } from "@/components/ui/spotlight";
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
const GetStartedPage = () => {
  const userNullifierHash = getItemWithExpiry({ key: "nullifier_hash" });
  const { darkMode } = useDarkMode();

  return (
    <main className="min-h-[100vh] dark:bg-brand-black  flex flex-col justify-center items-center bg-grid-small-black/[0.2] dark:bg-grid-small-white/[0.1] relative overflow-hidden">
      <div className="absolute pointer-events-none inset-0 flex flex-col items-center justify-center dark:bg-brand-black bg-brand-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="#27F2CD"
      />
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

      <OnboardingForm userNullifierHash={userNullifierHash} />
      <div className="flex gap-2 py-2 px-4 mt-6 z-40 items-center rounded-lg border bg-green-100 text-green-500 border-green-400 text-md ">
        <Image
          src={`/logos/worldcoin-black.svg`}
          alt="Logo"
          className="w-6 h-auto"
          width={20}
          height={40}
        />
        <div>
          Verified with {userNullifierHash.slice(0, 10)}...
          {userNullifierHash.slice(-10)}
        </div>
      </div>
    </main>
  );
};

export default GetStartedPage;
