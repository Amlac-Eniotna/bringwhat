"use client";
import { deleteItem } from "@/actions/delete-item";
import { updateItem } from "@/actions/update-item";
import { Check, Loader2, Pen, Trash2, X } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";

// Define proper types for the error structure
type FieldErrors = {
  title?: string[];
  quantity?: string[];
  id?: string[];
  _form?: string[];
};

export interface ListItemProps {
  item: {
    id: number;
    food: string;
    qt: string;
  };
}

export function Item({ item }: ListItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [title, setTitle] = useState(item.food);
  const [quantity, setQuantity] = useState(item.qt);
  const [errors, setErrors] = useState<FieldErrors>({});

  const params = useParams();
  const listId = params.id as string;

  const handleUpdate = async () => {
    setIsSubmitting(true);
    setErrors({});

    try {
      const result = await updateItem({
        id: item.id,
        listId,
        title,
        quantity,
      });

      if (!result.success) {
        setErrors(result.error as FieldErrors);
        setIsSubmitting(false);
        return;
      }

      setIsEditing(false);
      setIsSubmitting(false);
    } catch (error) {
      console.error("Error updating item:", error);
      setErrors({ _form: ["An unexpected error occurred"] });
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    setErrors({});

    try {
      const result = await deleteItem({
        id: item.id,
        listId,
      });

      if (!result.success) {
        setErrors(result.error as FieldErrors);
        setIsDeleting(false);
        return;
      }

      // The item will be removed from the UI automatically
      // when the page revalidates
      setIsDeleting(false);
    } catch (error) {
      console.error("Error deleting item:", error);
      setErrors({ _form: ["An unexpected error occurred"] });
      setIsDeleting(false);
    }
  };

  const handleCancel = () => {
    // Reset to original values
    setTitle(item.food);
    setQuantity(item.qt);
    setErrors({});
    setIsEditing(false);
  };

  if (!isEditing) {
    return (
      <li className="mb-3 flex items-center justify-between gap-2">
        <div className="flex w-full items-center justify-between gap-2 divide-x border-b">
          <p className="flex h-9 w-full items-center p-3">{item.food}</p>
          <p className="flex h-9 w-full max-w-12 items-center p-3 md:max-w-16">
            {item.qt}
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="cursor-pointer backdrop-blur-xs"
            onClick={() => setIsEditing(true)}
          >
            <Pen className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="text-destructive hover:bg-destructive/10 cursor-pointer backdrop-blur-xs"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Trash2 className="h-4 w-4" />
            )}
          </Button>
        </div>
      </li>
    );
  }

  return (
    <li className="mb-3">
      <div className="flex w-full gap-2">
        <div className="flex w-full gap-2">
          <input
            type="text"
            placeholder="Item name"
            className="text-foreground focus:border-primary focus:ring-primary h-9 w-full rounded-md border bg-transparent px-3 backdrop-blur-xs outline-none focus:ring-1"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isSubmitting}
          />
          {errors.title && (
            <p className="text-destructive mt-1 text-xs">{errors.title[0]}</p>
          )}
          <input
            type="text"
            placeholder="Quantity"
            className="text-foreground focus:border-primary focus:ring-primary h-9 w-full max-w-16 rounded-md border bg-transparent px-3 backdrop-blur-xs outline-none focus:ring-1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            disabled={isSubmitting}
          />
          {errors.quantity && (
            <p className="text-destructive mt-1 text-xs">
              {errors.quantity[0]}
            </p>
          )}
        </div>

        {errors._form && (
          <p className="text-destructive text-xs">{errors._form[0]}</p>
        )}

        <div className="flex gap-2">
          {" "}
          <Button
            className="border border-white"
            onClick={handleUpdate}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Check className="h-4 w-4" />
            )}
          </Button>
          <Button
            className="backdrop-blur-xs"
            variant="outline"
            onClick={handleCancel}
            disabled={isSubmitting}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </li>
  );
}
