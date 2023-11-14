import React, { createContext, useState } from "react";
import { Snackbar } from "@mui/material";

export interface ToastContextProps {
  handleSetShowToast: (toastMessage: string) => void;
}

export const ToastContext = createContext<ToastContextProps | undefined>(
  undefined,
);

export interface ToastProviderProps {
  children?: any;
}

const ToastProvider = ({ children }: ToastProviderProps) => {
  const [showToast, setShowToast] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const handleSetShowToast = (toastMessage: string) => {
    setMessage(toastMessage);
    setShowToast(true);
  };

  const globalValues = {
    handleSetShowToast,
  };

  return (
    <ToastContext.Provider value={globalValues}>
      <Snackbar
        open={showToast}
        autoHideDuration={5000}
        onClose={() => setShowToast(false)}
        message={message}
      />
      {children}
    </ToastContext.Provider>
  );
};

export default ToastProvider;
