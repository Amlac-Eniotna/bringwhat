"use client";
import { updateListTitle } from "@/actions/update-list-title";
import { useToast } from "@/components/ui/use-toast";
import { Check, Loader2, Pen, Share2, X } from "lucide-react";
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
  const [isSharing, setIsSharing] = useState(false);
  const [titleText, setTitleText] = useState(title);
  const [errors, setErrors] = useState<FieldErrors>({});

  const params = useParams();
  const listId = params.id as string;
  const { toast } = useToast();

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

  const handleShare = async () => {
    setIsSharing(true);

    try {
      const url = window.location.href;

      // Try using Navigator.share API if available (mobile devices)
      if (navigator.share) {
        try {
          await navigator.share({
            title: `BringWhat`,
            text: `Check out this items list: ${title}`,
            url: url,
          });
        } catch (error) {
          // Ignorer spécifiquement l'erreur d'annulation
          if (error instanceof Error && error.name !== "AbortError") {
            // Ne remonte que les vraies erreurs, pas les annulations
            throw error;
          }
          // Sinon, c'est juste une annulation de partage, pas une vraie erreur
        }
      } else {
        // Fallback to clipboard copy
        await navigator.clipboard.writeText(url);
        toast({
          title: "Link copied!",
          description: "The list URL has been copied to your clipboard.",
          duration: 3000,
        });
      }
    } catch (error) {
      console.error("Error sharing:", error);
      // Only show error for real issues
      toast({
        title: "Failed to share",
        description: "There was an error sharing this list.",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsSharing(false);
    }
  };

  if (!isEditing) {
    return (
      <div className="flex w-full items-center justify-between">
        <div className="flex w-full items-center justify-between gap-2">
          <h1 className="m-auto w-full text-center text-xl text-black dark:text-white">
            {title}
          </h1>
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
              className="cursor-pointer backdrop-blur-xs"
              onClick={handleShare}
              disabled={isSharing}
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full gap-2 rounded-md">
      <div className="w-full">
        <input
          type="text"
          placeholder="List title"
          className="text-foreground focus:border-primary focus:ring-primary h-9 w-full rounded-md border bg-transparent p-2 text-lg font-medium backdrop-blur-xs outline-none focus:ring-1"
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

      <div className="flex gap-2">
        <Button
          onClick={handleUpdate}
          disabled={isSubmitting}
          className="border border-white"
        >
          {isSubmitting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Check className="h-4 w-4" />
          )}
        </Button>
        <Button
          variant="outline"
          className="backdrop-blur-xs"
          onClick={handleCancel}
          disabled={isSubmitting}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
