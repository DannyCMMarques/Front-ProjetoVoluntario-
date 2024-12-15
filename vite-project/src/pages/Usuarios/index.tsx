import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import UsuarioService from "../../service/UsuarioService";

const Usuarios = () => {
  const { excluirUsuariosPorId } = UsuarioService();
  const queryClient = useQueryClient();

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

  const mutation = useMutation({
    mutationFn: async ({ id }: { id: number }) => {
      if (!id) {
        throw new Error("ID não fornecido para exclusão.");
      }
      return await excluirUsuariosPorId({ id });
    },
    onSuccess: () => {
      successValidation("Usuário deletado com sucesso!");
    },
    onError: (error: any) => {
      errorValidator(error.message || "Ops, houve um erro ao deletar o usuário!");
    },
  });

  const handleDelete = (id: number) => {
    mutation.mutate({ id });
  };

  return (
    <div>
      <button onClick={() => handleDelete(1)}>Deletar Usuário com ID 1</button>
    </div>
  );
};

export default Usuarios;
