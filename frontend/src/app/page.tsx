"use client";
import "../styles/globals.css";
import { TracingBeam } from "@/components/ui/tracking-beam";
import { Tabs } from "@/components/ui/tabs";
import { Features } from "@/components/home/Features";
import { Hero } from "@/components/home/Hero";
import { Spotlight } from "@/components/ui/spotlight";
import { useEffect, useState } from "react";
import { ExpandableCard } from "@/components/ui/expendable-card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";

export default function App() {
  const [properties, setProperties] = useState([]);
  const BACKEND_URI = "https://rent3-backend.onrender.com/";

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch(`${BACKEND_URI}property`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setProperties(data);
      } catch (error) {
        console.error(error);
      }
    };
    if (properties.length === 0) {
      fetchProperties();
    }
  }, [properties]);
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
    {
      title: "Explore",
      value: "explore",
      content: (
        <main className="h-auto py-60 overflow-y-scroll w-full bg-brand-white dark:bg-brand-black  flex flex-col justify-center items-center bg-dot-black/[0.5] dark:bg-dot-white/[0.4] relative overflow-hidden">
          <Spotlight
            className="-top-40 left-0 md:left-0 md:-bottom-80"
            fill="#27F2CD"
          />
          <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
          <h1 className="text-5xl mb-8 text-center font-bold text-brand-black dark:text-brand-white">
            Explore Properties
          </h1>
          <section className="z-50">
            <div className="flex w-[90%] mx-auto flex-wrap justify-center items-center gap-10">
              {properties.map(
                (property: {
                  id: string;
                  ownerAddress: string;
                  tenantAddress: string;
                  country: string;
                  city: string;
                  neighborhood: string;
                  type: string;
                  bedrooms: number;
                  bathrooms: number;
                  furnished: boolean;
                  floorSizeSqm: number;
                  description: string;
                  images: string[];
                  rentalPrice: number;
                }) => (
                  <Dialog>
                    <DialogTrigger className="w-[300px] h-auto py-6 mx-auto flex flex-col justify-center items-center dark:text-brand-white text-brand-black border border-gray-700 dark:border-gray-200 px-2 my-4 rounded-lg">
                      <Image
                        src={property.images[0]}
                        alt="Property Image"
                        width={200}
                        height={200}
                        className="w-auto h-auto rounded-lg"
                      />
                      <div className="flex flex-col gap-2">
                        <h2 className="mt-4 font-bold text-xl">
                          {property.city} ({property.country})
                        </h2>
                        <h3>0.{property.rentalPrice} ETH</h3>
                      </div>
                      <button className="w-[80%] mx-auto mt-4  px-4 py-2 flex gap-2 justify-center items-center border-2 rounded-lg shadow-sm bg-gray-900 border-gray-400 hover:border-brand-primary  dark:hover:bg-gray-950  text-gray-50 dark:text-slate-300 dark:hover:text-brand-white dark:hover:border-brand-primary hover:text-brand-primary">
                        Details
                      </button>
                    </DialogTrigger>
                    <DialogContent className="text-brand-black dark:text-brand-white">
                      <DialogHeader>
                        <DialogTitle>
                          {property.city} ({property.country})
                        </DialogTitle>
                        <DialogDescription>
                          <div className="flex flex-col gap-3">
                            <p>{property.description}</p>
                            <div className="flex gap-2 w-full overflow-x-scroll my-4">
                              {property.images.map((image: string) => (
                                <Image
                                  src={image}
                                  alt="Property Image"
                                  width={200}
                                  height={200}
                                  className="w-auto h-auto rounded-lg"
                                />
                              ))}
                            </div>

                            <p>
                              <span className="font-bold">Type:</span>{" "}
                              {property.type}
                            </p>

                            <p>
                              <span className="font-bold">Type:</span>{" "}
                              {property.neighborhood}
                            </p>
                            <p>
                              <span className="font-bold">Bedrooms:</span>{" "}
                              {property.bedrooms}
                            </p>

                            <p>
                              <span className="font-bold">Bathrooms:</span>{" "}
                              {property.bathrooms}
                            </p>

                            <p>
                              <span className="font-bold">Furnished:</span>{" "}
                              {property.furnished ? "Yes" : "No"}
                            </p>
                            <p>
                              <span className="font-bold">Floor Size:</span>{" "}
                              {property.floorSizeSqm} sqm
                            </p>

                            <p>
                              <span className="font-bold">Rental Price:</span>{" "}
                              0.{property.rentalPrice} ETH
                            </p>
                          </div>
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                )
              )}
            </div>
          </section>
        </main>
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
