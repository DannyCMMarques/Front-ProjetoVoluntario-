const ModalApagarEditar = ({
    titulo,
    mensagem,
    onConfirm,
    onCancel,
    confirma,
    confirmaLabel = "Confirmar",
    rejeitaLabel = "Rejeitar",
  }) => {
    return (
      <div>
        <p
          className={`${
            confirma ? "text-[#3a4dff]" : "text-red-500"
          } text-center items-center font-bold text-xl`}
        >
          {confirma ? confirmaLabel : rejeitaLabel} Mensagem
        </p>
  
        <div className="mt-4 text-center">
          <p>
            {mensagem || `Deseja ${confirma ? confirmaLabel : rejeitaLabel} a mensagem`} 
            <strong>"{titulo}"</strong>?
          </p>
        </div>
  
        <div className="w-full h-[1px] bg-slate-400 mt-4 mb-4"></div>
  
        <div className="flex gap-3 justify-center items-center">
          <p
            onClick={onCancel}
            className="p-3 bg-gray-300 w-full text-center rounded-md cursor-pointer hover:opacity-75 duration-150"
          >
            Cancelar
          </p>
          <p
            onClick={onConfirm}
            className={`${
              confirma ? "bg-emerald-400 text-white" : "bg-red-400 text-white"
            } text-center items-center w-full p-3 rounded-md cursor-pointer hover:opacity-75 duration-150`}
          >
            {confirma ? confirmaLabel : rejeitaLabel}
          </p>
        </div>
      </div>
    );
  };
  
  export default ModalConfirmaRejeita;
  