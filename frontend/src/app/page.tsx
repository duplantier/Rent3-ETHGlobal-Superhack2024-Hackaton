"use client";
import "../styles/globals.css";
import DarkModeToggle from "@/components/DarkModeToggle";
import Link from "next/link";
import {
  IDKitWidget,
  VerificationLevel,
  ISuccessResult,
  useIDKit,
} from "@worldcoin/idkit";
import { useEffect, useState } from "react";
/* import "dotenv/config"; */
import Image from "next/image";
import { useDarkMode } from "@/contexts/DarkModeContext";
export default function App() {
  return (
    <main className="transition-all duration-300">
      <Navbar />
      <Hero />
    </main>
  );
}

const Navbar: React.FC = () => {
  const [isUserVerifiedWithWorldID, setIsUserVerifiedWithWorldID] =
    useState(false);
  const { darkMode } = useDarkMode();
  // const { open, setOpen } = useIDKit();
  const [nullifierHash, setNullifierHash] = useState<string | null>(null);

  const BACKEND_URI = process.env.NEXT_PUBLIC_BACKEND_URI;
  const handleVerify = async (proof: ISuccessResult) => {
    const worldIdVerifyResponse = await fetch(
      `${BACKEND_URI}/world-id/verify`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(proof),
      }
    );

    setNullifierHash(proof.nullifier_hash);

    if (!worldIdVerifyResponse.ok) {
      throw new Error("Verification failed."); // IDKit will display the error message to the user in the modal
    }
  };

  const onSuccess = (result: ISuccessResult) => {
    console.log("onSuccess'a girdim");
    console.log("nullifierHash", result.nullifier_hash);
  };

  return (
    <section className="min-h-[10vh] transition-all duration-300 w-full fixed border-b-[1px] flex items-center justify-around bg-gray-50  text-gray-900 dark:text-gray-100 dark:bg-gray-900 dark:border-gray-700">
      <div className="flex justify-center items-center gap-2">
        <Image
          src={`${darkMode ? `/logo-white.svg` : `/logo-black.svg`}`}
          alt="Logo"
          className="w-12 h-auto"
          width={40}
          height={40}
        />
        <h1 className="tracking-tight font-black md:text-2xl lg:text-3xl">
          Apart3
        </h1>
        <w3m-button />
      </div>
      <div className="flex justify-center items-center gap-4 font-semibold">
        {nullifierHash !== null ? (
          <button className="px-4 py-2 flex gap-2 justify-center items-center border-2 rounded-lg shadow-sm hover:bg-gray-100 hover:border-brand-black dark:border-gray-700 dark:bg-gray-800 dark:hover:border-brand-white">
            ✅
            <h1>
              {nullifierHash.slice(0, 6)}...{nullifierHash.slice(-6)}
            </h1>
          </button>
        ) : (
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
        )}
        <DarkModeToggle />
      </div>
    </section>
  );
};

const Hero: React.FC = () => {
  return (
    <div className="min-h-[120vh] flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800 text-black dark:text-white">
      <h1>Rent with a crypto-based transparency and AI asssistance </h1>
    </div>
  );
};
