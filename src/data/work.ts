export type WorkItem = { name: string; img: string };
export type WorkMap = Record<string, { title: string; items: WorkItem[] }>;

export const WORKS: WorkMap = {
  "animation": {
    title: "Animation",
    items: [
      { name: "Surfrider Foundation", img: "/images/work/animation/1.png" },
      { name: "Ocean Plastics",       img: "/images/work/animation/2.png" },
      { name: "Reef Life",            img: "/images/work/animation/3.png" },
      { name: "Blue Current",         img: "/images/work/animation/4.png" },
      { name: "Coast Watch",          img: "/images/work/animation/5.png" },
      { name: "Swell Study",          img: "/images/work/animation/6.png" },
      { name: "Harbor Lights",        img: "/images/work/animation/7.png" },
      { name: "Sea Breeze",           img: "/images/work/animation/8.png" },
      { name: "Foam Lines",           img: "/images/work/animation/9.png" },
      { name: "After Tide",           img: "/images/work/animation/10.png" }
    ]
  },

  "music-video": {
    title: "Music Video",
    items: [
      { name: "Studio Session", img: "/images/work/music-video/1.jpg" },
      // ...add up to 10
    ]
  },

  "vfx": {
    title: "Visual effects (VFX)",
    items: [
      { name: "Particle Test", img: "/images/work/vfx/1.jpg" },
      // ...add up to 10
    ]
  }
};
