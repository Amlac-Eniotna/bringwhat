"use client";
import { updateListTitle } from "@/actions/update-list-title";
import { Check, Loader2, Pen, X } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";

// Define proper types for the error structure
type FieldErrors = {
  title?: string[];
  _form?: string[];
};

export interface ListTitleProps {
  title: string;
}

export function ListTitle({ title }: ListTitleProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [titleText, setTitleText] = useState(title);
  const [errors, setErrors] = useState<FieldErrors>({});

  const params = useParams();
  const listId = params.id as string;

  const handleUpdate = async () => {
    setIsSubmitting(true);
    setErrors({});

    try {
      const result = await updateListTitle({
        id: listId,
        title: titleText,
      });

      if (!result.success) {
        setErrors(result.error as FieldErrors);
        setIsSubmitting(false);
        return;
      }

      setIsEditing(false);
      setIsSubmitting(false);
    } catch (error) {
      console.error("Error updating list title:", error);
      setErrors({ _form: ["An unexpected error occurred"] });
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    // Reset to original value
    setTitleText(title);
    setErrors({});
    setIsEditing(false);
  };

  if (!isEditing) {
    return (
      <div className="flex items-center">
        <h1 className="mr-6 max-w-lg text-xl font-black text-pretty text-black dark:text-white">
          {title}
        </h1>
        <Button
          variant="outline"
          className="cursor-pointer backdrop-blur-xs"
          onClick={() => setIsEditing(true)}
        >
          <Pen />
        </Button>
      </div>
    );
  }

  return (
    <div className="flex w-full gap-2 rounded-md">
      <div className="w-full">
        <input
          type="text"
          placeholder="Title"
          className="text-foreground focus:border-primary focus:ring-primary h-9 w-full rounded-md border bg-transparent px-3 text-lg font-medium backdrop-blur-xs outline-none focus:ring-1"
          value={titleText}
          onChange={(e) => setTitleText(e.target.value)}
          disabled={isSubmitting}
        />
        {errors.title && (
          <p className="text-destructive mt-1 text-xs">{errors.title[0]}</p>
        )}
      </div>

      {errors._form && (
        <p className="text-destructive text-xs">{errors._form[0]}</p>
      )}

      <div className="flex justify-end gap-2">
        <Button
          variant="outline"
          onClick={handleCancel}
          disabled={isSubmitting}
        >
          <X className="h-4 w-4" />
        </Button>
        <Button onClick={handleUpdate} disabled={isSubmitting}>
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
