"use client";
import { Spotlight } from "@/components/ui/spotlight";
import { useDarkMode } from "@/contexts/DarkModeContext";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Input } from "@/components/ui/input";
import {
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@radix-ui/react-dropdown-menu";
import { Check, Cross, Minus, Plus, X } from "lucide-react";
import { ExpandableCard } from "@/components/ui/expendable-card";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount } from "wagmi";
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
const addNewPropertyFormSchema = z.object({
  country: z.string().min(2).max(50),
  city: z.string().min(2).max(50),
  address: z.string().min(2).max(50),
  neighborhood: z.string().min(2).max(50),
  description: z.string().min(2).max(500),
  parkinSpaces: z.number().min(0).max(10),
  img1Link: z.string().min(2).max(500),
  img2Link: z.string().min(2).max(500),
  img3Link: z.string().min(2).max(500),
  img4Link: z.string().min(2).max(500),
  rentalPrice: z.coerce.number().min(1).max(10000),
});

const OwnerPage = () => {
  const [propertyType, setPropertyType] = useState("HOUSE");
  const [propertyBedrooms, setPropertyBedrooms] = useState(2);
  const [propertyBathrooms, setPropertyBathrooms] = useState(2);
  const [propertyFurnished, setPropertyFurnished] = useState(false);
  const [propertyFloorSizeSqm, setPropertyFloorSizeSqm] = useState(64);
  const [ownerProperties, setOwnerProperties] = useState([]);
  const userNullifierHash = getItemWithExpiry({ key: "nullifier_hash" });
  const { darkMode } = useDarkMode();
  const userRole = getItemWithExpiry({ key: "userRole" });
  if (
    userNullifierHash == "" ||
    userNullifierHash == null ||
    userRole != "owners"
  ) {
    return (
      <main className="min-h-[100vh] w-full dark:bg-brand-black  flex flex-col justify-center items-center bg-grid-small-black/[0.2] dark:bg-dot-white/[0.1] relative overflow-hidden">
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

  const BACKEND_URI = "https://rent3-backend.onrender.com/";
  const { address: userWalletAddress, isConnected } = useAccount();
  const [warning, setWarning] = useState("");
  const [isCreatingProperty, setIsCreatingProperty] = useState(false);
  const addNewPropertyForm = useForm<z.infer<typeof addNewPropertyFormSchema>>({
    resolver: zodResolver(addNewPropertyFormSchema),
    defaultValues: {
      country: "Türkiye",
      city: "Ankara",
      address: "ODTÜ 9. Yurt",
      neighborhood: "Üniversiteler",
      description:
        "A campus dormitory room in Middle East Technical University.",
      img1Link:
        "https://loremflickr.com/640/480/house?lock=8303602189729792      ",
      img2Link: "https://loremflickr.com/640/480/house?lock=2905853233463296",
      img3Link: "https://loremflickr.com/640/480/house?lock=3763918895841280",
      img4Link: "https://loremflickr.com/640/480/house?lock=6979252633206784",
      rentalPrice: 346.34,
    },
  });

  async function onSubmitaddNewPropertyForm(
    values: z.infer<typeof addNewPropertyFormSchema>
  ) {
    setIsCreatingProperty(true);
    const incomingImages = [
      values.img1Link,
      values.img2Link,
      values.img3Link,
      values.img4Link,
    ];

    const createNewProperty: any = await fetch(`${BACKEND_URI}property`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          ownerAddress: userWalletAddress,
          country: values.country,
          city: values.city,
          address: values.address,
          neighborhood: values.neighborhood,
          type: propertyType,
          bedrooms: propertyBedrooms,
          bathrooms: propertyBathrooms,
          furnished: propertyFurnished,
          floorSizeSqm: propertyFloorSizeSqm,
          description: values.description,
          images: incomingImages,
          rentalPrice: values.rentalPrice,
        },
      }),
    });

    if (createNewProperty.id) {
      setIsCreatingProperty(false);
      setWarning("Property added successfully");
      addNewPropertyForm.reset();
    } else {
      setWarning("Failed to add property");
    }
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
        setOwnerProperties(data);
      } catch (error) {
        console.error(error);
      }
    };
    if (ownerProperties.length === 0) {
      fetchProperties();
    }
  }, []);
  return (
    <main className="min-h-[100vh] overflow-y-scoll py-12 w-full bg-brand-white dark:bg-brand-black  flex flex-col justify-center items-center bg-dot-black/[0.5] dark:bg-dot-white/[0.1] relative ">
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
      <div className="flex gap-2 py-2 px-4 mb-6 z-50 items-center rounded-lg border bg-green-100 text-green-500 border-green-400 text-md ">
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
      <h1 className="text-5xl font-bold text-brand-black dark:text-brand-white mb-8">
        Manage Your Properties
      </h1>
      <div className="w-[80vw] mx-auto flex justify-center items-center gap-20 z-50">
        <section
          className="w-1/2 dark:bg-gray-900 border-2 dark:border-gray-700 flex flex-col px-4 py-6 rounded-lg"
          id="listedProperties"
        >
          <h1 className="text-3xl font-bold text-brand-black dark:text-brand-white">
            Listed Properties
          </h1>
          <div className="w-full h-max-[400px] overflow-y-scroll"></div>
        </section>
        <section
          className="w-1/2 bg-gray-50 dark:bg-gray-900 border-2 dark:border-gray-700 flex flex-col  px-4 py-6 rounded-lg"
          id="addNewPropertyForm"
        >
          <div className="w-full max-h-[400px] overflow-y-scroll z-50 p-8 bg-gray-50 dark:bg-gray-900 rounded-xl  dark:border-gray-700">
            <h1 className="text-3xl font-bold text-brand-black dark:text-brand-white mb-8">
              Add New Property
            </h1>
            <Form {...addNewPropertyForm}>
              <form
                onSubmit={addNewPropertyForm.handleSubmit(
                  onSubmitaddNewPropertyForm
                )}
                className="space-y-6"
              >
                <section className="flex flex-col items-center gap-6 dark:text-brand-white">
                  <div className="flex justify-center items-center gap-8 w-full">
                    <FormField
                      control={addNewPropertyForm.control}
                      name="country"
                      render={({ field }) => (
                        <FormItem className="w-1/2">
                          <FormLabel className="dark:text-brand-white">
                            Country*
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="border-2 dark:border-gray-500 dark:text-gray-50"
                              placeholder="Country of property"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={addNewPropertyForm.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem className="w-1/2">
                          <FormLabel className="dark:text-brand-white">
                            City*
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="border-2 dark:border-gray-500 dark:text-gray-50"
                              placeholder="City of property"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex justify-center items-center gap-8 w-full">
                    <FormField
                      control={addNewPropertyForm.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel className="dark:text-brand-white">
                            Address*
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="border-2 dark:border-gray-500 dark:text-gray-50"
                              placeholder="Address of property"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={addNewPropertyForm.control}
                      name="neighborhood"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel className="dark:text-brand-white">
                            Neighborhood*
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="border-2 dark:border-gray-500 dark:text-gray-50"
                              placeholder="Neighborhood of property"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex justify-center  gap-8 w-full">
                    <div className="flex flex-col gap-2 w-1/2">
                      <h5 className="text-sm ">Property Type*</h5>
                      <DropdownMenu>
                        <DropdownMenuTrigger className="w-full rounded-lg py-1  border border-gray-200 text-gray-400 text-sm ">
                          {propertyType || "Select Property Type"}
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-[280px]">
                          <DropdownMenuLabel>
                            Select Property Type
                          </DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuRadioGroup
                            value={propertyType}
                            onValueChange={(pt) => {
                              setPropertyType(pt);
                            }}
                          >
                            <DropdownMenuRadioItem value="HOUSE">
                              HOUSE
                            </DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="APARTMENT">
                              APARTMENT
                            </DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="TOWNHOUSE">
                              TOWNHOUSE
                            </DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="DUPLEX">
                              DUPLEX
                            </DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="PENTHOUSE">
                              PENTHOUSE
                            </DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="STUDIO">
                              STUDIO
                            </DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="STUDIO">
                              CONDO
                            </DropdownMenuRadioItem>
                          </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <div className="flex flex-col gap-2 w-1/2">
                      <h5 className="text-sm ">Bedroom*</h5>
                      <div className="flex justify-center lg:justify-start items-center gap-x-4 lg:gap-x-1.5">
                        <button
                          aria-label="Decrease Property Bedrooms"
                          type="button"
                          className="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                          disabled={propertyBedrooms === 0}
                          onClick={() =>
                            setPropertyBedrooms(propertyBedrooms - 1)
                          }
                        >
                          <Minus />
                        </button>
                        <p className="p-0 w-6 bg-transparent border-0 text-gray-800 text-center focus:ring-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none dark:text-white">
                          {propertyBedrooms}
                        </p>
                        <button
                          aria-label="Increase Property Bedrooms"
                          type="button"
                          className="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                          onClick={() =>
                            setPropertyBedrooms(propertyBedrooms + 1)
                          }
                        >
                          <Plus />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center items-center w-full gap-8">
                    <div className="flex flex-col gap-2 w-1/2">
                      <h5 className="text-sm ">Floor Size Sqm*</h5>
                      <div className="flex justify-center lg:justify-start items-center gap-x-4 lg:gap-x-1.5">
                        <button
                          aria-label="Decrease Floor Size Sqm"
                          type="button"
                          className="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                          disabled={propertyBathrooms === 0}
                          onClick={() =>
                            setPropertyFloorSizeSqm(propertyFloorSizeSqm - 10)
                          }
                        >
                          <Minus />
                        </button>
                        <p className="p-0 w-6 bg-transparent border-0 text-gray-800 text-center focus:ring-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none dark:text-white">
                          {propertyFloorSizeSqm}
                        </p>
                        <button
                          aria-label="Increase Floor Size Sqm"
                          type="button"
                          className="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                          onClick={() =>
                            setPropertyFloorSizeSqm(propertyFloorSizeSqm + 10)
                          }
                        >
                          <Plus />
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 w-1/2 ">
                      <h5 className="text-sm ">Bathrooms*</h5>
                      <div className="flex justify-center lg:justify-start items-center gap-x-4 lg:gap-x-1.5">
                        <button
                          aria-label="Decrease Property Bathrooms"
                          type="button"
                          className="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                          disabled={propertyBathrooms === 0}
                          onClick={() =>
                            setPropertyBathrooms(propertyBathrooms - 1)
                          }
                        >
                          <Minus />
                        </button>
                        <p className="p-0 w-6 bg-transparent border-0 text-gray-800 text-center focus:ring-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none dark:text-white">
                          {propertyBathrooms}
                        </p>
                        <button
                          aria-label="Increase Property Bathrooms"
                          type="button"
                          className="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                          onClick={() =>
                            setPropertyBathrooms(propertyBathrooms + 1)
                          }
                        >
                          <Plus />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center items-center w-full gap-8">
                    <div className="flex flex-col gap-2 w-1/2">
                      <h5 className="text-sm ">Is Furnished*</h5>
                      <div className="flex justify-center lg:justify-start items-center gap-x-4 lg:gap-2">
                        <p className="p-0 w-6 bg-transparent border-0 text-gray-800 text-center focus:ring-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none dark:text-white">
                          {propertyFurnished ? "Yes" : "No"}
                        </p>
                        <button
                          type="button"
                          className={` ${
                            propertyFurnished
                              ? "bg-green-100 text-green-500 border-green-400"
                              : "bg-red-100 text-red-500 border-red-400"
                          } size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border   shadow-sm  focus:outline-none  `}
                          onClick={() =>
                            setPropertyFurnished(!propertyFurnished)
                          }
                        >
                          {propertyFurnished ? <Check /> : <X />}
                        </button>
                      </div>
                    </div>
                  </div>
                  <FormField
                    control={addNewPropertyForm.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="dark:text-brand-white">
                          Description*
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="border-2 dark:border-gray-500 dark:text-gray-50"
                            placeholder="Description of property"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={addNewPropertyForm.control}
                    name="img1Link"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="dark:text-brand-white">
                          Image 1*
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="border-2 dark:border-gray-500 dark:text-gray-50"
                            placeholder="Add Image Link"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={addNewPropertyForm.control}
                    name="img2Link"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="dark:text-brand-white">
                          Image 2*
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="border-2 dark:border-gray-500 dark:text-gray-50"
                            placeholder="Add Image Link"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={addNewPropertyForm.control}
                    name="img3Link"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="dark:text-brand-white">
                          Image 3*
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="border-2 dark:border-gray-500 dark:text-gray-50"
                            placeholder="Add Image Link"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={addNewPropertyForm.control}
                    name="img4Link"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="dark:text-brand-white">
                          Image 4*
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="border-2 dark:border-gray-500 dark:text-gray-50"
                            placeholder="Add Image Link"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={addNewPropertyForm.control}
                    name="rentalPrice"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="dark:text-brand-white">
                          Rental Price*
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            typeof="number"
                            className="border-2 dark:border-gray-500 dark:text-gray-50"
                            placeholder="Enter Rental Price"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </section>

                <div className="w-full flex flex-col justify-center items-center">
                  {!isConnected ? (
                    <w3m-button />
                  ) : (
                    <button
                      className="w-[300px]  px-4 py-[5px] disabled:border-red-900 disabled:text-red-800 dark:disabled:hover:border-red-950 dark:disabled:border-red-900 dark:disabled:text-red-800 disabled:hover:border-red-950  disabled:hover:cursor-not-allowed flex gap-2 justify-center items-center border-2 rounded-lg shadow-sm bg-gray-900 border-brand-primary  dark:hover:bg-gray-950  text-gray-50 dark:text-slate-300 dark:hover:text-brand-primary dark:hover:border-brand-primary hover:text-brand-primary"
                      type="submit"
                    >
                      {isCreatingProperty ? "Loading..." : "Create Now"}
                    </button>
                  )}
                  {warning !== "" && (
                    <p className="text-red-500 mt-4">{warning}</p>
                  )}
                </div>
              </form>
            </Form>
          </div>
        </section>
      </div>
    </main>
  );
};

export default OwnerPage;
