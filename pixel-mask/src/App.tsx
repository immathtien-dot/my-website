import { useState, useEffect, useRef, useCallback } from "react";

type TimeoutId = ReturnType<typeof setTimeout>;

interface RevealedSquare {
  x: number;
  y: number;
  id: string;
  timeoutId: TimeoutId;
}

export default function App() {
  // State 
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [revealedSquares, setRevealedSquares] = useState<RevealedSquare[]>([]);
  const [imageCenter, setImageCenter] = useState({ x: 0, y: 0 });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Const
  const squareSize = 108;
  const revealDistance = 25;
  const imageHeight = 800;
  const imageWidth = 600;
  const disappearDelay = 1000;

  // Images from public/images (no need to import)
  const images = [
    "/images/img01.png",
    "/images/img02.png",
    "/images/img03.png",
    "/images/img04.png",
  ];
  const currentImage = images[currentImageIndex];

  // Refs
  const isMouseDownRef = useRef(false);
  const lastRevealPosition = useRef({ x: 0, y: 0 });
  const revealInterval = useRef<TimeoutId | null>(null);
  const squareCounter = useRef(0);
  const revealedRef = useRef<RevealedSquare[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    revealedRef.current = revealedSquares;
  }, [revealedSquares]);

  // Center the fixed image area 600x800
  useEffect(() => {
    const updateImageCenter = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      setImageCenter({
        x: (vw - imageWidth) / 2,
        y: (vh - imageHeight) / 2,
      });
    };
    updateImageCenter();
    window.addEventListener("resize", updateImageCenter);
    return () => window.removeEventListener("resize", updateImageCenter);
  }, []);

  const removeSquareById = useCallback((id: string) => {
    setRevealedSquares((prev) => prev.filter((s) => s.id !== id));
  }, []);

  const revealSquareAtPosition = useCallback(
    (x: number, y: number) => {
      const centerX = x - squareSize / 2;
      const centerY = y - squareSize / 2;

      // Image border
      const L = imageCenter.x;
      const T = imageCenter.y;
      const R = imageCenter.x + imageWidth;
      const B = imageCenter.y + imageHeight;

      const sL = centerX;
      const sT = centerY;
      const sR = centerX + squareSize;
      const sB = centerY + squareSize;

      // Chỉ vẽ nếu giao vùng ảnh
      const intersects = sR > L && sL < R && sB > T && sT < B;
      if (intersects) {
        squareCounter.current += 1;
        const squareId = `square-${squareCounter.current}`;
        const timeoutId = setTimeout(() => removeSquareById(squareId), disappearDelay);

        setRevealedSquares((prev) => [
          ...prev,
          { x: centerX, y: centerY, id: squareId, timeoutId },
        ]);
      }
    },
    [imageCenter.x, imageCenter.y, removeSquareById]
  );

  // Track mouse & draw drip when holding
  useEffect(() => {
    const onMove = (e: PointerEvent | MouseEvent) => {
      const x = e.clientX ?? 0;
      const y = e.clientY ?? 0;
      setMousePosition({ x, y });

      if (isMouseDownRef.current) {
        const dx = x - lastRevealPosition.current.x;
        const dy = y - lastRevealPosition.current.y;
        if (Math.hypot(dx, dy) >= revealDistance) {
          revealSquareAtPosition(x, y);
          lastRevealPosition.current = { x, y };
        }
      }
    };

    const onDown = (e: PointerEvent | MouseEvent) => {
      isMouseDownRef.current = true;
      const x = e.clientX ?? 0;
      const y = e.clientY ?? 0;

      if (revealedRef.current.length === 0) {
        setCurrentImageIndex((i) => (i + 1) % images.length);
      }
      revealSquareAtPosition(x, y);
      lastRevealPosition.current = { x, y };

      // Drip evenly when holding
      const tick = () => revealSquareAtPosition(mousePosition.x, mousePosition.y);
      revealInterval.current = setInterval(tick, 150);
    };

    const onUp = () => {
      isMouseDownRef.current = false;
      if (revealInterval.current) {
        clearInterval(revealInterval.current);
        revealInterval.current = null;
      }
    };

    // Save current mouse position for drip
    const mousePositionRef = { current: { x: 0, y: 0 } } as { current: { x: number; y: number } };
    const track = (e: MouseEvent) => {
      mousePositionRef.current.x = e.clientX ?? 0;
      mousePositionRef.current.y = e.clientY ?? 0;
    };

    const onClick = (e: MouseEvent) => {
      if (!isMouseDownRef.current) {
        if (revealedRef.current.length === 0) {
          setCurrentImageIndex((i) => (i + 1) % images.length);
        }
        revealSquareAtPosition(e.clientX, e.clientY);
      }
    };

    document.addEventListener("pointermove", onMove);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("pointerup", onUp);
    document.addEventListener("mousemove", track);
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("pointerup", onUp);
      document.removeEventListener("mousemove", track);
      document.removeEventListener("click", onClick);
      if (revealInterval.current) clearInterval(revealInterval.current);
    };
  }, [images.length, revealSquareAtPosition, mousePosition.x, mousePosition.y]);

  // Cleanup all timeout when unmount
  useEffect(() => {
    return () => {
      revealedRef.current.forEach((s) => clearTimeout(s.timeoutId));
    };
  }, []);

  // Parallax + scale feedback
  const [prevPos, setPrevPos] = useState(mousePosition);
  const [speed, setSpeed] = useState(0);
  useEffect(() => {
    const dx = mousePosition.x - prevPos.x;
    const dy = mousePosition.y - prevPos.y;
    const v = Math.min(40, Math.hypot(dx, dy));
    setSpeed(v);
    setPrevPos(mousePosition);
  }, [mousePosition, prevPos.x, prevPos.y]);

  const parallaxX = (mousePosition.x - window.innerWidth / 2) * -0.01;
  const parallaxY = (mousePosition.y - window.innerHeight / 2) * -0.01;

  const clearRevealed = useCallback(() => {
    revealedRef.current.forEach((s) => clearTimeout(s.timeoutId));
    setRevealedSquares([]);
    squareCounter.current = 0;
    lastRevealPosition.current = { x: 0, y: 0 };
    setCurrentImageIndex(0);
  }, []);

  return (
    <div ref={containerRef} className="app-root">
      {/* Black background */}
      <div className="bg-black-layer" />

      {/* Background image parallax */}
      <div
        className="backdrop"
        style={{
          backgroundImage: `url('${currentImage}')`,
          transform: `translate3d(${parallaxX}px, ${parallaxY}px, 0)`,
        }}
      />

      {/* Yellow block (image area) */}
      <div
        className="image-panel"
        style={{
          left: imageCenter.x,
          top: imageCenter.y,
          width: imageWidth,
          height: imageHeight,
        }}
      >
        <div className="image-panel-header">
          <div className="brand">Area</div>
        </div>
        <div className="image-panel-body" />
      </div>

      {/* Squares revealed */}
      {revealedSquares.map((square) => {
        const bgX = -(square.x - imageCenter.x);
        const bgY = -(square.y - imageCenter.y);
        return (
          <div
            key={square.id}
            className="reveal-square"
            style={{
              left: square.x,
              top: square.y,
              width: squareSize,
              height: squareSize,
              backgroundImage: `url('${currentImage}')`,
              backgroundPosition: `${bgX}px ${bgY}px`,
              backgroundSize: `${imageWidth}px ${imageHeight}px`,
              transform: `scale(${1 + Math.min(12, speed) / 100})`,
            }}
          />
        );
      })}

      {/* HUD */}
      <div className="hud">
        <div>Click or hold to reveal the image (pixel mask)</div>
        <div className="hud-sub">
          ⚡ Disappear after 1s • Image: {imageWidth}×{imageHeight}px
        </div>
        <div className="hud-sub">
          🎨 Current image: {currentImageIndex + 1}/{images.length}
        </div>
        <button onClick={clearRevealed} className="btn">
          Clear All
        </button>
        <div className="hud-sub">Active squares: {revealedSquares.length}</div>
      </div>
    </div>
  );
}
