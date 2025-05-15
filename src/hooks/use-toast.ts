
import { toast as sonnerToast, type ToastT } from "sonner";
import { useToast as useSonnerToast } from "@/components/ui/toast";

// Re-export the useToast hook from @/components/ui/toast
export const useToast = useSonnerToast;

// Create a toast function that matches the expected interface
export const toast = ({ 
  title, 
  description, 
  variant = "default" 
}: { 
  title?: string; 
  description?: string; 
  variant?: "default" | "destructive"; 
}): void => {
  if (variant === "destructive") {
    sonnerToast.error(title, {
      description,
    });
  } else {
    sonnerToast.message(title || "", {
      description,
    });
  }
};
