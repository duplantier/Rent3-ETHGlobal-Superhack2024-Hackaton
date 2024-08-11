"use client";
import { Spotlight } from "@/components/ui/spotlight";
import { useDarkMode } from "@/contexts/DarkModeContext";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ABI from "@/contract/ABI.json";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAccount, useWriteContract } from "wagmi";

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
  const [properties, setProperties] = useState([]);
  const BACKEND_URI = "https://rent3-backend.onrender.com/";
  const { address: userWalletAddress, isConnected } = useAccount();
  const { data: hash, writeContractAsync, isPending } = useWriteContract();

  function payRent(propertyID: number, price: number) {
    const nullifierHash = "";
    const fixedPrice = BigInt(price * 10 ** 18);

    writeContractAsync({
      abi: ABI.abi,
      address: ABI.address as `0x${string}`,
      functionName: "payRent",
      args: [
        BigInt(propertyID),
        userWalletAddress,
        BigInt(fixedPrice),
        userNullifierHash,
      ],
    });
  }
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
  return userNullifierHash == "" ||
    userNullifierHash == null ||
    userRole != "tenants" ? (
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
  ) : (
    <main className="min-h-[100vh] py-36 overflow-y-scroll w-full bg-brand-white dark:bg-brand-black  flex flex-col justify-center items-center bg-dot-black/[0.5] dark:bg-dot-white/[0.4] relative overflow-hidden">
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
              <Dialog key={property.id}>
                <DialogTrigger className="w-[300px] bg-gray-50 dark:bg-gray-900 dark:border-gray-700 h-auto py-6 mx-auto flex flex-col justify-center items-center dark:text-brand-white text-brand-black border border-gray-700 px-2 my-4 rounded-lg">
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
                    <h3>{property.rentalPrice}</h3>
                  </div>
                  <button className="w-[80%] mx-auto mt-4  px-4 py-2 flex gap-2 justify-center items-center border-2 rounded-lg shadow-sm bg-brand-black border-gray-400 hover:border-brand-primary  dark:hover:bg-gray-950  text-gray-50 dark:text-slate-300 dark:hover:text-brand-white dark:hover:border-brand-primary hover:text-brand-primary">
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
                              key={image}
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
                          {property.rentalPrice}
                        </p>

                        <div className="w-full flex flex-col justify-center items-center gap-4">
                          <button
                            className="w-[80%] mx-auto px-4 py-2 flex gap-2 justify-center items-center border-2 rounded-lg shadow-sm bg-brand-black border-gray-400 hover:border-brand-primary  dark:hover:bg-gray-950  text-gray-50 dark:text-slate-300 dark:hover:text-brand-white dark:hover:border-brand-primary hover:text-brand-primary"
                            onClick={() =>
                              payRent(+property.id, property.rentalPrice)
                            }
                            disabled={!isConnected || isPending}
                          >
                            {isConnected
                              ? "Rent Now"
                              : "Connect Wallet To Rent"}
                          </button>
                          <w3m-button />
                          {hash && (
                            <Link
                              href={`https://sepolia.explorer.mode.network/tx/${hash}`}
                              className="test-blue-500 hover:text-blue-700 hover:underline"
                            >
                              Transaction Hash: {hash.substring(0, 20)}...
                            </Link>
                          )}
                        </div>
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
  );
};

export default TenantPage;
