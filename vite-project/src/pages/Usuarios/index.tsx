import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import ContainerItem from "../../components/container";
import Modal from "../../components/modal";
import FormularioCadastroComponent from "../../components/modal-formulario-cadastro";
import UsuarioService from "../../service/UsuarioService";
import { AuthContext } from "../../utils/context/useContext/useUserContext";

const successValidation = (data: any) =>
  toast(`${data}`, {
    position: "top-right",
    autoClose: 1500,
    type: "success",
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

const Usuarios = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { userData, refreshUserData } = useContext(AuthContext);
  const location = useLocation();
  const { exibirUsuarioPorId, excluirUsuariosPorId } = UsuarioService();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [usuario, setUsuario] = useState<any | null>(null);
  const params = new URLSearchParams(location.search);
  const idParam = params.get("id");
  const id = idParam ? parseInt(idParam, 10) : null;

  const getUsuario = async (id: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await exibirUsuarioPorId(id);
      setUsuario(response.data);
    } catch (error) {
      setError("Erro ao buscar usuário. Tente novamente mais tarde.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteUsuario = async (id: number) => {
    try {
      await excluirUsuariosPorId(id);
      toast.success("Usuário deletado com sucesso!");
    } catch (error) {
      toast.error("Erro ao deletar usuário!");
    }
  };

  useEffect(() => {
    if (id) {
      getUsuario(id);
    } else {
      setUsuario(userData);
      setIsLoading(false);
    }
  }, [location]);

  const fecharModal = (success?: boolean) => {
    setIsModalOpen(false);
    if (success) {
      successValidation("Usuário editado com sucesso");
      refreshUserData();
      getUsuario(userData.idUsuario);
    }
  };

  const openModal = () => setIsModalOpen(true);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Carregando...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  const converterData = (dataAmericana: string) => {
    const data = new Date(dataAmericana);
    return data.toLocaleDateString("pt-BR");
  };

  return (
    <div className="p-4">
      <Modal isOpen={isModalOpen} onClose={fecharModal} size="small">
        <FormularioCadastroComponent
          usuario={usuario}
          salvar={() => fecharModal(true)}
        />
      </Modal>
      <ContainerItem>
        <div>
          <div className="flex flex-wrap justify-between items-center gap-4">
            {usuario?.idUsuario === userData?.idUsuario ? (
              <p className="font-bold text-xl md:text-2xl">Meus Dados Pessoais</p>
            ) : (
              <div>
                <p className="font-bold text-xl md:text-2xl">Informações de:</p>
                <p className="font-normal text-sm">{usuario?.nome}</p>
              </div>
            )}
            {usuario?.idUsuario === userData?.idUsuario && (
              <div className="flex flex-wrap space-x-4 w-full md:w-auto">
                <button
                  className="bg-[#7864ff] text-white px-4 py-1 w-full md:w-auto rounded-md hover:opacity-75"
                  onClick={openModal}
                >
                  Editar
                </button>
              </div>
            )}
          </div>

          <hr className="mt-4 mb-4" />
          <div className="mt-4">
  <p className="text-xs font-semibold mb-2">Informações do Usuário</p>
  <div className="flex flex-wrap gap-10 border border-gray-400 p-2 rounded-md w-full md:w-max sm:w-full">
    <div className="flex flex-col ">
      <p className="text-gray-400 text-xs">Nome</p>
      <p className="text-sm font-medium">{usuario?.nome}</p>
    </div>
    <div className="flex flex-col ">
      <p className="text-gray-400 text-xs">Data Nascimento</p>
      <p className="text-sm font-medium">
        {converterData(usuario?.dataNascimento)}
      </p>
    </div>
    <div className="flex flex-col ">
      <p className="text-gray-400 text-xs">Cidade</p>
      <p className="text-sm font-medium">{usuario?.cidade}</p>
    </div>
    <div className="flex flex-col ">
      <p className="text-gray-400 text-xs">Estado</p>
      <p className="text-sm font-medium">{usuario?.estado}</p>
    </div>
    <div className="flex flex-col ">
      <p className="text-gray-400 text-xs">
        {usuario?.tipo === "VOLUNTARIO" ? "Profissão" : "Necessidades"}
      </p>
      {usuario?.tipo === "VOLUNTARIO" ? (
        <p className="text-sm font-medium">{usuario?.profissao}</p>
      ) : (
        <p className="text-sm font-medium">
          {usuario?.necessidades?.join(", ")}
        </p>
      )}
    </div>
  </div>
</div>

        </div>
      </ContainerItem>
    </div>
  );
};

export default Usuarios;
