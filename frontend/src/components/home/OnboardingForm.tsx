"use client";
import { UserCheck, UserSearch } from "lucide-react";
import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import Image from "next/image";

const formSchema = z.object({
  fullName: z.string().min(2).max(50),
  email: z.string().email(),
});

function setItemWithExpiry({
  key,
  value,
  ttl,
}: {
  key: string;
  value: any;
  ttl: number;
}) {
  const now = new Date();

  // `item` is an object which contains the original value as well as the time when it will expire
  const item = {
    value: value,
    expiry: now.getTime() + ttl,
  };

  localStorage.setItem(key, JSON.stringify(item));
}

const OnboardingForm = ({
  userNullifierHash,
}: {
  userNullifierHash: string;
}) => {
  const [userOnboardingRole, setUserOnboardingRole] = useState<string | null>(
    ""
  );
  const [isFormLoading, setIsFormLoading] = useState<boolean>(false);
  const router = useRouter();
  const onboardingForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
    },
  });
  const BACKEND_URI = "https://rent3-backend.onrender.com/";

  async function onSubmitOnboardingForm(values: z.infer<typeof formSchema>) {
    setIsFormLoading(true);
    const userOnboardingData = {
      name: values.fullName,
      email: values.email,
      nullifierHash: userNullifierHash,
      walletAddress: "",
    };

    try {
      const createOwnerResponse = await fetch(
        `${BACKEND_URI}${userOnboardingRole}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userOnboardingData),
        }
      );

      const createOwnerData = await createOwnerResponse.json();
      if (createOwnerResponse.ok) {
        if (userOnboardingRole === "owners") {
          setItemWithExpiry({
            key: "userRole",
            value: "owners",
            ttl: 1000 * 60 * 60,
          });
          router.push("/dashboard/owner");
        } else if (userOnboardingRole === "tenants") {
          setItemWithExpiry({
            key: "userRole",
            value: "tenants",
            ttl: 1000 * 60 * 60,
          });
          router.push("/dashboard/tenant");
        }
      } else {
        throw new Error(createOwnerData.message);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="max-w-[500px] z-50 p-8 bg-gray-50 dark:bg-gray-900 rounded-xl border dark:border-gray-700">
      <Form {...onboardingForm}>
        <h1 className="text-3xl dark:text-brand-white font-bold">
          Get Started with Rent3
        </h1>
        <p className="text-slate-600 dark:text-slate-300">
          Let us know what you are looking for and we will help you get started.
        </p>
        <section className="flex justify-center items-center gap-4 py-4">
          <button
            onClick={() => setUserOnboardingRole("owners")}
            className={`${
              userOnboardingRole == "owners"
                ? "bg-cyan-300 border-cyan-800 w-2/3"
                : "w-1/2 hover:border-cyan-500 hover:bg-cyan-200"
            } h-full flex flex-col justify-center items-center gap-2 p-4 border-2 border-cyan-200   hover:cursor-pointer bg-cyan-100   transition-all duration-300 text-cyan-700 rounded-lg`}
          >
            <UserCheck size={30} />
            <h1 className="font-sans font-bold">Property Owner</h1>
            <p className="text-sm text-center">
              I want to lease out my properties.
            </p>
          </button>
          <button
            onClick={() => setUserOnboardingRole("tenants")}
            className={`${
              userOnboardingRole == "tenants"
                ? "bg-purple-300 border-purple-800 w-2/3"
                : "w-1/2 hover:border-purple-500 hover:bg-purple-200"
            } h-full flex flex-col justify-center items-center gap-2 p-4 border-2 border-purple-200  hover:cursor-pointer bg-purple-100  transition-all duration-300 text-purple-700 rounded-lg`}
          >
            <UserSearch size={30} />
            <h1 className="font-sans font-bold">Tenant</h1>
            <p className="text-sm text-center">
              I am looking for a property to rent.
            </p>
          </button>
        </section>
        <form
          onSubmit={onboardingForm.handleSubmit(onSubmitOnboardingForm)}
          className="space-y-6"
        >
          <section className="flex justify-between items-center gap-6">
            <FormField
              control={onboardingForm.control}
              name="fullName"
              render={({ field }) => (
                <FormItem className="w-1/2">
                  <FormLabel className="dark:text-brand-white">
                    Full Name*
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="border-2 dark:border-gray-500 dark:text-gray-50"
                      placeholder="Your full name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={onboardingForm.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-1/2">
                  <FormLabel className="dark:text-brand-white">
                    Email*
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="border-2 dark:border-gray-500 dark:text-gray-50"
                      placeholder="Your email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </section>

          <div className="w-full flex justify-center items-center">
            <button
              disabled={
                onboardingForm.getValues("email") === "" ||
                onboardingForm.getValues("fullName") === "" ||
                userOnboardingRole === ""
              }
              className="w-[300px]  px-4 py-[5px] disabled:border-red-900 disabled:text-red-800 dark:disabled:hover:border-red-950 dark:disabled:border-red-900 dark:disabled:text-red-800 disabled:hover:border-red-950  disabled:hover:cursor-not-allowed flex gap-2 justify-center items-center border-2 rounded-lg shadow-sm bg-gray-900 border-brand-primary  dark:hover:bg-gray-950  text-gray-50 dark:text-slate-300 dark:hover:text-brand-primary dark:hover:border-brand-primary hover:text-brand-primary"
              type="submit"
            >
              {isFormLoading ? "Loading..." : "Save"}
            </button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default OnboardingForm;
