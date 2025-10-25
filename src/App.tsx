import { useEffect, useState, useRef } from "react";
import "./projects.css";
import "./contact.css";
import "./about.css";
import { Link } from "react-router-dom"; // make sure router is installed

type ProjectRow = { num: string; label: string; slug?: string };

const projectRows: ProjectRow[] = [
  { num: "01", label: "Animation", slug: "projects" },
  { num: "02", label: "Video Editing", slug: "projects" },
  { num: "03", label: "Coding", slug: "projects" },
  { num: "04", label: "Graphic Design", slug: "projects" },
];

<nav id="mainNav" className="nav">
  <a className="nav-link" href="#about">About</a>
  <a className="nav-link" href="#projects">Projects</a>
  <a className="nav-link" href="#contact">Contact</a>
</nav>

type MarqueeItem = { text: string };

function MarqueeRow({
  items,
  direction = "left",       // "left" | "right"
  speed = 30,               // giây cho 1 vòng
  gap = "1.5em",
  size = "8rem",
  pausedOnHover = true,     // chỉ để tương thích với demo JSON
}: {
  items: MarqueeItem[];
  direction?: "left" | "right";
  speed?: number;
  gap?: string;
  size?: string;
  pausedOnHover?: boolean;
}) {
  // Lặp nội dung 2 lần để chạy vô hạn mượt
  const dup = [...items, ...items];

  return (
    <div
      className={`marquee ${direction === "right" ? "marquee--reverse" : ""}`}
      style={
        {
          // @ts-ignore – dùng CSS var cho speed/size/gap
          "--speed": `${speed}s`,
          "--gap": gap,
          "--size": size,
        } as React.CSSProperties
      }
    >
      <div className="marquee__inner" aria-hidden={!pausedOnHover}>
        {dup.map((it, i) => (
          <span className="marquee__item" key={i}>{it.text}</span>
        ))}
      </div>
    </div>
  );
}

function ContactSection() {
  // dữ liệu theo cấu trúc bạn gợi ý
  const rowA: MarqueeItem[] = [
    { text: "Photoshop" }, { text: "·" },
    { text: "Procreate" }, { text: "·" },
    { text: "Premiere" }, { text: "·" },
    { text: "After Effects" },{ text: "·" },
  ];
  const rowB: MarqueeItem[] = [
    { text: "Photography" }, { text: "·" },
    { text: "Video Editing" }, { text: "·" },
    { text: "Graphic Design" }, { text: "·" },
    { text: "Animation" },{ text: "·" },
  ];

  return (
    <section id="contact" className="section contact">
      <div className="contact__container">
        {/* hàng 1: chạy trái → phải (direction right) */}
        <MarqueeRow items={rowA} direction="right" speed={25} size="3.5rem" gap="1em" />
        {/* hàng 2: chạy phải → trái (default left) */}
        <MarqueeRow items={rowB} direction="left" speed={25} size="3.5rem" gap="1em" />
        
        {/* Connect with me section */}
        <div className="contact__connect">
          <h2 className="contact__title">Connect with me</h2>
          <p className="contact__description">
            Schedule a quick call to learn how Area can turn your regional data into a powerful advantage.
          </p>
          <a className="contact__cta" href="#contact">
            Say Hello →
          </a>
        </div>
      </div>
    </section>
  );
}

