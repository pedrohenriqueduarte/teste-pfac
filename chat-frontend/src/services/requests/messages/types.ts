import { User } from "..";

export type Message = {
  id: string;
  text: string;
  created_at: Date;
  user: Pick<User, "name" | "email">;
};
