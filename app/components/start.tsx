import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function Start() {
  const [disabled, setDisabled] = useState(false);
  const router = useRouter();

  async function handleClick() {
    try {
      setDisabled(true);
      const response = await fetch("/api/pages", { method: "POST" });
      const data = await response.json();
      router.push(`/${data.id}`);
    } catch (error) {
      console.error("Failed to generate page:", error);
    }
  }
  return (
    <Button
      onClick={handleClick}
      className="mb-4 bg-slate-700"
      variant="outline"
      disabled={disabled}
    >
      {disabled ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      Start
    </Button>
  );
}
