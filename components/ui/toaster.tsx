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

export function Toaster({ toasts = [], className }: Partial<Toaster>) {
  const { toasts: hookToasts, dismissToast, dismissWithAnimation } = useToast();
  
  // Utiliser les toasts du hook si aucun n'est fourni via les props
  const activeToasts = toasts.length ? toasts : hookToasts;

  return (
    <ToastProvider>
      {activeToasts.map(function ({ id, title, description, action, variant, ...props }) {
        // Filtrer les props internes qui ne doivent pas être transmises aux éléments DOM
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { duration, createdAt, ...restProps } = props as { duration?: number; createdAt?: number; [key: string]: unknown };
        
        return (
          <Toast key={id} variant={variant} className={cn(className)} {...restProps}>
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
