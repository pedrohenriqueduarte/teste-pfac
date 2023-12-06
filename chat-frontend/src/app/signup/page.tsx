"use client";

import Input from "@/components/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { useCallback } from "react";
import useAuthStore from "@/store/auth";
import { setTokensLocalStorage, signUpRequest } from "@/services";
import Link from "next/link";
import Image from "next/image";
import backImg from "@/assets/backimg.jpg";
import { useRouter } from "next/navigation";

export type SignUpFormData = {
  userName: string;
  email: string;
  password: string;
};

export default function SignUp() {
  const setUserAuthenticated = useAuthStore(
    (state) => state.setUserAuthenticated
  );
  const router = useRouter();

  const formValidation = useCallback(() => {
    return Yup.object().shape({
      userName: Yup.string()
        .min(3, "3 caracteres")
        .required("O campo de nome do usuário é obrigatório"),
      email: Yup.string()
        .email("Digite um e-mail válido")
        .required("O campo E-mail é obrigatório."),
      password: Yup.string().required("O campo senha é obrigatório."),
    });
  }, []);

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(formValidation()),
  });

  async function handleSignUp(formData: SignUpFormData) {
    try {
      const response = await signUpRequest({
        name: formData?.userName,
        email: formData?.email,
        password: formData?.password,
      });

      const { accessToken, user } = response;

      setTokensLocalStorage(accessToken);
      setUserAuthenticated(user, accessToken);
      router.push("/chat");
    } catch (error: any) {
      console.log(error.response?.data?.message);
    }
  }

  return (
    <div className="flex flex-col w-screen h-screen justify-center items-center relative">
      <Image
        src={backImg}
        alt="imagem de fundo"
        className="w-full h-full object-cover absolute inset-0"
      />
      <div className="absolute inset-0 flex flex-col justify-center items-center">
        <div
          className="flex flex-col items-center justify-center w-[25vw] min-w-[400px] gap-3
        rounded-10 bg-white p-12 rounded-xl"
        >
          <form
            onSubmit={handleSubmit(handleSignUp)}
            className="w-full relative flex flex-col gap-3"
          >
            <section className="header">
              <h1 className="text-black text-center font-Roboto text-3xl font-normal leading-42 tracking-0.25 mb-4">
                Cadastro
              </h1>
            </section>

            <Input
              style="h-14 shadow appearance-none border rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full p-2.5"
              label="Nome de Usuário"
              name="userName"
              control={control}
            ></Input>

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
              className="h-14 w-full bg-[#3C7536] rounded-md text-white"
            >
              Enviar
            </button>

            <Link
              href="/login"
              className="h-14 w-full bg-[#3C7536] rounded-md text-white flex justify-center items-center"
            >
              Voltar
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
