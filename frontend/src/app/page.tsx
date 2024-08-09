"use client";
import "../styles/globals.css";
import DarkModeToggle from "@/components/DarkModeToggle";
import {
  IDKitWidget,
  VerificationLevel,
  ISuccessResult,
  useIDKit,
} from "@worldcoin/idkit";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useDarkMode } from "@/contexts/DarkModeContext";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UserCheck, UserSearch } from "lucide-react";
import { Spotlight } from "@/components/ui/spotlight";
import { Cover } from "@/components/ui/cover";
import Link from "next/link";
import { TracingBeam } from "@/components/ui/tracking-beam";
import { Tabs } from "@/components/ui/tabs";

export default function App() {
  const tabs = [
    {
      title: "Homepage",
      value: "homepage",
      content: (
        <TracingBeam className="transition-all duration-300 rounded-xl">
          <main className=" mx-auto antialiased relative">
            <Hero />
            <Features />
          </main>
        </TracingBeam>
      ),
    },
    {
      title: "Explore",
      value: "explore",
      content: (
        <div className="h-[100vh] bg-brand-white dark:bg-brand-black">
          EXPLORE
        </div>
      ),
    },
  ];
  return (
    <div className="bg-blue-500">
      <Tabs containerClassName="mx-auto ml-[25%] fixed top-8" tabs={tabs} />
    </div>
  );
}

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
const Hero: React.FC = () => {
  return (
    <div className="min-h-[100vh] w-full flex md:items-center md:justify-center bg-brand-white dark:bg-brand-black  antialiased bg-grid-black/[0.05] dark:bg-grid-white/[0.02] relative overflow-hidden">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="#27F2CD"
      />
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-brand-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:[mask-image:radial-gradient(ellipse_at_center,transparent_60%,red)]"></div>

      <div className=" p-4 max-w-7xl  mx-auto relative z-30 w-full pt-20 md:pt-0 flex flex-col justify-center items-center">
        <h1 className="text-4xl md:text-4xl lg:text-6xl font-semibold max-w-7xl mx-auto text-center mt-6 relative z-50 py-6 bg-clip-text text-transparent bg-gradient-to-tr from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white ">
          Renting with a <Cover>contract-level</Cover> security and
          transparency.
        </h1>
        <p className="mt-4 font-normal text-base text-slate-500 dark:text-neutral-300 max-w-2xl text-center mx-auto">
          Rent3 is a decentralized rental platform that provides a secure and
          transparent rental experience, leveraging Base, Blockscout, and
          Worldcoin. Deployed on Mode.
        </p>
        <GetStartedButton />
      </div>
    </div>
  );
};

const GetStartedButton = () => {
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

const Features: React.FC = () => {
  return <section className="h-[100vh] bg-brand-black">selam</section>;
};
