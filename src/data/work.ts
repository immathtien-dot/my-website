export type WorkItem = { 
  name: string; 
  img?: string; 
  type?: 'image' | 'video';
  src?: string;
  poster?: string;
};
export type WorkMap = Record<string, { title: string; items: WorkItem[] }>;

export const WORKS: WorkMap = {
  "projects": {
    title: "All Projects",
    items: [
      { name: "Video Editing", img: "/work/animation/2.png" },
      { name: "Graphic Design", img: "/work/animation/4.png" },
      { name: "Animation Project", 
        type: "video",
        src: "/videos/animation.mp4",
        poster: "/work/animation/1.png"},

      { name: "Collage Video Project", 
        type: "video",
        src: "/videos/collage.mp4",
        poster: "/work/animation/5.png"},

        { name: "Video for quote", type: "video",
          src: "/videos/meaning.mp4",
          poster:"/work/animation/6.png" },

      { name: "Coding Menu", type: "video",
        src: "/videos/menu.mp4",
        poster:"/work/animation/7.png" },

      
      { name: "Coding Invitation", type: "video",
        src: "/videos/invitation.mp4",
        poster:"/work/animation/8.png" },

      { name: "Vlog Project", 
        type: "video",
        src: "/videos/vlog.mp4",
        poster: "/work/animation/9.png"
 },
      { name: "Vfx Project", 
        type: "video",
        src: "/videos/vfx.mp4",
        poster: "/work/animation/10.png" }
    ]
  },
};
