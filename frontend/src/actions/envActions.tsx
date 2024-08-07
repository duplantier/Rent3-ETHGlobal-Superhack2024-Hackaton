"use server";

import { config } from "dotenv";

config();

export async function getWorldAppId() {
  return process.env.WORLD_APP_ID as `app_${string}`;
}

export async function getBackendURI() {
  return process.env.BACKEND_URI;
}
