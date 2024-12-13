import { ReactNode } from "react";

export  interface ModalProps {
    isOpen: boolean;
    children: ReactNode;
    onClose: unknown;
    size: unknown;
  }


  export type BotaoProps = {
    tipo: "criar" | "confirmar" | "rejeitar" | "editar";
    onClick: () => void;
    buttonType?: "button" | "submit";
  };