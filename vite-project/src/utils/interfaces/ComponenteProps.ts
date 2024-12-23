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

  export interface ProfileCardProps {
    name: string;
    especifico: string;
    dataNacimento: string;
    cidade: string;
    estado: string;
    profile: string;
    profissao: string;
  }
 export  interface ChildrenProps {
    children: React.ReactNode;
  }
  export default interface FormData {
    nomeAtividade: string;
    descricaoAtividade: string;
    dataEncontro: string;
    horario: string;
    tipoEncontro: "ONLINE" | "PRESENCIAL";
    endereco?: string;
  }

 export interface FormData {
    nomeAtividade: string;
    descricaoAtividade: string;
    dataEncontro: string;
    horario: string;
    tipoEncontro: "ONLINE" | "PRESENCIAL";
    endereco?: string;
    usuario: any;
    usuarioSelecionado: any;
  }