const CardMessage = () => {
  return (
    <div className="w-fullbg-[#f0f2f5] p-3 border rounded border-black flex flex-col gap-4">
      <div className="w-full flex justify-start font-bold">
        <p>Paulo Moreno Duarte</p>
      </div>

      <div className="w-full flex text-justify">
        <p>
          Nunca é demais lembrar o peso e o significado destes problemas, uma
          vez que a consulta aos diversos militantes afeta positivamente a
          correta previsão da gestão inovadora da qual fazemos parte.
        </p>
      </div>

      <div className="w-full flex justify-end">
        <p className="text-zinc-500">03/12/90 - 12h00</p>
      </div>
    </div>
  );
};

export default CardMessage;
