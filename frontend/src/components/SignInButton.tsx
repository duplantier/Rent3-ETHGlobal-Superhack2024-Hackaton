"use client";
import { useDarkMode } from "@/contexts/DarkModeContext";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";
import {
  IDKitWidget,
  VerificationLevel,
  ISuccessResult,
} from "@worldcoin/idkit";
const SignInButton = () => {
  const { darkMode } = useDarkMode();

  const handleVerify = async (proof: ISuccessResult) => {
    const res = await fetch("localhost:8080/verify", {
      // route to your backend will depend on implementation
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(proof),
    });
    if (!res.ok) {
      throw new Error("Verification failed."); // IDKit will display the error message to the user in the modal
    }
  };

  const onSuccess = () => {
    // This is where you should perform any actions after the modal is closed
    // Such as redirecting the user to a new page
    window.location.href = "/success";
  };

  const WorldCoinAppId = process.env.WORLDCOIN_APP_ID;

  return (
    <IDKitWidget
      app_id={`app_${WorldCoinAppId}`}
      action="testing-action" // obtained from the Developer Portal
      onSuccess={onSuccess} // callback when the modal is closed
      handleVerify={handleVerify} // callback when the proof is received
      verification_level={VerificationLevel.Orb}
    >
      {({ open }) => (
        // This is the button that will open the IDKit modal
        <button
          className="px-4 py-2 flex gap-2 justify-center items-center border-2 rounded-lg shadow-sm hover:bg-gray-100 hover:border-brand-black dark:border-gray-700 dark:bg-gray-800 dark:hover:border-brand-white"
          onClick={open}
        >
          <Image
            src={`${
              darkMode
                ? `/logos/worldcoin-white.svg`
                : `/logos/worldcoin-black.svg`
            }`}
            alt="Logo"
            className="w-6 h-auto"
            width={20}
            height={40}
          />
          <h1>Sign In</h1>
        </button>
      )}
    </IDKitWidget>
  );
};

export default SignInButton;
