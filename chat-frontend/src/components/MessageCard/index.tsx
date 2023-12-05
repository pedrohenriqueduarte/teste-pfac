import dayjs from "dayjs";
import { create } from "domain";

type CardMessageProps = {
  name: string;
  email: string;
  text: string;
  date: Date;
};

const CardMessage = ({ name, email, text, date }: CardMessageProps) => {
  return (
    <div className="w-fullbg-[#f0f2f5] p-3 border rounded border-black flex flex-col gap-4">
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
