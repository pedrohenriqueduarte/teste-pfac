"use client";

import React, { createContext, useContext, useEffect, useMemo } from "react";
import { io, Socket } from "socket.io-client";

interface SocketContextProps {
  socket: Socket | null;
}

export const EventsSocketContext = createContext<SocketContextProps>({
  socket: null,
});

type Props = {
  children: React.ReactNode;
};

export const EventsSocketProvider = ({ children }: Props) => {
  const socket = useMemo(
    () =>
      io(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/messages`, {
        autoConnect: false,
        withCredentials: true,
        transports: ["websocket"],
      }),
    []
  );

  function handleSocketConnect() {
    console.debug("Socket connected", socket.id);
  }

  function handleSocketDisconnect(reason: Socket.DisconnectReason) {
    console.debug("Socket disconnected", reason);
  }

  useEffect(() => {
    socket.connect();

    socket.on("connect", handleSocketConnect);
    socket.on("disconnect", handleSocketDisconnect);

    return () => {
      socket.off("connect", handleSocketConnect);
      socket.off("disconnect", handleSocketDisconnect);
      socket.disconnect();
    };
  }, [socket]);

  return (
    <EventsSocketContext.Provider value={{ socket }}>
      {children}
    </EventsSocketContext.Provider>
  );
};

export const useEventsSocket = (): Socket => {
  const { socket } = useContext(EventsSocketContext);

  if (!socket) {
    throw new Error(
      "useEventsSocket deve ser usado dentro do EventsSocketProvider"
    );
  }

  return socket;
};
