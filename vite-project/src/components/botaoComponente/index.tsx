import { BotaoProps } from "../../utils/interfaces/ModalProps";


  const Botao: React.FC<BotaoProps> = ({ tipo, onClick, buttonType = "button" }) => {
    const buttonStyles = {
      criar: "bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600",
      confirmar: "bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600",
      rejeitar: "bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600",
      editar: "bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600",
    };

    const buttonLabels = {
      criar: "Criar",
      confirmar: "Confirmar",
      rejeitar: "Rejeitar",
      editar: "Editar",
    };

    return (
      <button
        type={buttonType}
        className={buttonStyles[tipo]}
        onClick={onClick}
      >
        {buttonLabels[tipo]}
      </button>
    );
  };

  export default Botao;