import { User } from "@/services";
import dayjs from "dayjs";
import { create } from "domain";
import { start } from "repl";

type CardMessageProps = {
  name: string;
  email: string;
  text: string;
  date: Date;
  isUserMsg: boolean;
};

const CardMessage = ({
  name,
  email,
  text,
  date,
  isUserMsg,
}: CardMessageProps) => {
  return (
    <div className="w-2/5 bg-[#f0f2f5] min-w-[250px] p-3 border rounded border-gray-400 flex flex-col gap-4">
      <div className="w-full flex justify-start font-bold">
        <p>{name}</p>
      </div>

      <div className="w-full flex text-justify">
        <p>{text}</p>
      </div>

      <div className="w-full flex justify-end">
        <p className="text-zinc-500">
          {dayjs(date).format("DD/MM/YYYY HH:mm")}
        </p>
      </div>
    </div>
  );
};

export default CardMessage;
