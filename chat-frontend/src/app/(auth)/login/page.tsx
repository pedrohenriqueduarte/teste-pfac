export default function Login() {
  return (
    <div className="flex flex-col w-screen h-screen justify-center items-center bg-slate-400">
      <header className="flex justify-center items-center w-96 mb-5">
        <h2 className="text-black text-center font-Roboto text-4xl font-normal leading-42 tracking-0.25">
          Chat For a Cause
        </h2>
      </header>

      <div
        className="flex flex-col items-center justify-center w-[25vw] min-w-[400px] gap-3
        rounded-10 bg-white p-12 rounded-xl"
      >
        <form className="w-full relative flex flex-col gap-3">
          <section className="header">
            <h1 className="text-black text-center font-Roboto text-4xl font-normal leading-42 tracking-0.25 mb-4">
              Fazer Login
            </h1>
          </section>

          <input
            placeholder="Digite seu e-mail"
            name="email"
            className="h-14 border-2 p-2.5 border-black rounded-md"
          />
          <input
            placeholder="Digite sua senha"
            name="senha"
            type="password"
            className="h-14 border-2 p-2.5  border-black rounded-md"
          />

          <button className="h-14 w-full bg-red-700 rounded-md text-white">
            Entrar
          </button>
          <button className="h-14 w-full bg-red-700 rounded-md text-white">
            Cadastre-se
          </button>
        </form>
      </div>
    </div>
  );
}
