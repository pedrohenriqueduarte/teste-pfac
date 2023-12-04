"use client";

import useAuthStore from "@/store/auth";
import Login from "./(auth)/login/page";
import Chat from "./chat/page";

export default function Home() {
  const signed = useAuthStore((state) => state.signed);
  return <>{signed ? <Chat /> : <Login />}</>;
}
