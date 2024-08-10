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
import {
  IDKitWidget,
  VerificationLevel,
  ISuccessResult,
  useIDKit,
} from "@worldcoin/idkit";

import { Input } from "@/components/ui/input";
import { useDarkMode } from "@/contexts/DarkModeContext";
import Image from "next/image";

const formSchema = z.object({
  fullName: z.string().min(2).max(50),
  email: z.string().email(),
});

const OnboardingForm = () => {
  const [userOnboardingRole, setUserOnboardingRole] = useState<string | null>();
  const { open, setOpen: openWorldIDVerificationModal } = useIDKit();
  const router = useRouter();
  const onboardingForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
    },
  });

  function onSubmitOnboardingForm(values: z.infer<typeof formSchema>) {
    if (
      userOnboardingRole !== null &&
      values.email !== "" &&
      values.fullName !== ""
    ) {
      openWorldIDVerificationModal(true);
    } else {
      null;
    }
  }

  //! Worldcoin Things
  const [onboardingNullifierHash, setOnboardingNullifierHash] = useState<
    string | null
  >(null);

  const BACKEND_URI = process.env.NEXT_PUBLIC_BACKEND_URI;
  const handleVerify = async (proof: ISuccessResult) => {
    const worldIdVerifyResponse = await fetch(`${BACKEND_URI}world-id/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(proof),
    });
    setOnboardingNullifierHash(proof.nullifier_hash);
    if (!worldIdVerifyResponse.ok) {
      throw new Error("Verification failed."); // IDKit will display the error message to the user in the modal
    }
  };

  const onSuccess = async (result: ISuccessResult) => {
    const userOnboardingData = {
      name: onboardingForm.getValues("fullName"),
      email: onboardingForm.getValues("email"),
      nullifierHash: result.nullifier_hash,
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
          router.push("/dashboard/owner");
        } else if (userOnboardingRole === "tenants") {
          router.push("/dashboard/tenant");
        }
      } else {
        throw new Error(createOwnerData.message);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="max-w-[500px] p-8 bg-gray-50 rounded-xl border">
      <Form {...onboardingForm}>
        <h1 className="text-3xl dark:text-brand-white font-bold">
          Get Started with Rent3
        </h1>
        <p className="text-slate-600 dark:text-slate-300">
          Let us know what you are looking for and we will help you find the
          best match.
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
                  <FormLabel>Full Name*</FormLabel>
                  <FormControl>
                    <Input
                      className="border-2"
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
                  <FormLabel>Email*</FormLabel>
                  <FormControl>
                    <Input
                      className="border-2"
                      placeholder="Your email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </section>
          {onboardingNullifierHash !== null ? (
            <button className="px-4 py-2 flex gap-2 justify-center items-center border-2 rounded-lg shadow-sm hover:bg-slate-100 hover:border-brand-black dark:border-slate-700 dark:bg-slate-800 dark:hover:border-brand-white">
              ✅
              <h1>
                {onboardingNullifierHash.slice(0, 6)}...
                {onboardingNullifierHash.slice(-6)}
              </h1>
            </button>
          ) : (
            <div>
              <IDKitWidget
                app_id={"app_staging_cabc806110f5d7491c05482017dee619"}
                action={"testing-action"}
                onSuccess={onSuccess}
                handleVerify={handleVerify}
                verification_level={VerificationLevel.Device}
              >
                {({ open }) => (
                  // This is the button that will open the IDKit modal
                  <button
                    className="px-4 py-[6px] w-[80%] mx-auto flex gap-2 justify-center items-center border-2 bg-gray-900 border-gray-400 hover:border-brand-primary  dark:hover:bg-gray-950  text-gray-50 dark:text-slate-300 dark:hover:text-brand-white dark:hover:border-brand-primary hover:text-brand-primary rounded-lg shadow-sm   dark:border-slate-700 dark:bg-slate-800 "
                    type="submit"
                  >
                    <Image
                      src={`/logos/worldcoin-white.svg`}
                      alt="Logo"
                      className="w-6 h-auto"
                      width={20}
                      height={40}
                    />
                    <h1>Verify & Sign Up With WorldID</h1>
                  </button>
                )}
              </IDKitWidget>
            </div>
          )}
          {/* <div className="w-full flex justify-center items-center">
          <button
            disabled={onboardingNullifierHash === null}
            className="w-[50%] border-2 rounded-lg border-gray-500 py-1 hover:cursor-pointer"
            type="submit"
          >
            Sign In
          </button>
        </div> */}
        </form>
      </Form>
    </div>
  );
};

export default OnboardingForm;
