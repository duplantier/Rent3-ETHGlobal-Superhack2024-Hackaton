"use client";
import Image from "next/image";
import "../styles/globals.css";
import DarkModeToggle from "@/components/DarkModeToggle";
import Link from "next/link";
import { useDarkMode } from "@/contexts/DarkModeContext";
<<<<<<< HEAD
import SignInButton from "@/components/SignInButton";
=======
import { Verify } from "@/app/verify";
>>>>>>> d81bf9969ebca07b55593702d2add926b30d73e7

export default function App() {
  return (
    <main className="transition-all duration-300">
      <Navbar />
      <Verify />
      <Hero />
    </main>
  );
}

const Navbar: React.FC = () => {
  const { darkMode } = useDarkMode();

  return (
    <section className="min-h-[10vh] transition-all duration-300 w-full fixed border-b-[1px] flex items-center justify-around bg-gray-50  text-gray-900 dark:text-gray-100 dark:bg-gray-900 dark:border-gray-700">
      <div className="flex justify-center items-center gap-2">
        <Image
          src={`${darkMode ? `/logo-white.svg` : `/logo-black.svg`}`}
          alt="Logo"
          width={40}
          height={40}
        />
        <h1 className="tracking-tight font-black md:text-2xl lg:text-3xl">
          Apart3
        </h1>
      </div>
      <div className="flex justify-center items-center gap-4 font-semibold">
        <SignInButton />
        <DarkModeToggle />
      </div>
    </section>
  );
};

{
  /* <button className="px-4 py-2 transition-all duration-300 border-2 shadow-sm rounded-lg border-brand-primary text-brand-black bg-brand-primary  hover:border-brand-black dark:hover:border-brand-white"></button> */
}
/* const NavbarLink: React.FC<{ title: string; children: any }> = ({
  title,
  children,
}) => {
  return (
    <Link className=" hover:underline font-bold" href={`/${title}`}>
      {children}
    </Link>
  );
}; */

const Hero: React.FC = () => {
  return (
    <div className="min-h-[120vh] flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800 text-black dark:text-white">
      Here is my hero.
    </div>
  );
};
