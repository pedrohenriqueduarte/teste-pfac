"use client";

import useAuthStore from "@/store/auth";
import { useRouter } from "next/navigation";

export default function Home() {
  const signed = useAuthStore((state) => state.signed);
  const router = useRouter();

  function renderPage() {
    switch (signed) {
      case true:
        return router.push("/chat");
      case false:
        return router.push("/login");
      default:
        return router.push("/login");
    }
  }
  return <>{renderPage()}</>;
}
