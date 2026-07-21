import { useContext } from "react";
import { ApplicationStatusContext } from "../context/ApplicationStatusContext";

export function useApplicationStatus() {
  const context = useContext(ApplicationStatusContext);
  if (!context) {
    throw new Error(
      "useApplicationStatus ApplicationStatusProvider daxilində istifadə olunmalıdır"
    );
  }
  return context;
}