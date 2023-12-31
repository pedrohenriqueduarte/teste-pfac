import { SignInCredentials, SignUpCredentials, Token } from ".";
import api from "@/services/api";
import { toast } from "react-toastify";

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
  return localStorage.removeItem("@chat:t");
}

export async function signInRequest({ email, password }: SignInCredentials) {
  try {
    const response = await api().post("/auth/sign-in", {
      email,
      password,
    });

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
    const response = await api().post("/auth/sign-up", data);

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
