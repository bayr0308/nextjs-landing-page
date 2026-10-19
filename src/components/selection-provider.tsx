"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type SelectionContextValue = {
  selectedProject: string;
  setSelectedProject: (id: string) => void;
  consult: (id: string) => void;
};
const SelectionContext = createContext<SelectionContextValue | null>(null);

export function SelectionProvider({ children }: { children: ReactNode }) {
  const [selectedProject, setSelectedProject] = useState("");
  const consult = (id: string) => {
    setSelectedProject(id);
    requestAnimationFrame(() => {
      document.getElementById("contacts")?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
      });
      document.getElementById("consultation-name")?.focus({ preventScroll: true });
    });
  };
  return (
    <SelectionContext value={{ selectedProject, setSelectedProject, consult }}>
      {children}
    </SelectionContext>
  );
}

export function useSelection() {
  const context = useContext(SelectionContext);
  if (!context) throw new Error("SelectionProvider is required");
  return context;
}
