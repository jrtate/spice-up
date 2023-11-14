import { ToastContext } from "../contexts/ToastContext";
import { useContext } from "react";

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("Must use within the toast context provider");
  return context;
}
