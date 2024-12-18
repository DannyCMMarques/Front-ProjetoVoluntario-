import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AtividadeService from "../../service/atividadeService";

const ModalConfirmaRejeita = ({
  confirma,
  titulo,
  atividade,
  refresh,
  usuario,
  excluir,
}) => {
  const { atualizarAtividadePorId, deletarAtividadePorId } = AtividadeService();

  const editarAtividade = async (payload) => {
    try {
      const response = await atualizarAtividadePorId(
        payload.id_atividade,
        payload
      );
      refresh();

    } catch (error) {
     console.error(error)
    }
  };

  const deletarAtividade = async () => {
    try {
      const response = await deletarAtividadePorId(atividade.id_atividade);
      refresh();
      successValidation("Atividade deletada com sucesso!");
    } catch (error) {
      errorValidator(error?.response.data);
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
  const handleDeletarAtividade = () => {
    deletarAtividade();
  };
  return (
    <div>
      <ToastContainer />

      <p
        className={`${
          confirma ? "text-[#3a4dff]" : "text-red-500"
        } text-center items-center font-bold text-xl`}
      >
        {excluir ? "Excluir" : confirma ? "Confirmar" : "Rejeitar"} Atividade
      </p>

      <div className="mt-4 text-center">
        <p>
          Deseja {excluir ? "Excluir" : confirma ? "Confirmar" : "Rejeitar"} a
          atividade <strong>"{titulo}"</strong>
        </p>
      </div>

      <div className="w-full h-[1px] bg-slate-400 mt-4 mb-4"></div>

      <div className="flex gap-3 justify-center items-center">
        <p className="p-3 bg-gray-300 w-full text-center rounded-md cursor-pointer hover:opacity-75 duration-150">
          Cancelar
        </p>
        <p
          onClick={
            excluir
              ? () => handleDeletarAtividade()
              : () => handleEditAtividade(confirma)
          }
          className={`${
            confirma ? "bg-emerald-400 text-white" : "bg-red-400 text-white"
          } text-center items-center w-full p-3 rounded-md cursor-pointer hover:opacity-75 duration-150`}
        >
          {excluir ? "Excluir" : confirma ? "Confirmar" : "Rejeitar"}
        </p>
      </div>
    </div>
  );
};

export default ModalConfirmaRejeita;
