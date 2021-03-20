import Head from "next/head";
import { signIn, useSession, getCsrfToken } from "next-auth/client";
import { useState, useEffect } from "react";
import { gql, useMutation } from "@apollo/client";

const INSERT_REG = gql`
  mutation insertRegistro($date: date, $name: String, $user: name) {
    insert_registros(objects: { name: $name, user: $user, date: $date }) {
      affected_rows
    }
  }
`;

export default function Home() {
  const [insertRegistro] = useMutation(INSERT_REG);
  const [err, setErr] = useState(false);
  const [name, setName] = useState("");
  const [date, setDate] = useState(() => {
    let date = new Date();
    date.setDate(date.getDate() - 1);
    return date;
  });
  const [session] = useSession();
  /*
  const [token, setToken] = useState(async () => await getCsrfToken());
  useEffect(async () => {
    setToken(await getCsrfToken());
  }, [session]);
  */

  return (
    <div
      style={{ minHeight: "100vh" }}
      className="d-flex align-items-center justify-content-center"
    >
      <Head>
        <title>Lugar de Luz</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container text-center">
        <h1>Agendar</h1>
        {session ? (
          <div className="row">
            <form
              className="text-start"
              onSubmit={async (e) => {
                e.preventDefault();
                const result = await insertRegistro({
                  variables: {
                    date: date.toISOString().slice(0, 10),
                    name,
                    user: session.user.email,
                  },
                });
                console.log(result);
                result.errors ? setErr(result.errors) : null;
              }}
            >
              <div className="mt-3">
                <label htmlFor="FormNome" className="form-label">
                  Nome
                </label>
                <input
                  type="text"
                  minLength="2"
                  maxLength="64"
                  className="form-control shadow"
                  id="FormNome"
                  placeholder="Ex: José Maria"
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                ></input>
              </div>
              <div className="mt-3 mb-5">
                <label htmlFor="FormDate" className="form-label">
                  Dia
                </label>
                <input
                  type="date"
                  className="form-control shadow"
                  id="FormDate"
                  min={date.toISOString().slice(0, 10)}
                  value={date.toISOString().slice(0, 10)}
                  onChange={(event) => {
                    setDate(new Date(event.target.value));
                  }}
                ></input>
              </div>
              <div className="d-grid gap-2 col-6 mx-auto mt-3">
                <button
                  className="btn btn-light btn-lg rounded-pill shadow"
                  type="submit"
                >
                  Enviar
                </button>
              </div>
              {err ? <p>{JSON.stringify(err)}</p> : null}
            </form>
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
