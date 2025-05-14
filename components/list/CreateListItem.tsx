"use client";
import { addItem } from "@/actions/add-item";
import { Check, Loader2, Plus, X } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";

// Define proper types for the error structure
type FieldErrors = {
  title?: string[];
  quantity?: string[];
  listId?: string[];
  _form?: string[];
};

export function CreateListItem() {
  const [isCreating, setIsCreating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [title, setTitle] = useState("");
  const [quantity, setQuantity] = useState("");

  const params = useParams();
  const listId = params.id as string;

  const handleAddItem = async () => {
    setIsSubmitting(true);
    setErrors({});

    try {
      const result = await addItem({
        listId,
        title,
        quantity: quantity || undefined,
      });

      if (!result.success) {
        setErrors(result.error as FieldErrors);
        setIsSubmitting(false);
        return;
      }

      // Reset form and close
      setTitle("");
      setQuantity("");
      setIsCreating(false);
      setIsSubmitting(false);
    } catch (error) {
      console.error("Error adding item:", error);
      setErrors({ _form: ["An unexpected error occurred"] });
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setTitle("");
    setQuantity("");
    setErrors({});
    setIsCreating(false);
  };

  if (!isCreating) {
    return (
      <Button
        variant="outline"
        className="w-full cursor-pointer backdrop-blur-xs"
        onClick={() => setIsCreating(true)}
      >
        <Plus />
      </Button>
    );
  }

  return (
    <div className="w-full space-y-2 rounded-md border p-3">
      <div className="space-y-2">
        <div>
          <input
            type="text"
            placeholder="Item name"
            className="text-foreground focus:border-primary focus:ring-primary w-full rounded-md border bg-transparent p-2 outline-none focus:ring-1"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isSubmitting}
          />
          {errors.title && (
            <p className="text-destructive mt-1 text-xs">{errors.title[0]}</p>
          )}
        </div>

        <div>
          <input
            type="text"
            placeholder="Quantity (optional)"
            className="text-foreground focus:border-primary focus:ring-primary w-full rounded-md border bg-transparent p-2 outline-none focus:ring-1"
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
      </div>

      {errors._form && (
        <p className="text-destructive text-xs">{errors._form[0]}</p>
      )}

      <div className="flex justify-end gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleCancel}
          disabled={isSubmitting}
        >
          <X className="h-4 w-4" />
        </Button>
        <Button size="sm" onClick={handleAddItem} disabled={isSubmitting}>
          {isSubmitting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Check className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
}
