"use client";
import { getWorldAppId, getBackendURI } from "@/actions/envActions";
import {
  IDKitWidget,
  VerificationLevel,
  ISuccessResult,
  useIDKit,
} from "@worldcoin/idkit";
import { useEffect } from "react";
import dotenv from "dotenv";

dotenv.config();

export function Verify() {
  const { open, setOpen } = useIDKit();

  const APP_ID = (process.env.WORLD_ID_APP_ID || "") as `app_${string}`;
  const ACTION_ID = "testing-action"; // process.env.ACTION_ID;
  const BACKEND_URI = process.env.BACKEND_URI || "";

  const handleVerify = async (proof: ISuccessResult) => {
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

  const onSuccess = () => {
    // This is where you should perform any actions after the modal is closed
    // Such as redirecting the user to a new page
    console.log("Verification successful");
  };

  useEffect(() => {
    setOpen(true);
  }, []);

  return (
    <IDKitWidget
      app_id={APP_ID} // obtained from the Developer Portal
      action={ACTION_ID} // obtained from the Developer Portal
      onSuccess={onSuccess} // callback when the modal is closed
      handleVerify={handleVerify} // callback when the proof is received
      verification_level={VerificationLevel.Device}
    >
      {({ open }) => (
        // This is the button that will open the IDKit modal
        <button onClick={open}>Verify with World ID</button>
      )}
    </IDKitWidget>
  );
}
