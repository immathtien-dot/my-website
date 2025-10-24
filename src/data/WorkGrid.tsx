import { Link, useParams } from "react-router-dom";
import { WORKS } from "./work";
import "../work.css"; // styles in step 4

export default function WorkGrid() {
  const { slug = "" } = useParams();
  const data = WORKS[slug];

  if (!data) {
    return (
      <div className="work not-found">
        <header className="site-header">
          <Link to="/" className="brand">← Back to Home</Link>
        </header>
        <main className="work__container">
          <h1>Not found</h1>
          <p>There is no collection for “{slug}”.</p>
        </main>
      </div>
    );
  }

  return (
    <div className="work">
      {/* keep the same header look (simplified) */}
      <header className="site-header">
        <Link to="/" className="brand">Linsey</Link>
        <nav className="nav">
          <Link className="nav-link" to="/#about">About</Link>
          <Link className="nav-link" to="/#projects">Projects</Link>
          <Link className="nav-link" to="/#contact">Contact</Link>
        </nav>
        <a className="btn learn-more" href={`${import.meta.env.BASE_URL}pixel-mask/`} target="_blank" rel="noopener">
          Learn More
        </a>
      </header>

      <main className="work__container">
        <div className="work__left">
          <p className="kicker">PROJECTS</p>
          <h1 className="work__title">See the Big Picture</h1>
          <p className="work__lead">
            Area turns your data into clear, vibrant visuals that show exactly
            what's happening in each region.
          </p>
        </div>

        <div className="grid">
          {data.items.map((it: any, i: number) => (
            <figure className="tile" key={i}>
              <img src={it.img} alt={it.name} />
              <figcaption className="tile__label">{it.name}</figcaption>
            </figure>
          ))}
        </div>
      </main>
    </div>
  );
}
