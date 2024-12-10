import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ContainerItem from "../../components/container";

// const errorValidator = (data:object) =>
//   toast.error(`${data}`, {
//     position: "top-right",
//     autoClose: 1500,
//     hideProgressBar: false,
//     closeOnClick: true,
//     pauseOnHover: true,
//     draggable: true,
//     theme: "light",
//   });

const successValidation = (data:string) =>
  toast.success(`${data}`, {
    position: "top-right",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  });

const Login: React.FC = () => {
  const validationSchemaLogin = z.object({
    email: z.string().email({ message: "E-mail é obrigatório " }),
    senha: z
      .string()
      .min(6, { message: "A senha precisa ter no mínimo 6 dígitos" }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(validationSchemaLogin),
    defaultValues: {
      email: "",
      senha: "",
    },
  });

  const onSubmit = (data: object) => {
    successValidation("Login realizado com sucesso!");
    console.log(data);
  };

  const erroStyle = "text-red-600 text-left text-[12px]";

  const handleCadastro = () => {
    window.location.href = "/cadastro";
  };

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
            <div className="w-full h-full flex justify-center items-center ">
              <div className="w-4/6">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div>
                    <div className="items-center text-[40px] mb-2 mt-4">
                      <p className="font-semibold text-blue-700 text-start">
                        Fazer login
                      </p>
                      <p className="text-sm text-[#AFB8D6]">
                        Digite seu usuário e senha para entrar!
                      </p>
                    </div>
                    <div>
                      <div>
                        <label className={`${errors.email ? 'text-red-500' : 'text-[#666]'}`} htmlFor="email">Email:</label>
                        <input
                          type="email"
                          placeholder="Insira seu Email"
                          {...register("email")}
                          id="email"
                          className={`${
                            errors.email ? "input-error" : "border-gray-300"
                          } border-2 p-2 rounded w-full`}
                        />
                        {errors?.email && (
                          <p className={erroStyle}>{errors.email.message}</p>
                        )}
                      </div>
                      <div>
                        <label  className={`${errors.email ? 'text-red-500' : 'text-[#666]'}`} htmlFor="senha">Senha:</label>
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
                          <p className={erroStyle}>{errors.senha.message}</p>
                        )}
                      </div>
                    </div>
                    <div>
                      <button
                        className="bg-buttonBlue p-2 w-full mt-4 text-white text-center rounded-md hover:opacity-80 duration-150"
                        type="submit"
                      >
                        Fazer login
                      </button>
                    </div>
                  </div>
                </form>
                <div className="flex justify-around">
                  <p
                    onClick={() => handleCadastro()}
                    className="text-buttonBlue mt-4  text-sm text-center hover:opacity-55 hover:cursor-pointer hover:underline duration-150"
                  >
                    Criar uma conta
                  </p>
                  <p className="text-buttonBlue mt-4  text-sm text-center hover:opacity-55 hover:cursor-pointer hover:underline duration-150">
                    Esqueci minha senha
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-buttonBlue w-full">
            <h1></h1>
          </div>
        </div>
      </ContainerItem>
    </div>
  );
};

export default Login;
