import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CardPessoaComponent from "../../components/card-pessoa";
import ContainerBaseComponent from "../../components/container";
import FormComponent from "../../components/formulario-atividade";
import LoadingComponent from "../../components/loading";
import Modal from "../../components/modal";
import Paginacao from "../../components/paginacao";
import UsuarioService from "../../service/UsuarioService";
import { AuthContext } from "../../utils/context/useContext/useUserContext";

const ListarUsuariosPage = () => {
  const { userData } = useContext(AuthContext);
  const { filtrarUsuariosTipo } = UsuarioService();
  const [voluntarios, setVoluntarios] = useState([]);
  const [tipo, setTipo] = useState("");
  const [usuarioSelecionado, setUsuarioSelecionado] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [infoPaginacao, setInfoPaginacao] = useState({
    currentPage: 1,
    totalItems: 0,
    itemsPerPage: 10,
  });
  const location = useLocation();

  const getTipoFromUrl = () => {
    const path = location.pathname;
    const parts = path.split("/");
    return parts[1] || "";
  };

  const getVoluntarios = async (page = 0) => {
    const tipoUser = getTipoFromUrl();
    setTipo(tipoUser);
    try {

      const response = await filtrarUsuariosTipo(tipoUser.toUpperCase(), page, 10);
           setVoluntarios(response.data.content);
           setInfoPaginacao({
             currentPage: response.data.pageable.pageNumber + 1,
             totalItems: response.data.totalElements,
             itemsPerPage: response.data.pageable.pageSize,
           });
              setIsLoading(false);

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
  const titulo =
    tipo === "voluntario" ? (
      <p className="font-bold text-2xl items-center flex gap-3">
        Conheça os nossos voluntários{" "}
        <span class="material-symbols-outlined">diversity_1</span>{" "}
      </p>
    ) : (
      <p className="font-bold text-2xl items-center flex gap-3">
        Conheça os nossos idosos{" "}
        <span class="material-symbols-outlined">elderly</span>{" "}
      </p>
    );
  return (
    <div>
      {isLoading ? (
        <LoadingComponent />
      ) : (
        <div className="">
          <Modal isOpen={isModalOpen} onClose={fecharModal} size="small">
            <FormComponent
              usuario={userData}
              usuarioSelecionado={usuarioSelecionado}
              cadastrar={true}
              onClose={fecharModal}
            />
          </Modal>
          <ContainerBaseComponent>
            <div>
              <p className="font-bold text-2xl">{titulo}</p>
              <hr className="mt-4 mb-4"></hr>
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
                    idUsuario={item.idUsuario}
                  />
                ))}
              </div>
            </div>
            <Paginacao
  currentPage={infoPaginacao.currentPage}
  totalItems={infoPaginacao.totalItems}
  itemsPerPage={infoPaginacao.itemsPerPage}
  onPageChange={(page) => getVoluntarios(page - 1)}
/>
          </ContainerBaseComponent>
        </div>
      )}
    </div>
  );
};

export default ListarUsuariosPage;
