import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";
import ContainerItem from "../../components/container";
import UsuarioService from "../../service/UsuarioService";
import { AuthContext } from "../../utils/context/useContext/useUserContext";
import { habilidadeVoluntarioMock } from "../../utils/mocks/Cadastro/HabilidadesMock";

const errorValidator = (data: string) =>
  toast(`${data}`, {
    position: "top-right",
    autoClose: 1500,
    type: "error",
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

const successValidation = (data: string) =>
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
  const { userData } = useContext(AuthContext);
  const location = useLocation();
  const { exibirUsuarioPorId, excluirUsuariosPorId, atualizarUsuarioPorId } =
    UsuarioService();
  const [isEditing, setIsEditing] = useState(false);
  const [usuario, setUsuario] = useState(userData);
 const params = new URLSearchParams(location.search);
    console.log("params" + params);
    const idParam = params.get("id");
    console.log("idParam" + idParam);
    const id = parseInt(idParam, 10)
  const validationSchemaLogin = z.object({
    nome: z.string().min(3, { message: "Nome obrigatório " }),
    email: z.string().email({ message: "E-mail é obrigatório " }),
    senha: z
      .string()
      .min(6, { message: "A senha precisa ter no mínimo 6 dígitos" }),
    dataNascimento: z
      .string()
      .nonempty({ message: "Data de nascimento é obrigatória" }),
    cidade: z.string().min(3, { message: "Cidade é obrigatória" }),
    estado: z.string().nonempty({ message: "Estado é obrigatório" }),
    profissao: z.string().optional(),
    cpf: z
      .string()
      .min(11, { message: "cpf deve ter pelo menos 11 caracteres" }),
    tipo: z.string().optional(),
    necessidade: z.any(),
    habilidade: z.string().optional(),
    foto: z.string(),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(validationSchemaLogin),
    defaultValues: {
      nome: "",
      email: "",
      senha: "",
      dataNascimento: "",
      cidade: "",
      estado: "",
      profissao: "",
      cpf: "",
      tipo: "",
      necessidade: "",
      habilidade: "",
      foto: "",
    },
  });
  const getUsuario = async (id: number) => {
    try {
      const response = await exibirUsuarioPorId(id);
      setUsuario(response.data);
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
    }
  };

  const deleteUsuario = async (id: number) => {
    try {
      await excluirUsuariosPorId(id);
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
    }
  };

  const editarUsuario = async (id: number, payload) => {
    try {
      await atualizarUsuarioPorId(id, payload);
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
    }
  };
  const handleDelete = () => {
    deleteUsuario(usuario.idUsuario);
  };
  const handleEditar = (payload) => {
    setIsEditing(true);
    editarUsuario(usuario.idUsuario, payload);
  };

  useEffect(() => {

    if (id) {
      getUsuario(id);
    } else {
      setUsuario(userData);
    }

  }, [location]);


  const tituloPagina =
    usuario == userData
      ? "Meus Dados Pessoais"
      : "Conheça mais sobre " + " " + usuario?.nome;
  const erroStyle = "text-red-600 text-left  text-[12px]";
 console.log(43444, isEditing)
  return (
    <div>
      <ContainerItem>
        <div>
          <div>
            <p className="font-bold text-2xl text-center">{tituloPagina}</p>
          </div>
          <div className="flex justify-center item center">
            <form
              className=" block md:flex gap-3 md:flex-wrap flex center sm:block mt-4 p-auto"
              onSubmit={handleSubmit(handleEditar)}
            >
              <div className=" w-full sm:w-full md:w-1/3">
                <label
                  className={`${
                    errors.nome
                      ? "border-red-500 text-red-500"
                      : "border-gray-300"
                  }`}
                  htmlFor="Nome"
                >
                  Nome Completo:
                </label>
                <input
                  type="text"
                  placeholder="Insira seu nome completo"
                  {...register("nome")}
                  id="nome"
                  className={`${
                    errors.nome ? "input-error" : "border-gray-300"
                  } border-2 p-2 rounded w-full`}
                  value={usuario?.nome}
                  readOnly={!isEditing}
                />
                {errors?.nome && (
                  <p className={erroStyle}> {errors.nome.message}</p>
                )}
              </div>
              <div className="w-full sm:w-full md:w-1/3">
                <label
                  className={`${
                    errors.cidade
                      ? "border-red-500 text-red-500"
                      : "border-gray-300"
                  }`}
                  htmlFor="cidade"
                >
                  Cidade:
                </label>
                <input
                  type="text"
                  placeholder="Insira sua cidade"
                  {...register("cidade")}
                  id="cidade"
                  className={`${
                    errors.cidade ? "input-error" : "border-gray-300"
                  } border-2 p-2 rounded w-full`}
                  value={usuario?.cidade}
                  readOnly={!isEditing}
                />
                {errors?.cidade && (
                  <p className={erroStyle}> {errors.cidade.message}</p>
                )}
              </div>
              {/* Estado */}
              <div className="w-full sm:w-full md:w-1/3">
                <label
                  className={`${
                    errors.nome
                      ? "border-red-500 text-red-500"
                      : "border-gray-300"
                  }`}
                  htmlFor="endereço"
                >
                  Estado:
                </label>
                <input
                  type="text"
                  placeholder="Insira seu estado"
                  {...register("estado")}
                  id="estado"
                  className={`${
                    errors.estado ? "input-error" : "border-gray-300"
                  } border-2 p-2 rounded w-full`}
                  value={usuario?.estado}
                  readOnly={!isEditing}
                />
                {errors?.estado && (
                  <p className={erroStyle}> {errors.estado.message}</p>
                )}
              </div>
              <div className="w-full sm:w-full md:w-1/3">
                <label
                  className={`${
                    errors.nome
                      ? "border-red-500 text-red-500"
                      : "border-gray-300"
                  }`}
                  htmlFor="Data de Nascimento"
                >
                  Data de Nascimento:
                </label>
                <input
                  type="date"
                  placeholder="Insira sua data de Nascimento"
                  {...register("dataNascimento")}
                  id="dataNascimento"
                  value={usuario?.dataNascimento}
                  readOnly={!isEditing}
                  className={`${
                    errors.dataNascimento ? "input-error" : "border-gray-300"
                  } border-2 p-2 rounded w-full`}
                />
                {errors?.dataNascimento && (
                  <p className={erroStyle}> {errors.dataNascimento.message}</p>
                )}
              </div>
              {usuario?.tipo === "VOLUNTARIO" ? (
                <>
                  <div className="w-full sm:w-full md:w-1/3">
                    <label
                      className={`${
                        errors.nome
                          ? "border-red-500 text-red-500"
                          : "border-gray-300"
                      }`}
                      htmlFor="profissão"
                    >
                      Profissão:
                    </label>
                    <input
                      type="text"
                      placeholder="Insira sua profissão"
                      {...register("profissao")}
                      id="profissao"
                      className={`${
                        errors.nome ? "input-error" : "border-gray-300"
                      } border-2 p-2 rounded w-full`}
                      value={usuario?.profissao}
                      readOnly={!isEditing}
                    />
                    {errors?.profissao && (
                      <p className={erroStyle}> {errors.profissao.message}</p>
                    )}
                  </div>
                  <div className="w-full sm:w-full md:w-1/3">
                    <label
                      className={`${
                        errors.profissao
                          ? "border-red-500 text-red-500"
                          : "border-gray-300"
                      }`}
                      htmlFor="habilidade"
                    >
                      Habilidades:
                    </label>

                    {!isEditing && (
                      <input
                        type="text"
                        placeholder="Insira sua profissão"
                        {...register("habilidade")}
                        id="habilidade"
                        className={`${
                          errors.nome ? "input-error" : "border-gray-300"
                        } border-2 p-2 rounded w-full`}
                        value={usuario?.habilidade}
                        readOnly={!isEditing}
                      />
                    )}

                    {isEditing && (
                      <select
                        className={`${
                          errors.habilidade ? "input-error" : "border-gray-300"
                        } border-2 p-2 rounded w-full`}
                        {...register("habilidade")}
                        id="habilidade"
                      >
                        <option
                          value={usuario?.habilidade}
                          disabled
                          readOnly={!isEditing}
                        >
                          Selecionar
                        </option>
                        {habilidadeVoluntarioMock.map((item) => (
                          <option key={item.id} value={item.categoria}>
                            {item.categoria}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                </>
              ) : (
                <div className="w-full sm:w-full md:w-1/3">
                  <label className={"border-gray-300"} htmlFor="profissão">
                    Necessidades:
                  </label>

                  {
                    !isEditing && (
                        <input
                      type="text"
                      placeholder="Insira sua profissão"
                      className="border-gray-300 border-2 p-2 rounded w-full"
                      readOnly={!isEditing}
                    />
                    )
                  }
                </div>
              )}
            </form>
          </div>

          {usuario == userData && (
            <div className="flex justify-end space-x-4 mt-6">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md = hover:bg-blue-600 transition"
                type="submit"
                onClick={()=>handleEditar}
              >
                Editar
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition "
                onClick={() => handleDelete}
              >
                Excluir
              </button>
            </div>
          )}
        </div>
      </ContainerItem>
    </div>
  );
};

export default Usuarios;
