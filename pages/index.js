import Head from "next/head";
import { signIn, useSession } from "next-auth/client";
import { useState, useEffect } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [date, setDate] = useState(() => {
    let date = new Date();
    date.setDate(date.getDate() - 1);
    return date;
  });
  const [session] = useSession();

  return (
    <div
      style={{ minHeight: "100vh" }}
      className="d-flex align-items-center justify-content-center"
    >
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container text-center">
        <h1>Lugar de Luz</h1>
        {session ? (
          <div className="row">
            <form className="text-start">
              <div className="mt-3">
                <label htmlFor="FormNome" className="form-label">
                  Nome
                </label>
                <input
                  type="name"
                  className="form-control"
                  id="FormNome"
                  placeholder="Ex: José Maria"
                ></input>
              </div>
              <div className="mt-3">
                <label htmlFor="FormDate" className="form-label">
                  Dia
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="FormDate"
                  min={date.toISOString().slice(0, 10)}
                  defaultValue={date.toISOString().slice(0, 10)}
                  value={date.toISOString().slice(0, 10)}
                  onChange={(event) => {
                    setDate(event.target.value);
                  }}
                ></input>
              </div>
            </form>
            <p>{/*JSON.stringify({ name, date })*/}</p>
          </div>
        ) : (
          <div className="mt-3">
            <h5>
              Para fazer os agendamentos faça login
              <span>
                <a
                  href="#"
                  className="link-dark"
                  onClick={() => signIn("auth0")}
                >
                  {" "}
                  Aqui
                </a>
              </span>
            </h5>
          </div>
        )}
      </main>
    </div>
  );
}
