import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AtividadeExibida from "../../components/atividadeExibida";
import CardAtividadeComponent from "../../components/card-atividade";
import ContainerItem from "../../components/container";
import FormComponent from "../../components/formulario-atividade";
import Modal from "../../components/modal";
import ModalConfirmaRejeita from "../../components/modal-confirm-reject";
import Paginacao from "../../components/paginacao";
import AtividadeService from "../../service/atividadeService";
import { AuthContext } from "../../utils/context/useContext/useUserContext";

const errorValidator = (data: string) =>
  toast.error(`${data}`, {
    position: "top-right",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  });

const Atividades = () => {
  const [atividades, setAtividades] = useState([]);
  const { userData } = useContext(AuthContext);
  const [filtro, setFiltro] = useState("Todas");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const atividadeService = AtividadeService();
  const [confirma, setConfirma] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [idAtividade, setIdAtividade] = useState(null);
  const [isModalFormularioOpen, setIsModaFormulariolOpen] = useState(false);
  const [atividade, setAtividade] = useState({});
  const [editar, setEditar] = useState(false);
  const [excluir, setExcluir] = useState(false);
  const [isModalExibirOpen, setIsModalExibirOpen] = useState(false);
  const [infoPaginacao, setInfoPaginacao] = useState({
    currentPage: 1,
    totalItems: 0,
    itemsPerPage: 10,
  });

  const handleGetAtividades = async (
    id: number,
    filtro: string,
    page = 0,
    size = 10
  ) => {
    try {
      let queryParams = {};
      switch (filtro) {
        case "Pendentes":
          queryParams = { confirmada: false, rejeitada: false };
          break;
        case "Rejeitadas":
          queryParams = { confirmada: false, rejeitada: true };
          break;
        case "Aceitas":
          queryParams = { confirmada: true };
          break;
        case "Concluidas":
          queryParams = { finalizada: true };
          break;
        default:
          queryParams = {};
      }

      const response = await atividadeService.filtroAtividade({
        id,
        queryParams,
        page,
        size,
      });

      setAtividades(response.data.content);
      setInfoPaginacao({
        currentPage: response.data.pageable.pageNumber + 1,
        totalItems: response.data.totalElements,
        itemsPerPage: response.data.pageable.pageSize,
      });
    } catch (error) {
      errorValidator(error?.response.data);
    }
  };

  useEffect(() => {
    if (userData?.idUsuario) {
      handleGetAtividades(userData.idUsuario, "Todas");
    }
  }, [userData]);

  const handleFiltroClick = (filtroSelecionado: string) => {
    setFiltro(filtroSelecionado);
    if (userData?.idUsuario) {
      handleGetAtividades(userData.idUsuario, filtroSelecionado);
    }
  };

  const filtros = ["Todas", "Pendentes", "Aceitas", "Rejeitadas", "Concluidas"];

  const fecharModal = () => {
    setIsModalOpen(false);
  };

  const abrirModal = (confirma, titulo, idAtividade, excluir) => {
    setConfirma(confirma);
    setTitulo(titulo);
    setIdAtividade(idAtividade);
    setIsModalOpen(true);
    setExcluir(excluir);
  };
  const refreshAtividades = () => {
    handleGetAtividades(userData.idUsuario, "Todas");
    fecharModal();
  };
  const fecharModalFormulario = () => {
    refreshAtividades();
    setIsModaFormulariolOpen(false);
  };
  const abrirModalFormulario = (atividade) => {
    setIdAtividade(atividade.id_atividade);
    setIsModaFormulariolOpen(true);
    setAtividade(atividade);
    setEditar(true);
  };
  const abrirModalExibir = (atividade) => {
    setAtividade(atividade);
    setIsModalExibirOpen(true);
  };
  const fecharModalExibir = () => {
    setIsModalExibirOpen(false);
  };

  return (
    <div>
      <Modal isOpen={isModalOpen} onClose={fecharModal} size="small">
        <ModalConfirmaRejeita
          excluir={excluir}
          confirma={confirma}
          titulo={titulo}
          atividade={idAtividade}
          refresh={() => refreshAtividades()}
        />
      </Modal>
      <Modal
        isOpen={isModalFormularioOpen}
        onClose={fecharModalFormulario}
        size="small"
      >
        <FormComponent
          onClose={fecharModalFormulario}
          atividade={atividade}
          idAtividade={idAtividade}
          editar={editar}
          refresh={() => refreshAtividades()}
        />
      </Modal>
      <Modal
        isOpen={isModalExibirOpen}
        onClose={fecharModalExibir}
        size="medium"
      >
        <AtividadeExibida atividade={atividade} />
      </Modal>
      <ContainerItem>
        <div className="flex flex-col gap-3">
          <div className="flex gap-3 items-center">
            <p className="font-bold text-2xl">Atividades</p>
            <div className="w-full h-[0.5px] bg-slate-400"></div>
          </div>

          <div className="mt-3">
            <div className="flex flex-wrap gap-3 border-b">
              {filtros.map((nomeFiltro) => (
                <p
                  key={nomeFiltro}
                  onClick={() => handleFiltroClick(nomeFiltro)}
                  className={`cursor-pointer pb-2 ${
                    filtro === nomeFiltro
                      ? "text-blue-500 font-bold border-b-2 border-blue-500"
                      : "text-gray-500"
                  }`}
                >
                  {nomeFiltro}
                </p>
              ))}
            </div>
          </div>

          {atividades.length === 0 && (
              <div className="bg-gray-100 text-center p-6 w-full">
                <p>Nenhuma atividade disponível</p>
              </div>
            )
          }

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">

              {atividades.map((atividade) => (
                <div
                  key={atividade.id_atividade}
                  className="flex justify-center sm:justify-start"
                >
                  <CardAtividadeComponent
                    {...atividade}
                    status={
                      atividade.finalizada
                        ? "Concluída"
                        : atividade.rejeitada
                        ? "Rejeitada"
                        : atividade.confirmada
                        ? "Aceita"
                        : "Pendente"
                    }
                    titulo={atividade.nomeAtividade}
                    descricao={atividade.descricaoAtividade}
                    criador={atividade.usuarioCriador}
                    convidado={atividade.usuarioConvidado}
                    criadaEm={atividade.dataCadastro}
                    dataEncontro={atividade.dataEncontro}
                    horarioo={atividade.horario}
                    local={atividade.endereco}
                    idUsuario={userData?.idUsuario}
                    confirma={() =>
                      abrirModal(
                        true,
                        atividade.nomeAtividade,
                        atividade,
                        false
                      )
                    }
                    rejeita={() =>
                      abrirModal(
                        false,
                        atividade.nomeAtividade,
                        atividade,
                        false
                      )
                    }
                    editar={() => abrirModalFormulario(atividade)}
                    deletar={() =>
                      abrirModal(
                        false,
                        atividade.nomeAtividade,
                        atividade,
                        true
                      )
                    }
                    visualizar={() => abrirModalExibir(atividade)}
                  />
                </div>
              ))
            }
          </div>

          {atividades.length !== 0 && (
            <Paginacao
              currentPage={infoPaginacao.currentPage}
              totalItems={infoPaginacao.totalItems}
              itemsPerPage={infoPaginacao.itemsPerPage}
              onPageChange={(page) =>
                handleGetAtividades(userData.idUsuario, filtro, page - 1)
              }
            />
          )}
        </div>
      </ContainerItem>
    </div>
  );
};

export default Atividades;
