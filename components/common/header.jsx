import Navbar from "react-bootstrap/Navbar";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/client";

export default function Header() {
  const [session, loading] = useSession();
  return (
    <header className="shadow">
      <Navbar expand="sm shadow px-3">
        <Navbar.Brand href="#">
          <img
            src="/lugar-de-luz.min.svg"
            alt="lugar de luz icone"
            className="img-fluid ms-3"
            height="42"
            width="42"
          />
        </Navbar.Brand>
        {session ? (
          <Navbar.Brand href="#">
            <img
              src={session.user.image}
              alt="imagem da conta"
              className="img-fluid rounded-circle"
              height="42"
              width="42"
            />
          </Navbar.Brand>
        ) : null}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <div className="container navbar-nav">
            <Link href="/agenda">
              <a className="nav-link col">Agenda</a>
            </Link>
            <div className="d-flex col-2 align-items-end align-items-center">
              {!loading ? (
                !session ? (
                  <button
                    className="nav-link btn"
                    onClick={() => signIn("auth0")}
                  >
                    Entrar
                  </button>
                ) : (
                  <button
                    className="nav-link btn-close"
                    onClick={() => signOut()}
                    aria-label="Close"
                  >
                  </button>
                )
              ) : (
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
              )}
            </div>
          </div>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
}
