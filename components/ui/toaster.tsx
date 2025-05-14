"use client";

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import * as React from "react";

// Définition correcte du type de toast qui correspond à celui dans use-toast.ts
type ToastProps = React.ComponentProps<typeof Toast> & {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  variant?: "default" | "destructive" | "dismissing";
};

interface Toaster {
  toasts: ToastProps[];
  className?: string;
}

export function Toaster({ toasts, className }: Toaster) {
  const { dismissToast, dismissWithAnimation } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props} className={cn(className)}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose
              onClick={() => {
                // Utiliser la méthode d'animation pour une meilleure expérience utilisateur
                if (id) {
                  // Vérifier si la fonction dismissWithAnimation est disponible
                  if (dismissWithAnimation) {
                    dismissWithAnimation(id);
                  } else {
                    // Sinon, utiliser dismissToast standard
                    dismissToast(id);
                  }
                }
              }}
            />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
