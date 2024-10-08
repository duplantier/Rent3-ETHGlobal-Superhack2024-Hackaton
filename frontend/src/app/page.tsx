"use client";
import "../styles/globals.css";
import { TracingBeam } from "@/components/ui/tracking-beam";
import { Tabs } from "@/components/ui/tabs";
import { Hero } from "@/components/home/Hero";

export default function App() {
  const tabs = [
    {
      title: "Home",
      value: "home",
      content: (
        <TracingBeam className="transition-all duration-300 rounded-xl">
          <main className=" mx-auto antialiased relative">
            <Hero />
          </main>
        </TracingBeam>
      ),
    },
  ];
  return (
    <Tabs
      containerClassName="mx-auto ml-[25%] fixed top-8 overflow-y-hidden"
      tabs={tabs}
    />
  );
}
