import { ReactNode } from "react";

export  interface ModalProps {
    isOpen: boolean;
    children: ReactNode;
    onClose: unknown;
    size: unknown;
    categoria: unknown | never;
  }