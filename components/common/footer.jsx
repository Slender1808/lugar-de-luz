import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-top col-12 shadow-lg mt-5">
      <div className="container pt-5">
        <Link href="/" className="text-decoration-none text-dark">
          <figure>
            <blockquote className="blockquote">
              <p>Lugar de luz</p>
              <img
                src="/vercel.svg"
                alt="lugar de luz icone"
                className="img-fluid m-3"
                height="64"
                width="64"
              />
            </blockquote>
          </figure>
        </Link>
      </div>
    </footer>
  );
}