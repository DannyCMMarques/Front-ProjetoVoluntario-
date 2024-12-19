import { useContext, useEffect, useState } from "react";
import ContainerItem from "../../components/container";
import AtividadeService from "../../service/atividadeService";
import UsuarioService from "../../service/UsuarioService";
import { AuthContext } from "../../utils/context/useContext/useUserContext";
const Dashboard = () => {
  const [idosos, setIdosos] = useState();
  const [voluntarios, setVoluntarios] = useState();
  const [ativPendentes, setAtivPendentes] = useState([]);
  const [ativConfirmada, setAtivConfirmada] = useState([]);

  const { userData } = useContext(AuthContext);
  const [usuarioConectado, setUsuarioConectado] = useState(userData);
  const { filtrarUsuariosTipo } = UsuarioService();
  const { filtroAtividade, MinhasAtividades } = AtividadeService();

  const getUsuarios = async () => {
    try {
      const responseIdoso = await filtrarUsuariosTipo("IDOSO");
      setIdosos(responseIdoso.data.totalElements);
      const responseVoluntarios = await filtrarUsuariosTipo("VOLUNTARIO");
      setVoluntarios(responseVoluntarios.data.totalElements);
    } catch (error) {
      console.error("Erro ao buscar voluntários:", error);
    }
  };

  const getAtividade = async (id: number) => {
    try {
      const response = await MinhasAtividades(id);
      console.log("ativoidade", response);
    } catch (error) {
      console.error("Erro ao buscar voluntários:", error);
    }
  };
  const handleAtividadePendente = async (
    id: number,
    page = 0,
    size = 10
  ) => {
    try {
    const queryParams = { confirmada: false, rejeitada: false };

      const response = await filtroAtividade({
        id,
        queryParams,
        page,
        size,
      });
      setAtivPendentes(response.data.content);
      console.log(222,response.data.content)
    } catch (error) {
      console.log(error?.response.data);
    }
  };
  const handleAtividadeConfirmada = async (
    id: number,
    page = 0,
    size = 10
  ) => {
    try {
    const queryParams = { confirmada: true, rejeitada: false };

      const response = await filtroAtividade({
        id,
        queryParams,
        page,
        size,
      });
      setAtivConfirmada(response.data.content);
      console.log(response.data.content)
    } catch (error) {
      console.log(error?.response.data);
    }
  };

  useEffect(() => {
    getUsuarios();
    if (userData?.idUsuario) {
     handleAtividadeConfirmada(userData.idUsuario);
     handleAtividadePendente(userData.idUsuario);
    }
  }, []);
  const  converterData = (dataAmericana) => {
    const data = new Date(dataAmericana);
    return data.toLocaleDateString('pt-BR');
}

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <ContainerItem>
        <div className="flex flex-wrap justify-between items-start mb-6 gap-4">
          <div className="w-full lg:w-1/2">
            <h1 className="text-3xl font-bold text-blue-600">
              Olá, {userData?.nome}! 👋
            </h1>
          </div>

          <div className="w-full lg:w-1/2 flex flex-wrap gap-4 justify-start lg:justify-start">
            <div className="bg-blue-500 text-white p-3 rounded-md shadow-md hover:bg-blue-600 transition-all duration-300 text-center w-32">
              <h2 className="text-sm font-semibold">Confirmadas</h2>
              <p className="text-lg font-bold">{ativConfirmada?.length}</p>
            </div>
            <div className="bg-yellow-500 text-white p-3 rounded-md shadow-md hover:bg-yellow-600 transition-all duration-300 text-center w-32">
              <h2 className="text-sm font-semibold">Pendentes</h2>
              <p className="text-lg font-bold">
              {ativPendentes?.length}
              </p>
            </div>
            <div className="bg-green-500 text-white p-3 rounded-md shadow-md hover:bg-green-600 transition-all duration-300 text-center w-32">
              <h2 className="text-sm font-semibold">Voluntários</h2>
              <p className="text-lg font-bold">{voluntarios}</p>
            </div>
            <div className="bg-orange-500 text-white p-3 rounded-md shadow-md hover:bg-orange-600 transition-all duration-300 text-center w-32">
              <h2 className="text-sm font-semibold">Idosos</h2>
              <p className="text-lg font-bold">{idosos}</p>
            </div>
          </div>
        </div>

        <div className="block md:hidden sm:block flex-1 w-full lg:w-1/2 relative mb-10">
          <img
            src="./public/imagens/dashboard.jpg"
            alt=""
            className="rounded-xl shadow-2xl object-cover w-full lg:w-11/12"
          />
          <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-md flex items-center">
            <span className="text-lg">❤️</span>
            <div className="ml-2">
              <p className="text-sm font-semibold">Senior Care</p>
              <p className="text-xs font-bold text-gray-500">
                Compartilhando Amor
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-6">
          <div className="flex-1 w-full lg:w-1/2">
            <div className="bg-gray-100 p-6 rounded-lg shadow-md h-auto max-h-[370px]">
              <h2 className="text-xl font-semibold mb-4">
                Confira suas próximas atividades
              </h2>
              {ativConfirmada.length > 0 ? (
                <ul>
                  {ativConfirmada.map((atividade, index) => (
                    <li key={index} className="mb-2 text-gray-700">
                      {atividade?.nomeAtividade}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 italic">
                  Você ainda não possui nenhuma atividade confirmada.
                </p>
              )}
            </div>
          </div>
          <div className="hidden md:block sm:hidden flex-1 w-full md:w-1/2 relative mb-20">
              <img
                src="./public/imagens/dashboard.jpg"
                alt=""
                className="rounded-xl shadow-2xl object-cover w-full lg:w-11/12"
              />
              <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-lg flex items-center">
                <span className="text-lg">❤️</span>
                <div className="ml-2">
                  <p className="text-sm font-semibold">Senior Care</p>
                  <p className="text-xs font-bold text-gray-500">
                    Compartilhando Amor
                  </p>
                </div>
              </div>
            </div>
        </div>
      </ContainerItem>
    </div>
  );
};

export default Dashboard;
