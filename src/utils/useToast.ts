import { useState } from "react";
import { useNavigate } from "react-router-dom";

export type ToastSeverity = "success" | "info" | "error" | "warning";

export interface ToastState {
  open: boolean;
  message: string;
  severity: ToastSeverity;
}

export const useToast = () => {
  const navigate = useNavigate();

  const [toast, setToast] = useState<ToastState>({
    open: false,
    message: "",
    severity: "info",
  });

  const [redirectAfterToast, setRedirectAfterToast] = useState<string | null>(
    null,
  );

  const showToast = (
    message: string,
    severity: ToastSeverity = "info",
    redirectTo?: string,
  ) => {
    setToast({ open: true, message, severity });
    if (redirectTo) setRedirectAfterToast(redirectTo);
  };

  const closeToast = () => {
    setToast((prev) => ({ ...prev, open: false }));

    if (redirectAfterToast) {
      navigate(redirectAfterToast, { replace: true });
      setRedirectAfterToast(null);
    }
  };

  return {
    toast,
    showToast,
    closeToast,
  };
};
