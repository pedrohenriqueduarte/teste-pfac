"use client";

import useAuthStore from "@/store/auth";
import { useRouter } from "next/navigation";
import Chat from "./chat/page";
import Login from "./login/page";

export default function Home() {
  const signed = useAuthStore((state) => state.signed);
  const router = useRouter();

  function renderPage() {
    switch (signed) {
      case true:
        return <Chat />;
      case false:
        return <Login />;
      default:
        return <Login />;
    }
  }
  return <>{renderPage()}</>;
}
