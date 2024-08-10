"use client";
import React, { useState } from "react";

import { useDarkMode } from "@/contexts/DarkModeContext";
import Image from "next/image";
import OnboardingForm from "@/components/home/OnboardingForm";
import Link from "next/link";

const GetStartedPage = () => {
  const { darkMode } = useDarkMode();

  return (
    <main className="min-h-[100vh]  flex flex-col justify-center items-center bg-grid-small-black/[0.2] dark:bg-grid-small-white/[0.1] relative overflow-hidden">
      <div className="absolute pointer-events-none inset-0 flex flex-col items-center justify-center dark:bg-brand-black bg-brand-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

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
        <h1 className="tracking-tight font-black md:text-2xl lg:text-3xl">
          Rent3
        </h1>
      </Link>
      <OnboardingForm />
    </main>
  );
};

export default GetStartedPage;
