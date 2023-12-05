import { SignInCredentials, SignUpCredentials, Token } from ".";
import { toast } from "react-toastify";
import api from "@/services/api";

export function getDataInLocalStorage(key: string) {
  const dataString = localStorage.getItem(key!);

  if (!dataString || dataString === undefined) {
    return "";
  }

  if (typeof dataString === "string") {
    const json = dataString === undefined ? "" : JSON.parse(dataString);

    return json;
  }
  return "";
}

export function getTokensLocalStorage(): Token | null {
  const token = getDataInLocalStorage("@chat:t");

  return token;
}

export function setTokensLocalStorage(token: Token | null) {
  const tokensEmpty = {
    accessToken: "",
  };
  localStorage.setItem("@chat:t", JSON.stringify(token ?? tokensEmpty));
}

export function clearTokensLocalStorage() {
  const teste = localStorage.removeItem("@chat:t");
  return teste;
}

export async function signInRequest({ email, password }: SignInCredentials) {
  try {
    console.log("env", process.env.BACKEND_API_URL);

    const response = await api().post("/auth/sign-in", {
      email,
      password,
    });

    console.log({ response });

    return response.data;
  } catch (error: any) {
    if (error.response.status === 500) {
      toast.error("Erro desconhecido, contate o suporte");
    } else {
      toast.error(error.response.data.message);
    }
    return null;
  }
}

export async function signUpRequest(data: SignUpCredentials) {
  try {
    const response = await api().post("/auth/sign-up", {
      data,
    });

    console.log({ response });

    return response.data;
  } catch (error: any) {
    if (error.response.status === 500) {
      toast.error("Erro desconhecido, contate o suporte");
    } else {
      toast.error(error.response.data.message);
    }
    return null;
  }
}
