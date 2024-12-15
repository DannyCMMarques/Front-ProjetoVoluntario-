import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CardPessoaComponent from "../../components/card-pessoa";
import ContainerBaseComponent from "../../components/container";
import FormComponent from "../../components/formulario-atividade";
import Modal from "../../components/modal";
import UsuarioService from "../../service/UsuarioService";
import { AuthContext } from "../../utils/context/useContext/useUserContext";

const ListarUsuariosPage = () => {
  const { userData } = useContext(AuthContext);
  const { filtrarUsuariosTipo } = UsuarioService();
  const [voluntarios, setVoluntarios] = useState([]);
  const [tipo, setTipo] = useState("");
  const [usuarioSelecionado, setUsuarioSelecionado] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();

  const getTipoFromUrl = () => {
    const path = location.pathname;
    const parts = path.split("/");
    return parts[1] || "";
  };

  const getVoluntarios = async () => {
    const tipoUser = getTipoFromUrl();
    setTipo(tipoUser);
    try {
      const response = await filtrarUsuariosTipo(tipoUser.toUpperCase());
      setVoluntarios(response.data.content);
    } catch (error) {
      console.error("Erro ao buscar voluntários:", error);
    }
  };

  useEffect(() => {
    getVoluntarios();
  }, [location.pathname]);

  const podeAgendar = userData?.tipo?.toUpperCase() !== tipo.toUpperCase();

  const abrirModal = (idUsuarioSelecionado: any) => {
    setIsModalOpen(true);
    setUsuarioSelecionado(idUsuarioSelecionado);
  };

  const fecharModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Modal isOpen={isModalOpen} onClose={fecharModal} size="small">
        <FormComponent
          usuario={userData}
          usuarioSelecionado={usuarioSelecionado}
        />
      </Modal>
      <ContainerBaseComponent>
        <div>
          <p className="font-bold text-2xl">Lista de Voluntários</p>
          <div className="flex gap-3 flex-wrap mt-4">
            {voluntarios.map((item) => (
              <CardPessoaComponent
                key={item.idUsuario}
                name={item.nome}
                dataNacimento={item.dataNascimento}
                cidade={item.cidade}
                estado={item.estado}
                abrirModalAgendamento={() => abrirModal(item)}
                sexo="feminino"
                idoso={tipo === "voluntario" ? false : true}
                abrirModalUsuario={abrirModal}
                necessidades={[]}
                podeAgendar={podeAgendar}
                profile={item.foto}
              />
            ))}
          </div>
        </div>
      </ContainerBaseComponent>
    </div>
  );
};

export default ListarUsuariosPage;
