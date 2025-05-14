"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// Zod schema for input validation
const DeleteItemSchema = z.object({
  id: z.number().int().positive("Item ID is required"),
  listId: z.string().min(1, "List ID is required"),
});

export type DeleteItemInput = z.infer<typeof DeleteItemSchema>;

export async function deleteItem(formData: FormData | DeleteItemInput) {
  try {
    // Parse input data based on input type
    const inputData =
      formData instanceof FormData
        ? {
            id: Number(formData.get("id")) || 0,
            listId: formData.get("listId")?.toString() || "",
          }
        : formData;

    // Validate with Zod
    const validatedData = DeleteItemSchema.safeParse(inputData);

    if (!validatedData.success) {
      return {
        success: false,
        error: validatedData.error.flatten().fieldErrors,
      };
    }

    // Check if the item exists
    const existingItem = await prisma.item.findUnique({
      where: { id: validatedData.data.id },
    });

    if (!existingItem) {
      return {
        success: false,
        error: { id: ["Item not found"] },
      };
    }

    // Delete the item from the database
    await prisma.item.delete({
      where: { id: validatedData.data.id },
    });

    // Revalidate the list page to reflect the deletion
    revalidatePath(`/${validatedData.data.listId}`);

    return {
      success: true,
    };
  } catch (error) {
    console.error("Failed to delete item:", error);
    return {
      success: false,
      error: { _form: ["Failed to delete item. Please try again."] },
    };
  }
}
