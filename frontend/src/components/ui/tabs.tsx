"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";
import DarkModeToggle from "../DarkModeToggle";
import { useDarkMode } from "@/contexts/DarkModeContext";
import Link from "next/link";

type Tab = {
  title: string;
  value: string;
  content?: string | React.ReactNode | any;
};

export const Tabs = ({
  tabs: propTabs,
  containerClassName,
  activeTabClassName,
  tabClassName,
  contentClassName,
}: {
  tabs: Tab[];
  containerClassName?: string;
  activeTabClassName?: string;
  tabClassName?: string;
  contentClassName?: string;
}) => {
  const [active, setActive] = useState<Tab>(propTabs[0]);
  const [tabs, setTabs] = useState<Tab[]>(propTabs);

  const moveSelectedTabToTop = (idx: number) => {
    const newTabs = [...propTabs];
    const selectedTab = newTabs.splice(idx, 1);
    newTabs.unshift(selectedTab[0]);
    setTabs(newTabs);
    setActive(newTabs[0]);
  };

  const [hovering, setHovering] = useState(false);
  const { darkMode } = useDarkMode();

  return (
    <>
      <div
        className={cn(
          "min-h-[10vh] border-[1px]  rounded-lg bg-brand-white/25 dark:bg-brand-black/30 dark:border-gray-700  backdrop-blur-md   transition-all duration-300 w-[50%] mx-auto fixed flex items-center justify-between px-12 z-50  text-slate-900 dark:text-slate-100 [perspective:1000px]  overflow-auto sm:overflow-visible no-visible-scrollbar max-w-full ",
          containerClassName
        )}
      >
        <Link href="/" className="flex justify-center items-center gap-2">
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
        <div className="flex justify-center items-center gap-4 font-semibold">
          {propTabs.map((tab, idx) => (
            <button
              key={tab.title}
              onClick={() => {
                moveSelectedTabToTop(idx);
              }}
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
              className={cn("relative px-4 py-2 ", tabClassName)}
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              {active.value === tab.value && (
                <motion.div
                  layoutId="clickedbutton"
                  transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                  className={cn(
                    "absolute inset-0 hover:underline duration-300 transition-all  ",
                    activeTabClassName
                  )}
                />
              )}

              <span className="relative block text-black dark:text-white">
                {tab.title}
              </span>
            </button>
          ))}
          <DarkModeToggle />
        </div>
      </div>
      <FadeInDiv
        tabs={tabs}
        active={active}
        key={active.value}
        hovering={hovering}
        className={cn("", contentClassName)}
      />
    </>
  );
};

export const FadeInDiv = ({
  className,
  tabs,
  hovering,
}: {
  className?: string;
  key?: string;
  tabs: Tab[];
  active: Tab;
  hovering?: boolean;
}) => {
  const isActive = (tab: Tab) => {
    return tab.value === tabs[0].value;
  };
  return (
    <div className="relative w-full h-full">
      {tabs.map((tab, idx) => (
        <motion.div
          key={tab.value}
          layoutId={tab.value}
          style={{
            scale: 1 - idx * 0.1,
            top: hovering ? idx * -50 : 0,
            zIndex: -idx,
            opacity: idx < 3 ? 1 - idx * 0.1 : 0,
          }}
          animate={{
            y: isActive(tab) ? [0, 40, 0] : 0,
          }}
          className={cn(
            "w-full h-full absolute top-0 left-0",
            className
          )}
        >
          {tab.content}
        </motion.div>
      ))}
    </div>
  );
};
