import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as z from "zod";
import useUsuarioService from "../../service/UsuarioService";
import { habilidadeVoluntarioMock } from "../../utils/mocks/Cadastro/HabilidadesMock";

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

const FormularioCadastroComponent: React.FC<{ usuario: any }> = ({ usuario, salvar }) => {
  const [tipo, setTipo] = useState<"IDOSO" | "VOLUNTARIO" | null>(
    usuario?.tipo === "VOLUNTARIO" ? "VOLUNTARIO" : "IDOSO"
  );

  const { atualizarUsuarioPorId } = useUsuarioService();
  const validationSchemaLogin = z.object({
    nome: z.string().min(3, { message: "Nome obrigatório " }),
    email: z.string().email({ message: "E-mail é obrigatório " }),
    senha: z.string().min(6, { message: "A senha precisa ter no mínimo 6 dígitos" }),
    dataNascimento: z.string().nonempty({ message: "Data de nascimento é obrigatória" }),
    cidade: z.string().min(3, { message: "Cidade é obrigatória" }),
    estado: z.string().nonempty({ message: "Estado é obrigatório" }),
    profissao: z.string().optional(),
    cpf: z.string().min(11, { message: "CPF deve ter pelo menos 11 caracteres" }),
    tipo: z.string().optional(),
    necessidade: z.any(),
    habilidade: z.string().optional(),
    foto: z.string().optional(),
  });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(validationSchemaLogin),
    defaultValues: usuario,
  });

  useEffect(() => {
    if (usuario) {
      for (const key in usuario) {
        setValue(key as keyof typeof usuario, usuario[key]);
      }
    }
  }, [usuario, setValue]);



  const atualizarUsuario  = async (id: number, data) => {
    try {
      const response = await atualizarUsuarioPorId(id, data);
      if(response)
        salvar()
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
    }
  };

  const onSubmit = (data: any) => {
    if (!tipo) {
      errorValidator("Selecione o tipo de cadastro.");
      return;
    }
    const payload = { ...data, tipo };
    atualizarUsuario(usuario.idUsuario, payload);
  };

  const erroStyle = "text-red-600 text-left text-[12px]";

  return (
    <div className="w-full">
      <ToastContainer theme="light" />
      <p className="text-[20px] font-bold text-center text-blue-500">Editar usuario</p>
      <div className="w-full  flex justify-center">
        <form
          className="w-full  flex flex-col justify-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <label>Nome:</label>
            <input {...register("nome")} className="border p-2 rounded w-full" />
            {errors.nome && <p className={erroStyle}>{errors.nome.message}</p>}
          </div>

          <div>
            <label>Email:</label>
            <input {...register("email")} className="border p-2 rounded w-full" />
            {errors.email && <p className={erroStyle}>{errors.email.message}</p>}
          </div>

          <div>
            <label>Data de Nascimento:</label>
            <input type="date" {...register("dataNascimento")} className="border p-2 rounded w-full" />
          </div>

          <div>
            <label>Cidade:</label>
            <input {...register("cidade")} className="border p-2 rounded w-full" />
          </div>

          <div>
            <label>CPF:</label>
            <input {...register("cpf")} className="border p-2 rounded w-full" />
          </div>

          {tipo === "VOLUNTARIO" && (
            <>
              <label>Profissão:</label>
              <input {...register("profissao")} className="border p-2 rounded w-full" />
              <label>Habilidades:</label>
              <select {...register("habilidade")} className="border p-2 rounded w-full">
                <option value="">Selecione</option>
                {habilidadeVoluntarioMock.map((item) => (
                  <option key={item.id} value={item.categoria}>
                    {item.categoria}
                  </option>
                ))}
              </select>
            </>
          )}

          <button type="submit" className="bg-blue-500 text-white p-3  rounded-md mt-4">
            Editar
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormularioCadastroComponent;
