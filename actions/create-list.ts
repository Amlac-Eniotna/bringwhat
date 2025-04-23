"use server";

import crypto from "crypto";
import { redirect } from "next/navigation";

export async function createList() {
  // ID plus court en base64
  const id = crypto.randomBytes(12).toString("base64url");

  redirect(`/${id}`);
}
