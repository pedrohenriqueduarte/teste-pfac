"use client";

import Input from "@/components/Input";
import useAuthStore from "@/store/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import send from "@/assets/SendRounded.svg";
import Image from "next/image";
import CardMessage from "@/components/MessageCard";

export default function Chat() {
  const user = useAuthStore((state) => state.user);
  const [message, setMessage] = useState<string>("");

  return (
    <div className="w-screen h-screen flex flex-col bg-slate-400">
      <header className="bg-red-900 flex justify-between items-center border-cyan-400 w-full h-20 p-5">
        <div>
          <p className="text-white text-center font-Roboto text-base font-normal leading-42 tracking-0.25">
            {user?.name}
          </p>
        </div>

        <div className="ml-6 mr-6">
          <h1 className="text-white text-center font-Roboto text-3xl font-normal leading-42 tracking-0.25">
            Chat for a Cause
          </h1>
        </div>

        <div>
          <p className="text-white text-center font-Roboto text-base font-normal leading-42 tracking-0.25">
            Logout
          </p>
        </div>
      </header>

      <div className="w-full h-full bg-orange-600 flex justify-center items-center">
        <div className="bg-white h-full w-3/6 flex flex-col">
          <div className="bg-white w-full flex flex-1-0-0 flex-col gap-6 p-10 overflow-y-auto">
            <CardMessage />

            <CardMessage />

            <CardMessage />

            <CardMessage />
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
            >
              <Image src={send} alt="enviar"></Image>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
