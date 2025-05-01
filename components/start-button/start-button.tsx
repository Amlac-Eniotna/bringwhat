"use client";
import { redirectList } from "@/actions/create-list";
import { Loader2, NotebookPen } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";

export function StartButton() {
  const [isLoading, setIsLoading] = useState(false);

  async function handleCreateList() {
    try {
      setIsLoading(true);
      await redirectList();
    } catch (error) {
      console.error("Failed to create list:", error);
      setIsLoading(false);
    }
  }

  return (
    <Button
      onClick={handleCreateList}
      disabled={isLoading}
      className={isLoading ? "cursor-default" : "cursor-pointer"}
    >
      {isLoading ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <NotebookPen className="mr-2" />
      )}
      {isLoading ? "Creating..." : "Create"}
    </Button>
  );
}
