import AtividadeService from "../../service/atividadeService";

const ModalConfirmaRejeita = ({ confirma, titulo, atividade, refresh }) => {
  const { atualizarAtividadePorId } = AtividadeService();

  const editarAtividade = async (payload) => {
    try {
      const response = await atualizarAtividadePorId(
        payload.id_atividade,
        payload
      );
      refresh()
    } catch (error) {
      console.error("Erro ao atualizar atividade:", error);
    }
  };

  const handleEditAtividade = (confirmar) => {
    const payload = {
      ...atividade,
      confirmada: confirmar ? true : false,
      rejeitada: !confirmar ? true : false,
    };

    editarAtividade(payload);
  };

  return (
    <div>
      <p
        className={`${
          confirma ? "text-[#3a4dff]" : "text-red-500"
        } text-center items-center font-bold text-xl`}
      >
        {confirma ? "Confirmar" : "Rejeitar"} Mensagem
      </p>

      <div className="mt-4 text-center">
        <p>
          Deseja {confirma ? "Confirmar" : "Rejeitar"} a mensagem{" "}
          <strong>"{titulo}"</strong>
        </p>
      </div>

      <div className="w-full h-[1px] bg-slate-400 mt-4 mb-4"></div>

      <div className="flex gap-3 justify-center items-center">
        <p className="p-3 bg-gray-300 w-full text-center rounded-md cursor-pointer hover:opacity-75 duration-150">
          Cancelar
        </p>
        <p
          onClick={() => handleEditAtividade(confirma)}
          className={`${
            confirma ? "bg-emerald-400 text-white" : "bg-red-400 text-white"
          } text-center items-center w-full p-3 rounded-md cursor-pointer hover:opacity-75 duration-150`}
        >
          {" "}
          {confirma ? "Confirmar" : "Rejeitar"}
        </p>
      </div>
    </div>
  );
};

export default ModalConfirmaRejeita;
