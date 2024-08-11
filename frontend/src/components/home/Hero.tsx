"use client";
import Link from "next/link";
import { Cover } from "../ui/cover";
import { Spotlight } from "../ui/spotlight";
import {
  IDKitWidget,
  VerificationLevel,
  ISuccessResult,
  useIDKit,
} from "@worldcoin/idkit";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ButtonProps } from "../ui/button";
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
export const Hero: React.FC = () => {
  const [onboardingNullifierHash, setOnboardingNullifierHash] = useState<
    string | null
  >(null);
  const router = useRouter();
  const userNullifierHash = getItemWithExpiry({ key: "nullifier_hash" });
  const userRole = getItemWithExpiry({ key: "userRole" });

  const BACKEND_URI = process.env.NEXT_PUBLIC_BACKEND_URI;
  const handleVerify = async (proof: ISuccessResult) => {
    localStorage.removeItem("nullifier_hash");
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
    setItemWithExpiry({
      key: "nullifier_hash",
      value: onboardingNullifierHash,
      ttl: 5000 * 60 * 60,
    });

    const isOwnerExist: any = await fetch(
      `${BACKEND_URI}owners/${onboardingNullifierHash}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }
    );

    const isTenantExist: any = await fetch(
      `${BACKEND_URI}tenants/${onboardingNullifierHash}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (isOwnerExist.id || isTenantExist.id) {
      console.log("user exist. Redirecting to the dashboard.");
      console.log("isOwnerExist", isOwnerExist);
      console.log("isTenantExist", isTenantExist);
    } else {
      console.log("user does not exist. Redirecting to the get started page");
      router.push("/get-started");
    }
  };
  return (
    <div className="min-h-[100vh] w-full flex md:items-center md:justify-center bg-brand-white dark:bg-brand-black  antialiased bg-grid-black/[0.09] dark:bg-grid-white/[0.09] relative overflow-hidden">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="#27F2CD"
      />
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-brand-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:[mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

      <div className=" p-4 max-w-7xl  mx-auto relative z-30 w-full pt-20 md:pt-0 flex flex-col justify-center items-center">
        <h1 className="text-4xl md:text-4xl lg:text-6xl font-semibold max-w-7xl mx-auto text-center mt-6 relative z-50 py-6 bg-clip-text text-transparent bg-gradient-to-tr from-neutral-800 via-neutral-600 to-neutral-500 dark:from-neutral-800 dark:via-white dark:to-white ">
          Renting with a <Cover>contract-level</Cover> security and
          transparency.
        </h1>
        <p className="mt-4 font-normal text-base text-slate-500 dark:text-neutral-300 max-w-2xl text-center mx-auto">
          Rent3 is a decentralized rental platform that provides a secure and
          transparent rental experience, leveraging Base, Blockscout, and
          Worldcoin. Deployed on Mode.
        </p>
        {userNullifierHash == "" ||
        userNullifierHash == null ||
        userRole == null ? (
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
                className="w-[300px] mt-8 px-4 py-2 flex gap-2 justify-center items-center border-2 rounded-lg shadow-sm bg-gray-900 border-gray-400 hover:border-brand-primary  dark:hover:bg-gray-950  text-gray-50 dark:text-slate-300 dark:hover:text-brand-white dark:hover:border-brand-primary hover:text-brand-primary "
                onClick={open}
              >
                <Image
                  src={`/logos/worldcoin-white.svg`}
                  alt="Logo"
                  className="w-6 h-auto"
                  width={20}
                  height={40}
                />
                <h1>Verify With WorldID</h1>
              </button>
            )}
          </IDKitWidget>
        ) : (
          <>
            {/* <div className="flex gap-2 py-2 px-4 mt-6 z-50 items-center rounded-lg border bg-green-100 text-green-500 border-green-400 text-md ">
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
            </div> */}
            <Link
              href={`/dashboard/${userRole}`}
              className="w-[250px] mt-4 px-4 py-2 flex gap-2 justify-center items-center border-2 rounded-lg shadow-sm bg-gray-900 border-gray-400 hover:border-brand-primary  dark:hover:bg-gray-950  text-gray-50 dark:text-slate-300 dark:hover:text-brand-white dark:hover:border-brand-primary hover:text-brand-primary "
            >
              Go to Dashboard
            </Link>
          </>
        )}
      </div>
    </div>
  );
};
