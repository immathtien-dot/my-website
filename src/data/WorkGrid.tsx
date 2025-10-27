import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { WORKS } from "./work";
import "../work.css";

export default function WorkGrid() {
  const { slug = "" } = useParams();
  const data = WORKS[slug];
  const [fullScreenVideo, setFullScreenVideo] = useState<{ src: string; name: string; poster?: string } | null>(null);
  const [fullScreenImage, setFullScreenImage] = useState<{ src: string; name: string } | null>(null);

  if (!data) return <main className="work__container"><h1>Not found</h1></main>;

  const handleVideoClick = (src: string, name: string, poster?: string) => {
    setFullScreenVideo({ src, name, poster });
  };

  const closeFullScreenVideo = () => {
    setFullScreenVideo(null);
  };

  const handleImageClick = (src: string, name: string) => {
    setFullScreenImage({ src, name });
  };

  const closeFullScreenImage = () => {
    setFullScreenImage(null);
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
            <h1 className="work__title">My Creative Experience</h1>
            <p className="work__lead">
            My works are a reflection of how I see and feel the world. Through different projects, I explore how emotion can be translated into visuals and how art becomes a way to connect both the inner and outer worlds.
            </p>
          </div>
        </header>

        <div className="work__gallery">
        <div className="work__grid">
          {data.items.map((it, i) => (
            <figure 
              className={`tile ${it.type === 'video' ? 'tile--video' : ''}`} 
              key={i}
              onClick={() => {
                if (it.type === 'video' && it.src) {
                  handleVideoClick(it.src, it.name, it.poster);
                } else if (!it.type) {
                  // If it has a poster but clicking opens img, use img for fullscreen
                  const imageToShow = it.poster ? it.img : (it.img || it.poster);
                  if (imageToShow) {
                    handleImageClick(imageToShow, it.name);
                  }
                }
              }}
              style={{ cursor: (it.type === 'video' || it.img || it.poster) ? 'pointer' : 'default' }}
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
                <img src={it.poster || it.img} alt={it.name} className="tile__media" />
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

        {/* Copyright Footer */}
        <footer className="work__footer">
          <p className="work__copyright">© Linsey Truong</p>
        </footer>
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

      {/* Fullscreen Image Overlay */}
      {fullScreenImage && (
        <div className="fullscreen-video-overlay" onClick={closeFullScreenImage}>
          <div className="fullscreen-video-container" onClick={(e) => e.stopPropagation()}>
            <button className="fullscreen-video-close" onClick={closeFullScreenImage}>
              &times;
            </button>
            <img 
              src={fullScreenImage.src}
              alt={fullScreenImage.name}
              className="fullscreen-video-player"
              style={{ objectFit: 'contain' }}
            />
            <div className="fullscreen-video-title">{fullScreenImage.name}</div>
          </div>
        </div>
      )}
    </div>
  );
}