<a className="nav-link" href="#projects">Projects</a>
function ProjectsGallery() {
  const items = [
    { src: "./images/projects/p1.png", caption: "Cylindrical forms — soft studio lighting." },
    { src: "./images/projects/p2.png", caption: "Minimal set design with warm palette." },
    { src: "./images/projects/p3.png", caption: "Macro texture study on matte surface." },
    { src: "./images/projects/p4.png", caption: "Product stack with gentle rim light." },
  ];
  
  const [idx, setIdx] = useState(0);
  const timerRef = useRef<number | null>(null);
  
  const next = () => setIdx(i => (i + 1) % items.length);
  
  const startAuto = () => {
    if (timerRef.current) return;
    timerRef.current = window.setInterval(next, 900);
  };
  const stopAuto = () => {
    if (!timerRef.current) return;
    window.clearInterval(timerRef.current);
    timerRef.current = null;
  };
  
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "ArrowRight") next(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  
  const cur = items[idx];
  
  return (
    <div id="projects-gallery" className="projects__right">
      <div
        className="image-card"
        onMouseEnter={startAuto}
        onMouseLeave={stopAuto}
      >
        <img src={cur.src} alt={cur.caption} />
        <div className="overlay">
          <div className="overlay__box"><p>Hover to preview</p></div>
        </div>
        <button className="next-btn" onClick={next} aria-label="Next">
          &gt;
        </button>
      </div>
      <p className="caption">{cur.caption}</p>
    </div>
  );
}

export default function App() {
  
  useEffect(() => {
    const nav = document.getElementById("mainNav");
    const links = nav?.querySelectorAll<HTMLAnchorElement>(".nav-link") ?? [];
    const sections = Array.from(document.querySelectorAll<HTMLElement>("section[id]"));

    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const id = entry.target.id;
        const link = nav?.querySelector(`.nav-link[href="#${id}"]`);
        if (!link) return;
        if (entry.isIntersecting) {
          links.forEach(l => l.classList.remove("active"));
          link.classList.add("active");
        }
      });
    }, { threshold: 0.55 });

    sections.forEach(s => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <div className="app">
      <section id="home" className="section section-hero"></section>
      
      <section id="about" className="section about">
        <div className="about__container">
          <p className="about__kicker">About <span>Me</span></p>
          <h2 className="about__title">Hello, I'm Linsey Truong.</h2>
            <p className="about__lead">
            Art is not just about making something beautiful, it’s about self-discovery. Every project I work on reflects a moment of clarity, a thought I couldn’t say out loud, or a feeling I needed to release. In that sense, art isn’t just something I do — it’s the way I learn to listen to myself.
               </p>
          <hr className="about__rule" />

          <div className="about__grid">
            <article className="card">
              <div className="card__icon">🏴</div>
              <h3>Amplify Insights</h3>
              <p>Unlock data-driven decisions with analytics.</p>
            </article>
            <article className="card">
              <div className="card__icon">🌐</div>
              <h3>Control Your Global Presence</h3>
              <p>Manage satellite offices consistently.</p>
            </article>
            <article className="card">
              <div className="card__icon">🗣️</div>
              <h3>Remove Language Barriers</h3>
              <p>Built-in localization for clarity.</p>
            </article>
            <article className="card">
              <div className="card__icon">📈</div>
              <h3>Visualize Growth</h3>
              <p>Precise visual reports across regions.</p>
            </article>
          </div>

          <figure className="about__image">
            <img src="/images/mountain.png" alt="Landscape" />
          </figure>
        </div>
      </section>

      <section id="projects" className="section projects">
        <div className="projects__container">
          <div className="projects__left">
            <h3 className="projects__subtitle">PROJECT<span>S</span></h3>
            <h2 className="projects__title">See the Big Picture</h2>
            <p className="projects__lead">
              Area turns your data into clear, vibrant visuals that show exactly
              what's happening in each region.
            </p>

            <ul className="projects__list">
              {projectRows.map((p) => (
                <li key={p.num} className={`row ${p.slug ? "is-link" : ""}`}>
                  <div className="row__dot"></div>
                  <span className="row__text">{p.label}</span>

                  {p.slug && (
                    <Link
                      to={`/work/${p.slug}`}
                      className="stretched-link"
                      aria-label={`Open ${p.label}`}
                    />
                  )}

                  {p.slug && <span className="chev" aria-hidden>›</span>}
                </li>
              ))}
            </ul>
          </div>

          <ProjectsGallery />
        </div>
      </section>

      <ContactSection />
    </div>
  );
}
