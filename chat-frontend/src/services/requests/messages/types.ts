import { User } from "..";

export type MessagePostDTO = {
  text: string;
};

export type Message = {
  id: string;
  name: string;
  text: string;
  created_at: Date;
  user: Pick<User, "name" | "email">;
};
