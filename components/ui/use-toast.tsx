"use client";

import * as React from "react";

type ToastProps = {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  variant?: "default" | "destructive" | "dismissing";
  duration?: number;
};

const TOAST_LIMIT = 5;
const TOAST_REMOVE_DELAY = 1000;

type ToasterToast = ToastProps & {
  createdAt: number;
};

let count = 0;

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

const toasts = new Map<string, ToasterToast>();

const listeners: Array<(toasts: Array<ToasterToast>) => void> = [];

const emit = () => {
  listeners.forEach((listener) => {
    listener(Array.from(toasts.values()));
  });
};

function on(listener: (toasts: Array<ToasterToast>) => void) {
  listeners.push(listener);
  return () => {
    const index = listeners.indexOf(listener);
    if (index > -1) {
      listeners.splice(index, 1);
    }
  };
}

function off(listener: (toasts: Array<ToasterToast>) => void) {
  const index = listeners.indexOf(listener);
  if (index > -1) {
    listeners.splice(index, 1);
  }
}

type ToastWithFunctions = (props: Omit<ToastProps, "id">) => {
  id: string;
  dismiss: () => void;
  update: (props: ToastProps) => void;
};

// Élargir l'interface avec les méthodes statiques
interface ToastFunction extends ToastWithFunctions {
  update: (id: string, props: ToastProps) => void;
  dismiss: (id?: string) => void;
  dismissWithAnimation: (id: string) => void;
}

export const toast = ((props: Omit<ToastProps, "id">) => {
  const id = genId();

  const update = (props: ToastProps) => {
    if (toasts.has(id)) {
      toasts.set(id, { ...toasts.get(id)!, ...props, id });
      emit();
    }
  };

  const dismiss = () => {
    if (toasts.has(id)) {
      toasts.delete(id);
      emit();
    }
  };

  // Respecter la limite de toasts en supprimant les plus anciens
  if (toasts.size >= TOAST_LIMIT) {
    const oldestToastId = Array.from(toasts.values()).sort(
      (a, b) => a.createdAt - b.createdAt,
    )[0]?.id;

    if (oldestToastId) {
      toasts.delete(oldestToastId);
    }
  }

  toasts.set(id, {
    ...props,
    id,
    createdAt: Date.now(),
    duration: props.duration || 5000,
  });
  emit();

  return {
    id,
    dismiss,
    update,
  };
}) as ToastFunction;

toast.update = (id: string, props: ToastProps) => {
  if (toasts.has(id)) {
    const newProps = { ...toasts.get(id)!, ...props };
    toasts.set(id, newProps);
    emit();
  }
};

toast.dismiss = (id?: string) => {
  if (id) {
    if (toasts.has(id)) {
      toasts.delete(id);
      emit();
    }
  } else {
    toasts.clear();
    emit();
  }
};

// Fonction pour programmer la suppression des toasts après le délai d'animation
toast.dismissWithAnimation = (id: string) => {
  if (toasts.has(id)) {
    // Marquer le toast pour suppression en définissant la variante "dismissing"
    const toast = toasts.get(id)!;
    toasts.set(id, { ...toast, variant: "dismissing" });
    emit();

    // Supprimer après le délai d'animation
    setTimeout(() => {
      if (toasts.has(id)) {
        toasts.delete(id);
        emit();
      }
    }, TOAST_REMOVE_DELAY);
  }
};

interface UseToastOptions {
  duration?: number;
}

export interface ToastApi {
  toasts: ToasterToast[];
  toast: (props: Omit<ToastProps, "id">) => {
    id: string;
    dismiss: () => void;
    update: (props: ToastProps) => void;
  };
  dismiss: (id: string) => void;
  dismissToast: (id: string) => void;
  dismissWithAnimation?: (id: string) => void;
}

export function useToast(options?: UseToastOptions): ToastApi {
  const [toastState, setToastState] = React.useState<ToasterToast[]>([]);

  React.useEffect(() => {
    const unsubscribe = on(setToastState);
    return () => {
      unsubscribe();
      off(setToastState);
    };
  }, []);

  const duration = options?.duration;

  const dismissToast = React.useCallback((id: string) => {
    toast.dismiss(id);
  }, []);

  const dismissWithAnimation = React.useCallback((id: string) => {
    toast.dismissWithAnimation(id);
  }, []);

  return {
    toasts: toastState,
    toast: React.useCallback(
      (props: Omit<ToastProps, "id">) => {
        return toast({
          ...props,
          duration: props.duration || duration,
        });
      },
      [duration],
    ),
    dismiss: dismissToast,
    dismissToast,
    dismissWithAnimation,
  };
}
