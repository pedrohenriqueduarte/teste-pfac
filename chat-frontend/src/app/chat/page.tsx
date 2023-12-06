"use client";

import useAuthStore from "@/store/auth";
import { useCallback, useEffect, useRef, useState } from "react";
import send from "@/assets/SendRounded.svg";
import Image from "next/image";
import CardMessage from "@/app/components/MessageCard/";
import { toast } from "react-toastify";
import {
  Message,
  getMessages,
  sendMessage,
} from "@/services/requests/messages";
import { clearTokensLocalStorage } from "@/services";
import { useRouter } from "next/navigation";
import { useEventsSocket } from "@/contexts/SocketProvider";
import backImg from "@/assets/backimg.jpg";

export default function Chat() {
  const user = useAuthStore((state) => state.user);
  const setSignOut = useAuthStore((state) => state.signOut);
  const router = useRouter();
  const socket = useEventsSocket();

  const [message, setMessage] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [messagesList, setMessagesList] = useState<Message[]>([]);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messagesList]);

  useEffect(() => {
    if (user) {
      setUserName(user.name);
    } else {
      router.push("/login");
    }
  }, [user]);

  const handleMessageToSend = useCallback(async () => {
    try {
      await sendMessage({
        text: message,
      });

      setMessage("");
      toast.success("Mensagem enviada com sucesso!");
    } catch (error: any) {
      console.log(error.response.data.message);
    }
  }, [message]);

  async function getMessageRequest() {
    try {
      const response = await getMessages();

      setMessagesList(response);
    } catch (error: any) {
      console.log(error.response?.data?.message);
    }
  }

  function logout() {
    try {
      setSignOut();
      clearTokensLocalStorage();

      router.push("/login");
      toast.success("Usuário deslogado!");
    } catch (error) {
      toast.error("Erro no Logout");
    }
  }

  useEffect(() => {
    getMessageRequest();
  }, []);

  const handleChatBySocket = useCallback((message: any) => {
    setMessagesList((prevState) => [...prevState, message]);
  }, []);

  useEffect(() => {
    socket.on("message", handleChatBySocket);

    return () => {
      socket.off("message", handleChatBySocket);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  return (
    <div className="w-screen h-screen flex flex-col relative">
      <Image
        src={backImg}
        alt="imagem de fundo"
        className="w-full h-full object-cover absolute inset-0 z-10"
      />

      <header className="z-20 absolute inset-0 bg-black flex justify-between items-center border-cyan-400 w-full h-20 p-5">
        <div>
          <p className="text-white text-center font-Roboto text-base font-normal leading-42 tracking-0.25">
            {userName}
          </p>
        </div>

        <div className="ml-6 mr-6">
          <h1 className="text-white text-center font-Roboto text-3xl font-normal leading-42 tracking-0.25">
            Chat for a Cause
          </h1>
        </div>

        <div>
          <button
            onClick={logout}
            className="text-white text-center font-Roboto text-base font-normal leading-42 tracking-0.25"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="z-20 w-full h-full flex justify-center items-center mt-20">
        <div className="bg-white min-w-[375px] h-full w-3/6 flex flex-col">
          <div
            className="bg-white w-full flex flex-1-0-0 flex-col gap-6 p-10 overflow-y-auto"
            ref={chatContainerRef}
          >
            {messagesList &&
              messagesList.map((msg, i) => {
                const isUserMsg = msg.user.email === user?.email;
                return (
                  <div
                    key={msg?.id}
                    className={`flex ${
                      isUserMsg ? "justify-end" : "justify-start"
                    }`}
                  >
                    <CardMessage
                      email={msg?.user?.email as string}
                      name={msg?.user?.name as string}
                      text={msg?.text}
                      date={msg?.created_at}
                      isUserMsg={isUserMsg}
                    />
                  </div>
                );
              })}
          </div>
          <div className="bg-[#f0f2f5] h-20 w-full p-3 flex gap-3">
            <input
              className="h-14 shadow appearance-none border rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full p-2.5"
              placeholder="Envie sua mensagem"
              value={message}
              onChange={(ev) => setMessage(ev.target.value)}
            />

            <button
              className={`w-9 flex justify-center items-center border rounded ${
                !message ? "bg-gray-400 cursor-not-allowed" : "bg-[#298FCF]"
              }`}
              disabled={!message}
              onClick={handleMessageToSend}
            >
              <Image src={send} alt="enviar"></Image>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
