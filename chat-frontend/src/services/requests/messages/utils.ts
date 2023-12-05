import api from "@/services/api";
import { Message } from ".";
import { toast } from "react-toastify";

export async function sendMessage(data: Message) {
  try {
    console.log("env", process.env.BACKEND_API_URL);

    const response = await api().post("/message", data);

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

export async function getMessages() {
  try {
    const response = await api().get("/message");

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
