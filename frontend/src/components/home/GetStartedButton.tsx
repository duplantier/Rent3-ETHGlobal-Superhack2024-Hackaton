"use client";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UserCheck, UserSearch } from "lucide-react";
/* const Navbar: React.FC = () => {
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

  return;
};
 */

export const GetStartedButton = () => {
  const [userOnboardingRole, setUserOnboardingRole] = useState<string | null>();

  return (
    <Dialog>
      <DialogTrigger className="w-[300px] mt-8 px-4 py-2 flex gap-2 justify-center items-center border-2 rounded-lg shadow-sm bg-none border-brand-primary  dark:hover:bg-gray-950  text-slate-500 dark:text-slate-300 dark:hover:text-brand-white dark:hover:border-brand-primary hover:text-slate-950  ">
        Get Started
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-3xl dark:text-brand-white">
            What are you looking for?
          </DialogTitle>
          <DialogDescription className="dark:text-slate-300">
            Let us know what you are looking for and we will help you find the
            best match.
          </DialogDescription>
          <section className="flex justify-center items-center gap-4 pt-4">
            <button
              onClick={() => setUserOnboardingRole("propertyOwner")}
              className="w-1/2 flex flex-col justify-center items-center gap-2 p-4 border-2 border-cyan-200 hover:border-cyan-500 hover:cursor-pointer bg-cyan-100 hover:bg-cyan-200 transition-all duration-300 text-cyan-700 rounded-lg"
            >
              <UserCheck size={30} />
              <h1 className="font-sans font-bold">Property Owner</h1>
              <p className="text-sm text-center">
                I want to rent or sell my property.
              </p>
            </button>
            <button
              onClick={() => setUserOnboardingRole("tenant")}
              className="w-1/2 flex flex-col justify-center items-center gap-2 p-4 border-2 border-purple-200 hover:border-purple-500  hover:cursor-pointer bg-purple-100 hover:bg-purple-200 transition-all duration-300 text-purple-700 rounded-lg"
            >
              <UserSearch size={30} />
              <h1 className="font-sans font-bold">Tenant</h1>
              <p className="text-sm text-center">
                I am looking for a property to rent or buy.
              </p>
            </button>
          </section>
        </DialogHeader>

        {/* 
          {nullifierHash !== null ? (
            <button className="px-4 py-2 flex gap-2 justify-center items-center border-2 rounded-lg shadow-sm hover:bg-slate-100 hover:border-brand-black dark:border-slate-700 dark:bg-slate-800 dark:hover:border-brand-white">
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
                  className="px-4 py-2 flex gap-2 justify-center items-center border-2 rounded-lg shadow-sm hover:bg-slate-100 hover:border-brand-black dark:border-slate-700 dark:bg-slate-800 dark:hover:border-brand-white"
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
          */}
      </DialogContent>
    </Dialog>
  );
};
