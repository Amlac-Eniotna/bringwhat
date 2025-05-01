// actions/create-list.ts
"use server";

import { prisma } from "@/lib/prisma"; // Importer l'instance partagée
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import crypto from "crypto";
import { redirect } from "next/navigation";

export async function redirectList() {
  const list = await createList();
  redirect(`/${list.id}`);
}

async function createList() {
  let created = false;
  let list = { id: "" };

  // Essayer jusqu'à ce qu'on réussisse à créer la liste
  while (!created) {
    try {
      const id = crypto.randomBytes(12).toString("base64url");

      list = await prisma.list.create({
        data: {
          id,
          title: id,
        },
      });

      created = true;
    } catch (error) {
      // Vérifier si l'erreur est de type PrismaClientKnownRequestError
      if (error instanceof PrismaClientKnownRequestError) {
        if (
          error.code === "P2002" &&
          error.meta?.target &&
          Array.isArray(error.meta.target) &&
          error.meta.target.includes("id")
        ) {
          console.log("ID collision detected, retrying with a new ID");
          continue;
        }
      }
      // Si ce n'est pas une erreur de type attendu ou pas une collision d'ID, on la propage
      throw error;
    }
  }

  return list;
}
