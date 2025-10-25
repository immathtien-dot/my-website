import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { WORKS } from "./work";
import "../work.css";

export default function WorkGrid() {
  const { slug = "" } = useParams();
  const data = WORKS[slug];
  const [fullScreenVideo, setFullScreenVideo] = useState<{ src: string; name: string; poster?: string } | null>(null);

  if (!data) return <main className="work__container"><h1>Not found</h1></main>;

  const handleVideoClick = (src: string, name: string, poster?: string) => {
    setFullScreenVideo({ src, name, poster });
  };

  const closeFullScreenVideo = () => {
    setFullScreenVideo(null);
  };

  return (
    <div className="work">             {/* nền xanh */}
      <main className="work__container">
        <header className="work__header">
          <div className="work__nav">
            <Link to="/" className="work__back-link">
              ← Back to Home
            </Link>
            <p className="kicker">PROJECTS</p>
          </div>
          <div className="work__title-section">
            <h1 className="work__title">See the Big Picture</h1>
            <p className="work__lead">
              Area turns your data into clear, vibrant visuals that show exactly
              what's happening in each region.
            </p>
          </div>
        </header>

        <div className="work__gallery">
          <div className="work__featured">
            <figure className="featured-tile">
              <img src={data.items[0]?.img} alt={data.items[0]?.name} />
              <figcaption className="tile__label">{data.items[0]?.name}</figcaption>
            </figure>
            <figure className="featured-tile">
              <img src={data.items[1]?.img} alt={data.items[1]?.name} />
              <figcaption className="tile__label">{data.items[1]?.name}</figcaption>
            </figure>
          </div>

        <div className="work__grid">
          {data.items.slice(2).map((it, i) => (
            <figure 
              className={`tile ${it.type === 'video' ? 'tile--video' : ''}`} 
              key={i}
              onClick={() => it.type === 'video' && it.src && handleVideoClick(it.src, it.name, it.poster)}
            >
              {it.type === 'video' ? (
                <video 
                  src={it.src}
                  className="tile__media"
                  poster={it.poster}
                  title={it.name}
                  preload="metadata"
                />
              ) : (
                <img src={it.img} alt={it.name} className="tile__media" />
              )}
              <figcaption className="tile__label">{it.name}</figcaption>
              {it.type === 'video' && (
                <div className="tile__play-button">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              )}
            </figure>
          ))}
        </div>
        </div>
      </main>

      {/* Fullscreen Video Overlay */}
      {fullScreenVideo && (
        <div className="fullscreen-video-overlay" onClick={closeFullScreenVideo}>
          <div className="fullscreen-video-container" onClick={(e) => e.stopPropagation()}>
            <button className="fullscreen-video-close" onClick={closeFullScreenVideo}>
              &times;
            </button>
            <video
              src={fullScreenVideo.src}
              poster={fullScreenVideo.poster}
              controls
              autoPlay
              className="fullscreen-video-player"
            >
              Your browser does not support the video tag.
            </video>
            <div className="fullscreen-video-title">{fullScreenVideo.name}</div>
          </div>
        </div>
      )}
    </div>
  );
}

