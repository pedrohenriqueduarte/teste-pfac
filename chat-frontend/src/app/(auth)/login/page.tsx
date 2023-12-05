"use client";

import Input from "@/components/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useCallback } from "react";
import { setTokensLocalStorage, signInRequest } from "@/services";
import useAuthStore from "@/store/auth";
import { useRouter } from "next/navigation";

export type LoginFormData = {
  email: string;
  password: string;
};

export default function Login() {
  const setUserAuthenticated = useAuthStore(
    (state) => state.setUserAuthenticated
  );
  const router = useRouter();

  async function handleLogin(formData: LoginFormData) {
    try {
      const response = await signInRequest({
        email: formData?.email,
        password: formData?.password,
      });

      console.log("handleLoginRes =>", response);
      const { accessToken, user } = response;

      setTokensLocalStorage(accessToken);
      setUserAuthenticated(user, accessToken);

      router.push("/chat");
    } catch (error) {
      toast.error("Erro ao realizar login");
    }
  }

  const formValidation = useCallback(() => {
    return Yup.object().shape({
      email: Yup.string()
        .email("Digite um e-mail válido")
        .required("O campo E-mail é obrigatório."),
      password: Yup.string().required("O campo senha é obrigatório."),
    });
  }, []);

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(formValidation()),
  });

  return (
    <div className="flex flex-col w-screen h-screen justify-center items-center bg-slate-400">
      <header className="flex justify-center items-center w-96 mb-5">
        <h1 className="text-black text-center font-Roboto text-4xl font-normal leading-42 tracking-0.25">
          Chat For a Cause
        </h1>
      </header>

      <div
        className="flex flex-col items-center justify-center w-[25vw] min-w-[400px] gap-3
        rounded-10 bg-white p-12 rounded-xl"
      >
        <form
          onSubmit={handleSubmit(handleLogin)}
          className="w-full relative flex flex-col gap-3"
        >
          <section className="header">
            <h1 className="text-black text-center font-Roboto text-3xl font-normal leading-42 tracking-0.25 mb-4">
              Fazer Login
            </h1>
          </section>

          <Input
            style="h-14 shadow appearance-none border rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full p-2.5"
            label="E-mail"
            name="email"
            control={control}
          ></Input>

          <Input
            style="h-14 shadow appearance-none border rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full p-2.5"
            label="Senha"
            name="password"
            control={control}
            type="password"
          ></Input>

          <button
            type="submit"
            className="h-14 w-full bg-red-700 rounded-md text-white"
          >
            Entrar
          </button>
          <Link href="/signup">
            <button className="h-14 w-full bg-red-700 rounded-md text-white">
              Cadastre-se
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
}
