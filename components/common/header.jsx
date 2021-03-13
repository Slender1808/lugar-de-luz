import Navbar from "react-bootstrap/Navbar";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/client";

export default function Header() {
  const [session, loading] = useSession();
  return (
    <header className="shadow">
      <Navbar expand="sm shadow">
        <img
          src="/vercel.svg"
          alt="lugar de luz icone"
          className="img-fluid ms-3"
          height="24"
          width="24"
        />
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
                    className="col nav-link btn"
                    onClick={() => signIn("auth0")}
                  >
                    Entrar
                  </button>
                ) : (
                  <button
                    className="col nav-link btn"
                    onClick={() => signOut()}
                  >
                    Sair
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