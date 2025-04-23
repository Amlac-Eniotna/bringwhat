"use client";
import { createList } from "@/actions/create-list";
import { NotebookPen } from "lucide-react";
import { Button } from "../ui/button";

export function StartButton() {
  return (
    <Button onClick={() => createList()}>
      <NotebookPen />
      Create
    </Button>
  );
}
