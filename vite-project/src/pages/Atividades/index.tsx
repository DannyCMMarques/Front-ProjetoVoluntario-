import { useContext, useEffect, useState } from "react";
import CardAtividadeComponent from "../../components/card-atividade";
import ContainerItem from "../../components/container";
import AtividadeService from "../../service/atividadeService";
import { AuthContext } from "../../utils/context/useContext/useUserContext";

const Atividades = () => {
  const [atividades, setAtividades] = useState([]);
  const { userData } = useContext(AuthContext);
  const [filtro, setFiltro] = useState("Todas");

  const atividadeService = AtividadeService();

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

  return (
    <div>
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
          {atividades.map((atividade) => (
            <CardAtividadeComponent key={atividade.id} {...atividade}
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
            />
          ))}
        </div>
      </ContainerItem>
    </div>
  );
};

export default Atividades;
