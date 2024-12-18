import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as z from "zod";
import AtividadeService from "../../service/atividadeService";
import FormData from "../../utils/interfaces/ComponenteProps";

const errorValidator = (data: string) =>
  toast(`${data}`, {
    position: "top-right",
    autoClose: 1500,
    type: "error",
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
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
    theme: "light",
  });

const FormComponent: React.FC = ({
  podeAgendar,
  usuario,
  usuarioSelecionado,
  idAtividade,
  editar,
  atividade,
  onClose,
  cadastrar,
}) => {
  const {
    salvarAtividade,
    atualizarAtividadePorId,
  } = AtividadeService();
  const [confirmada, setConfirmada] = useState(false);
  const [rejeitada, setRejeitada] = useState(false);
  const [finalizada, setFinalizada] = useState(false);

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
    tipoEncontro: z.enum(["ONLINE", "PRESENCIAL"], {
      message: "Selecione o tipo de encontro",
    }),
    endereco: z.string().optional(),
  });

  const mutationPost = useMutation({
    mutationFn: salvarAtividade,
    onSuccess: () => {
      reset();
      successValidation("Atividade criada com sucesso!");
      fecharModal();
    },
    onError: (error) => {
      errorValidator(error?.response.data);
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      nomeAtividade: atividade?.nomeAtividade,
      descricaoAtividade: atividade?.descricaoAtividade,
      dataEncontro: atividade?.dataEncontro,
      horario: atividade?.horario,
      tipoEncontro: atividade?.tipoEncontro,
      endereco: atividade?.endereço,
    },
  });

  const editarAtividade = async (payload) => {
    try {
      await atualizarAtividadePorId(idAtividade, payload);
      fecharModal();
      successValidation("Atividade editada com sucesso!");

    } catch (error) {
      errorValidator(error?.response.data);
    }
  };

  const handlePost = (data: FormData) => {
    if (!idAtividade) {
      const payload = {
        ...data,
        confirmada,
        rejeitada,
        finalizada,
        usuarioConvidado: { idUsuario: usuarioSelecionado.idUsuario },
        usuarioCriador: { idUsuario: usuario.idUsuario },
      };
      mutationPost.mutate(payload);
    }

    if (atividade) {
      const payloadEditada = {
        ...data,
        id_atividade: atividade?.id_atividade,
        confirmada: atividade?.confirmada,
        rejeitada: atividade?.rejeitada,
        finalizada: atividade?.finalizada,
        usuarioConvidado: { idUsuario: atividade?.usuarioConvidado.idUsuario },
        usuarioCriador: { idUsuario: atividade?.usuarioCriador.idUsuario },
      };
      editarAtividade(payloadEditada);
    }
  };

  const erroStyle = "text-red-600 text-left text-[12px]";

  function fecharModal(): void {
    onClose();
  }

  useEffect(() => {
    if (atividade) {
      reset({
        nomeAtividade: atividade.nomeAtividade || "",
        descricaoAtividade: atividade.descricaoAtividade || "",
        dataEncontro: atividade.dataEncontro || "",
        horario: atividade.horario || "",
        tipoEncontro: atividade.tipoEncontro || "ONLINE",
        endereco: atividade.endereco || "",
      });
    }
  }, [atividade, reset]);
  return (
    <>
      <ToastContainer />
      <form className="w-full h-auto" onSubmit={handleSubmit(handlePost)}>
        <h1 className="text-2xl font-bold mb-4 text-center text-blue-700">
          {idAtividade ? "Editar" : "Criar"} Atividade
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

        <div className="mb-4">
          <label htmlFor="descricaoAtividade">Descrição da Atividade</label>
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

        <div className="mb-4">
          <label htmlFor="dataEncontro">Data do Encontro</label>
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

        <div className="mb-4">
          <label htmlFor="horario">Horário</label>
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

        <div className="mb-4">
          <label htmlFor="tipoEncontro">Tipo de Encontro</label>
          <select
            id="tipoEncontro"
            {...register("tipoEncontro")}
            className="border-2 p-2 rounded w-full border-gray-300"
          >
            <option value="ONLINE">ONLINE</option>
            <option value="PRESENCIAL">Presencial</option>
          </select>
          {errors?.tipoEncontro && (
            <p className={erroStyle}>{errors.tipoEncontro.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="endereco">Endereço (Opcional)</label>
          <input
            type="text"
            id="endereco"
            {...register("endereco")}
            className="border-2 p-2 rounded w-full border-gray-300"
          />
        </div>

        <div className="w-full flex gap-3">
          <p
            onClick={handleSubmit(handlePost)}
            className="p-3 w-full bg-green-400 text-white text-center rounded-md hover:opacity-70 cursor-pointer duration-100"
          >
            {editar ? "Editar" : cadastrar ? "Criar" : ""}
          </p>
          <p
            className="p-3 bg-red-400 text-white w-full text-center rounded-md hover:opacity-70 cursor-pointer duration-100"
            onClick={fecharModal}
          >
            Cancelar
          </p>
        </div>
      </form>
    </>
  );
};

export default FormComponent;
