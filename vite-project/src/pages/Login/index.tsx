import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as z from "zod";
import LoadingComponent from "../../components/loading";
import AuthService from "./../../service/authService";

const errorValidator = (data: string) =>
  toast.error(`${data}`, {
    position: "top-right",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  });

const successValidation = (data: string) =>
  toast.success(`${data}`, {
    position: "top-right",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  });

const Login = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { login } = AuthService();

  const validationSchemaLogin = z.object({
    email: z.string().email({ message: "E-mail é obrigatório" }),
    senha: z
      .string()
      .min(6, { message: "A senha precisa ter no mínimo 6 dígitos" }),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(validationSchemaLogin),
    defaultValues: {
      email: "",
      senha: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data) => {
      const response = await login(data);
      if (response) {
        localStorage.setItem("access_token", response.data);
      }

      setTimeout(() => {
        setIsLoading(false)
        window.location.href = "/inicio";
      }, 1000)
    },
    onSuccess: () => {
      reset();
      successValidation("Usuário cadastrado com sucesso!");
    },
    onError: (error) => {
      setIsLoading(false)
      errorValidator(error.message);
    },
  });

  const onSubmit = (data: { email: string; senha: string }) => {
    const payload = {
      email: data.email,
      senha: data.senha,
    };
    setIsLoading(true)
    mutation.mutate(payload);
  };

  const erroStyle = "text-red-600 text-left text-[12px]";

  const handleCadastro = () => {
    window.location.href = "/cadastro";
  };

  return (
    <div className="h-screen">
      {isLoading && (
        <LoadingComponent />
      )}

      <ToastContainer />
        <div className="bg-white rounded-lg w-full h-full md:flex justify-center">
          <div className="w-full h-full flex justify-center items-center">
            <div className="w-4/6">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <h2 className="text-[40px] mb-2 mt-4 font-semibold text-blue-700">
                    Fazer login
                  </h2>
                  <p className="text-sm text-[#AFB8D6]">
                    Digite seu usuário e senha para entrar!
                  </p>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className={`${
                      errors.email ? "text-red-500" : "text-[#666]"
                    }`}
                  >
                    Email:
                  </label>
                  <input
                    type="email"
                    placeholder="Insira seu Email"
                    {...register("email")}
                    id="email"
                    className={`${
                      errors.email ? "border-red-500" : "border-gray-300"
                    } border-2 p-2 rounded w-full`}
                  />
                  {errors.email && (
                    <p className={erroStyle}>{errors.email.message}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="senha"
                    className={`${
                      errors.senha ? "text-red-500" : "text-[#666]"
                    }`}
                  >
                    Senha:
                  </label>
                  <input
                    type="password"
                    placeholder="Insira sua senha"
                    {...register("senha")}
                    id="senha"
                    className={`${
                      errors.senha ? "border-red-500" : "border-gray-300"
                    } border-2 p-2 rounded w-full`}
                  />
                  {errors.senha && (
                    <p className={erroStyle}>{errors.senha.message}</p>
                  )}
                </div>
                <button
                  className="bg-buttonBlue p-2 w-full mt-4 text-white rounded-md hover:opacity-80"
                  type="submit"
                >
                  Fazer login
                </button>
              </form>
              <div className="flex justify-between mt-4">
                <p
                  onClick={handleCadastro}
                  className="text-buttonBlue text-sm hover:cursor-pointer hover:underline"
                >
                  Criar uma conta
                </p>
                <p className="text-buttonBlue text-sm hover:cursor-pointer hover:underline">
                  Esqueci minha senha
                </p>
              </div>
            </div>
          </div>
          <div className="bg-buttonBlue w-full"></div>
        </div>
    </div>
  );
};

export default Login;
