import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaHandHoldingHeart } from "react-icons/fa";
import { FaPersonCane } from "react-icons/fa6";
import { MdKeyboardBackspace } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as z from "zod";
import ContainerItem from "../../components/container";
import useUsuarioService from "../../service/useUsuarioService";
import { habilidadeVoluntarioMock } from "../../utils/mocks/Cadastro/HabilidadesMock";
import { necessidadesIdosoMock } from "../../utils/mocks/Cadastro/Necessidades";
const errorValidator = (data: any) =>
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
const CadastroUsuario: React.FC = () => {
  const [tipo, setTipo] = useState<"IDOSO" | "VOLUNTARIO" | null>(null);
  console.log(tipo);
  const { cadastrarUsuario } = useUsuarioService();
  const validationSchemaLogin = z
    .object({
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
      CPF: z
        .string()
        .min(11, { message: "CPF deve ter pelo menos 11 caracteres" }),
      tipo: z.string().optional(),
      necessidade: z.array(z.string()),
      habilidades: z.string().optional(),
    })
    .superRefine((data, ctx) => {
      if (tipo === "VOLUNTARIO") {
        if (!data.habilidades || data.habilidades.trim() === "") {
          ctx.addIssue({
            code: "custom",
            path: ["habilidades"],
            message: "Habilidades são obrigatórias para voluntários",
          });
        }
        if (!data.profissao || data.profissao.trim() === "") {
          ctx.addIssue({
            code: "custom",
            path: ["profissao"],
            message: "Profissão são obrigatórias para voluntários",
          });
        }
      }
      if (tipo === "IDOSO") {
        if (!data.necessidade || data.necessidade.length === 0) {
          ctx.addIssue({
            code: "custom",
            path: ["necessidade"],
            message: "As necessidades são obrigatórias para idosos",
          });
        }
      }
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
      CPF: "",
      tipo:"VOLUNTARIO",
      necessidade: [],
      habilidades: "",
    },
  });
  const mutation = useMutation({
    mutationFn: cadastrarUsuario,
    onSuccess: () => {
      reset();
      successValidation("Usuario cadastrado com sucesso!");
    },
    onError: () => {
      errorValidator("Ops, Houve um erro!");
    },
  });

  const onSubmit = (data: any) => {
    console.log("entrei aqui ");
    console.log(555555555555555,tipo);
    console.log(data);
    if (!tipo) {
      errorValidator("Selecione o tipo de cadastro.");
      return;
    }
    const payload = {
      nome: data.nome,
      email: data.email,
      senha: data.senha,
      dataNascimento: data.dataNascimento,
      cidade: data.cidade,
      estado: data.estado,
      profissao: data.profissao,
      CPF: data.CPF,
      tipo: "VOLUNTARIO",
      necessidade: data.necessidade,
      habilidades: data.habilidades,
    };
    console.log(payload);

    mutation.mutate(payload);
  };

  const onError = (errors: any) => {
    console.error("Erros no formulário:", errors);
  };

  const handleVoltar = () => {
    window.location.href = "/login";
  };

  const erroStyle = "text-red-600 text-left  text-[12px]";
  const imagem =
    tipo == null
      ? "./../../../public/imagens/cadastro-selecione.jpg"
      : tipo === "IDOSO"
      ? "./../../../public/imagens/cadastro-idoso.jpg"
      : "./../../../public/imagens/cadastro-voluntario.jpg";

  return (
    <div className="h-screen">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ContainerItem>
        <div className="bg-white rounded-lg w-full h-full contents md:flex sm:contents justify-center md:grid md:grid-cols-2  sm:flex sm:justify-center">
          <div className="w-full h-full flex justify-center">
            {!tipo && (
              <div className="w-4/6 h-full flex justify-center items-center ">
                <div className="flex flex-col w-full items-center gap-4">
                  <p className="font-semibold text-lg m-0">Vamos lá :)</p>
                  <p className="font-normal mt-[-15px] text-sm">
                    Selecione abaixo o tipo de cadastro
                  </p>
                  <div className="flex gap-2 w-full">
                    <div className="w-full">
                      <p
                        className="bg-blue-500 w-full flex justify-center items-center gap-2 text-white py-2 px-4 rounded hover:bg-blue-600 duration-150 hover:cursor-pointer"
                        onClick={() => setTipo("IDOSO")}
                      >
                        <FaPersonCane /> Idoso
                      </p>
                    </div>
                    <div className="w-full">
                      <p
                        className="bg-red-400 w-full flex justify-center items-center gap-2 text-white py-2 px-4 rounded hover:bg-red-600 duration-150 hover:cursor-pointer"
                        onClick={() => setTipo("VOLUNTARIO")}
                      >
                        <FaHandHoldingHeart /> Voluntário
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {tipo && (
              <form
                className="w-4/6 h-full flex justify-center items-center "
                onSubmit={handleSubmit(onSubmit, onError)}
              >
                <div>
                  <div className="items-center text-[40px] mb-2 mt-10">
                    <p
                      type="button"
                      className="text-black mt-10 md: mt-20 sm:mt-10 flex gap-2 items-center text-[14px] mt-2 cursor-pointer hover:underline duration-300"
                      onClick={() => handleVoltar()}
                    >
                      <MdKeyboardBackspace
                        size={20}
                        className="text-blue-500 text-[16px]"
                      />
                      Voltar
                    </p>
                    <p className="font-semibold text-blue-700 text-start ">
                      Cadastra-se
                    </p>
                  </div>
                  <div>
                    <div>
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
                      />
                      {errors?.nome && (
                        <p className={erroStyle}> {errors.nome.message}</p>
                      )}
                    </div>
                    <div className="flex gap-5">
                      <div className="w-full">
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
                        />
                        {errors?.cidade && (
                          <p className={erroStyle}> {errors.cidade.message}</p>
                        )}
                      </div>
                      <div className="w-full">
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
                        />
                        {errors?.estado && (
                          <p className={erroStyle}> {errors.estado.message}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-5">
                      <div className="w-full">
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
                          type="text"
                          placeholder="Insira sua data de Nascimento"
                          {...register("dataNascimento")}
                          id="dataNascimento"
                          className={`${
                            errors.dataNascimento
                              ? "input-error"
                              : "border-gray-300"
                          } border-2 p-2 rounded w-full`}
                        />
                        {errors?.dataNascimento && (
                          <p className={erroStyle}>
                            {" "}
                            {errors.dataNascimento.message}
                          </p>
                        )}
                      </div>
                      <div className="w-full">
                        <label
                          className={`${
                            errors.nome
                              ? "border-red-500 text-red-500"
                              : "border-gray-300"
                          }`}
                          htmlFor="CPF"
                        >
                          CPF:
                        </label>
                        <input
                          type="text"
                          placeholder="Insira seu endereço"
                          {...register("CPF")}
                          id="CPF"
                          className={`${
                            errors.CPF ? "input-error" : "border-gray-300"
                          } border-2 p-2 rounded w-full`}
                        />
                        {errors?.CPF && (
                          <p className={erroStyle}> {errors.CPF.message}</p>
                        )}
                      </div>
                    </div>

                    {tipo === "VOLUNTARIO" ? (
                      <div className="flex gap-5">
                        <div className="w-full">
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
                          />
                          {errors?.profissao && (
                            <p className={erroStyle}>
                              {" "}
                              {errors.profissao.message}
                            </p>
                          )}
                        </div>
                        <div className="w-full">
                          <label
                            className={`${
                              errors.profissao
                                ? "border-red-500 text-red-500"
                                : "border-gray-300"
                            }`}
                            htmlFor="habilidades"
                          >
                            Habilidades:
                          </label>
                          <select
                            className={`${
                              errors.habilidades
                                ? "input-error"
                                : "border-gray-300"
                            } border-2 p-2 rounded w-full`}
                            {...register("habilidades")}
                            id="habilidades"
                          >
                            <option value="" disabled>
                              Selecionar
                            </option>
                            {habilidadeVoluntarioMock.map((item) => (
                              <option key={item.id} value={item.categoria}>
                                {item.categoria}
                              </option>
                            ))}
                          </select>
                          {errors?.habilidades && (
                            <p className={erroStyle}>
                              {errors.habilidades.message}
                            </p>
                          )}
                        </div>
                      </div>
                    ) : (
                      <>
                        <label
                          className={`${
                            errors.necessidade
                              ? "border-red-500 text-red-500"
                              : "border-gray-300"
                          }`}
                        >
                          {" "}
                          Necessidades:
                        </label>
                        <div
                          className={`${
                            errors.necessidade
                              ? "input-error"
                              : "border-[ #d8d8d8 ] "
                          } border-2 p-2 rounded w-full flex justify-around gap-1 `}
                        >
                          {necessidadesIdosoMock.map((item) => (
                            <div key={item.id}>
                              <label
                                className={`${
                                  errors.necessidade
                                    ? "border-red-500 text-red-500"
                                    : "border-gray-300"
                                }`}
                              >
                                {item.categoria}
                              </label>
                              <input
                                className="border-gray-300
                                 border-2 p-2 rounded w-full"
                                value={item.categoria}
                                title={item.categoria}
                                type="checkbox"
                                {...register("necessidade")}
                              />
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                    <div>
                      <label
                        className={`${
                          errors.nome
                            ? "border-red-500 text-red-500"
                            : "border-gray-300"
                        }`}
                        htmlFor="E-mail"
                      >
                        E-mail:
                      </label>
                      <input
                        type="email"
                        placeholder="Insira seu e-mail"
                        {...register("email")}
                        id="email"
                        className={`${
                          errors.email ? "input-error" : "border-gray-300"
                        } border-2 p-2 rounded w-full`}
                      />
                      {errors?.email && (
                        <p className={erroStyle}> {errors.email.message}</p>
                      )}
                    </div>
                    <div>
                      <label
                        className={`${
                          errors.nome
                            ? "border-red-500 text-red-500"
                            : "border-gray-300"
                        }`}
                        htmlFor="Senha"
                      >
                        Senha:
                      </label>
                      <input
                        type="password"
                        placeholder="Insira sua senha"
                        {...register("senha")}
                        id="senha"
                        className={`${
                          errors.senha ? "input-error" : "border-gray-300"
                        } border-2 p-2 rounded w-full`}
                      />
                      {errors?.senha && (
                        <p className={erroStyle}> {errors.senha.message}</p>
                      )}
                    </div>
                  </div>
                  <div>
                    <button
                      className="bg-buttonBlue p-2 w-full mt-4 text-white text-center rounded-md hover:opacity-80 duration-150 mb-4"
                      type="submit"
                    >
                      Cadastrar
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
          <div className="flex justify-center items-center">
            <div
              className="w-[90%] h-[96%]"
              style={{
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundImage: `url(${imagem})`,
              }}
            ></div>
          </div>
        </div>
      </ContainerItem>
    </div>
  );
};

export default CadastroUsuario;
