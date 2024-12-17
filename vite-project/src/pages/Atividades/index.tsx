import { useContext, useEffect, useState } from "react";
import CardAtividadeComponent from "../../components/card-atividade";
import ContainerItem from "../../components/container";
import FormComponent from "../../components/formulario-atividade";
import Modal from "../../components/modal";
import ModalConfirmaRejeita from "../../components/modal-confirm-reject";
import AtividadeService from "../../service/atividadeService";
import { AuthContext } from "../../utils/context/useContext/useUserContext";

const Atividades = () => {


  const [atividades, setAtividades] = useState([]);
  const { userData } = useContext(AuthContext);
  const [filtro, setFiltro] = useState("Todas");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const atividadeService = AtividadeService();
  const [confirma, setConfirma] = useState(false)
  const [titulo, setTitulo] = useState("")
  const [idAtividade, setIdAtividade] = useState(null)
  const [isModalFormularioOpen,setIsModaFormulariolOpen] = useState(false)
  const [atividade,setAtividade] = useState({})
const [editar, setEditar] = useState(false)
  const handleGetAtividades = async (id: number, filtro: string) => {
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

      const response = await atividadeService.filtroAtividade({ id, queryParams });
      setAtividades(response.data);
    } catch (error) {
      console.error("Erro ao obter atividades:", error);
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

  const abrirModal = (confirma, titulo, idAtividade) => {
    setConfirma(confirma)
    setTitulo(titulo)
    setIdAtividade(idAtividade)
    setIsModalOpen(true);
  };

  const refreshAtividades = () => {
    handleGetAtividades(userData.idUsuario, "Todas")
    fecharModal()
  }
  const fecharModalFormulario = ( ) =>{
    refreshAtividades()
    setIsModaFormulariolOpen(false)
  }
  const abrirModalFormulario = (atividade) => {
    setIdAtividade(atividade.id_atividade)
    setIsModaFormulariolOpen(true);
    setAtividade(atividade);
    setEditar(true);
  };
  return (
    <div>

      <Modal isOpen={isModalOpen} onClose={fecharModal} size="small">
          <ModalConfirmaRejeita confirma={confirma} titulo={titulo} atividade={idAtividade} refresh={() => refreshAtividades()}/>
      </Modal>
      <Modal isOpen={isModalFormularioOpen} onClose={fecharModalFormulario} size="small">
          <FormComponent onClose={fecharModalFormulario} atividade={atividade} idAtividade={idAtividade} editar={editar} refresh={() => refreshAtividades() }/>
      </Modal>
      <ContainerItem>
        <div className="flex gap-3 items-center">
          <p className="font-bold text-2xl w-max">Atividades</p>
          <div className="w-full h-[0.5px] bg-slate-400"></div>
        </div>


        <div className="mt-3">
          <div className="flex gap-3 border-b">
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


        <div className="flex gap-3 flex-wrap mt-4">
          {atividades.length === 0 ? (
            <>
            <div className="bg-gray-100 text-center p-6 w-full">
              <p>Nenhuma atividade disponivel</p>
            </div>
            </>
          ) : (
            <>
            {atividades.map((atividade) => (
              <CardAtividadeComponent key={atividade.id_atividade} {...atividade}
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
               confirma={() => abrirModal(true, atividade.nomeAtividade, atividade)}
               rejeita={() => abrirModal(false, atividade.nomeAtividade, atividade)}
               editar={()=> abrirModalFormulario(atividade,)}
              />
            ))}
            </>
          )}

        </div>
      </ContainerItem>
    </div>
  );
};

export default Atividades;
