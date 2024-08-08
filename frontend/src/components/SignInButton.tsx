"use client";
import {
  IDKitWidget,
  VerificationLevel,
  ISuccessResult,
  useIDKit,
} from "@worldcoin/idkit";
import { useEffect } from "react";
/* import "dotenv/config"; */
import Image from "next/image";
import { useDarkMode } from "@/contexts/DarkModeContext";
const SignInButton = () => {
  const { darkMode } = useDarkMode();
  const { open, setOpen } = useIDKit();
  const APP_ID = process.env.NEXT_PUBLIC_WORLD_APP_ID as `app_${string}`;
  const BACKEND_URI = process.env.NEXT_PUBLIC_BACKEND_URI;
  const ACTION_ID = "testing-action";

  console.log("App_id: ", APP_ID);
  console.log("Backend URI: ", BACKEND_URI);

  const handleVerify = async (proof: ISuccessResult) => {
    console.log("Proof: ", proof);
    console.log("handleVerify'a girdim");

    const res = await fetch(`${BACKEND_URI}/world-id/verify`, {
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

  const onSuccess = () => {};

  return (
    <IDKitWidget
      app_id={"app_staging_cabc806110f5d7491c05482017dee619"} // obtained from the Developer Portal
      action={"testing-action"} // obtained from the Developer Portal
      onSuccess={onSuccess} // callback when the modal is closed
      handleVerify={handleVerify} // callback when the proof is received
      verification_level={VerificationLevel.Device}
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
