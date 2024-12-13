import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as z from "zod";

const errorValidator = (data) =>
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

const successValidation = (data) =>
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

const FormComponent = () => {
   const [confirmada,setConfirmada]=useState(false)
   const [rejeitada,setRejeitada]=useState(false)
   const [finalizada,setFinalizada]=useState(false)
  const validationSchema = z.object({
    nomeAtividade: z
      .string()
      .min(3, { message: "O nome da atividade é obrigatório" }),
    descricaoAtividade: z
      .string()
      .min(10, { message: "A descrição deve ter pelo menos 10 caracteres" }),
    dataEncontro: z
      .string()
      .nonempty({ message: "A data do encontro é obrigatória" }),
    horario: z.string().nonempty({ message: "O horário é obrigatório" }),
    tipoEncontro: z.enum(["VIRTUAL", "PRESENCIAL"], {
      message: "Selecione o tipo de encontro",
    }),
    endereco: z.string().optional(),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      nomeAtividade: "",
      descricaoAtividade: "",
      dataEncontro: "",
      horario: "",
      tipoEncontro: "VIRTUAL",
      endereco: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data) => {
      console.log("Payload enviado:", data);
      return Promise.resolve();
    },
    onSuccess: () => {
      reset();
      successValidation("Atividade criada com sucesso!");
    },
    onError: () => {
      errorValidator("Erro ao criar atividade!");
    },
  });

  const onSubmit = (data) => {
  const payload={
  "rejeitada":rejeitada,
  "confirmada":confirmada,
  "finalizada":finalizada,
    }
    mutation.mutate(data);
  };

  const erroStyle = "text-red-600 text-left text-[12px]";

  return (
    <>
      <ToastContainer />
      <form className=" w-full h-auto" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-2xl font-bold mb-4 text-center text-blue-700">
          Criar Atividade
        </h1>
        <div className="mb-4">
          <label
            htmlFor="nomeAtividade"
            className={`${
              errors.nomeAtividade
                ? "border-red-500 text-red-500"
                : "border-gray-300"
            }`}
          >
            Nome da Atividade
          </label>
          <input
            type="text"
            id="nomeAtividade"
            {...register("nomeAtividade")}
            className={`border-2 p-2 rounded w-full ${
              errors.nomeAtividade ? "input-error" : "border-gray-300"
            }`}
          />
          {errors?.nomeAtividade && (
            <p className={erroStyle}>{errors.nomeAtividade.message}</p>
          )}
        </div>

        <div className="grid  gap-2 grid-cols-2 mb-4">
          <div>
            <label
              htmlFor="dataEncontro"
              className={`${
                errors.dataEncontro
                  ? "border-red-500 text-red-500"
                  : "border-gray-300"
              }`}
            >
              Data do Encontro
            </label>
            <input
              type="date"
              id="dataEncontro"
              {...register("dataEncontro")}
              className={`border-2 p-2 rounded w-full ${
                errors.dataEncontro ? "input-error" : "border-gray-300"
              }`}
            />
            {errors?.dataEncontro && (
              <p className={erroStyle}>{errors.dataEncontro.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="horario"
              className={`${
                errors.horario
                  ? "border-red-500 text-red-500"
                  : "border-gray-300"
              }`}
            >
              Horário
            </label>
            <input
              type="time"
              id="horario"
              {...register("horario")}
              className={`border-2 p-2 rounded w-full ${
                errors.horario ? "input-error" : "border-gray-300"
              }`}
            />
            {errors?.horario && (
              <p className={erroStyle}>{errors.horario.message}</p>
            )}
          </div>
        </div>
        <div className="mb-4 grid  gap-2 grid-cols-2">
          <div>
            <label
              htmlFor="tipoEncontro"
              className={`${
                errors.tipoEncontro
                  ? "border-red-500 text-red-500"
                  : "border-gray-300"
              }`}
            >
              Tipo de Encontro
            </label>
            <select
              id="tipoEncontro"
              {...register("tipoEncontro")}
              className={`border-2 p-2 rounded w-full ${
                errors.tipoEncontro ? "input-error" : "border-gray-300"
              }`}
            >
              <option value="VIRTUAL">Virtual</option>
              <option value="PRESENCIAL">Presencial</option>
            </select>
            {errors?.tipoEncontro && (
              <p className={erroStyle}>{errors.tipoEncontro.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="endereco"
              className={`${
                errors.endereco
                  ? "border-red-500 text-red-500"
                  : "border-gray-300"
              }`}
            >
              Endereço (opcional)
            </label>
            <input
              type="text"
              id="endereco"
              {...register("endereco")}
              className={`border-2 p-2 rounded w-full ${
                errors.endereco ? "input-error" : "border-gray-300"
              }`}
            />
          </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="descricaoAtividade"
            className={`${
              errors.descricaoAtividade
                ? "border-red-500 text-red-500"
                : "border-gray-300"
            }`}
          >
            Descrição da Atividade
          </label>
          <textarea
            id="descricaoAtividade"
            {...register("descricaoAtividade")}
            className={`border-2 p-2 rounded w-full ${
              errors.descricaoAtividade ? "input-error" : "border-gray-300"
            }`}
          />
          {errors?.descricaoAtividade && (
            <p className={erroStyle}>{errors.descricaoAtividade.message}</p>
          )}
        </div>
        <button
          className="bg-buttonBlue p-2 w-full mt-4 text-white rounded-md hover:opacity-80"
          type="submit"
        >
          Registrar Atividade
        </button>
      </form>
    </>
  );
};

export default FormComponent;
