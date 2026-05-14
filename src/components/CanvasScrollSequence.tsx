"use client";

import { MotionValue, useMotionValueEvent } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface CanvasScrollSequenceProps {
  progress: MotionValue<number>;
}

export default function CanvasScrollSequence({ progress }: CanvasScrollSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const frameCount = 240;
  const lastDrawnFrame = useRef<number>(-1);

  useEffect(() => {
    // Preload images
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      const frameNum = i.toString().padStart(3, "0");
      img.src = `/frames/ezgif-frame-${frameNum}.jpg`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === frameCount) {
          setImages(loadedImages);
          handleResize();
          drawFrame(1, loadedImages);
        }
      };
      loadedImages.push(img);
    }

    const handleResize = () => {
      if (!canvasRef.current) return;
      const canvas = canvasRef.current;
      const dpr = window.devicePixelRatio || 1;
      
      // Enforce 4K-ready internal resolution for crispness on high-end screens
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      
      if (images.length === frameCount && lastDrawnFrame.current !== -1) {
        drawFrame(lastDrawnFrame.current, images);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [images.length]);

  const drawFrame = (frameIndex: number, imgs: HTMLImageElement[]) => {
    if (!canvasRef.current || imgs.length === 0) return;
    const ctx = canvasRef.current.getContext("2d", { alpha: false });
    if (!ctx) return;

    const img = imgs[frameIndex - 1];
    if (!img) return;

    const canvas = canvasRef.current;
    lastDrawnFrame.current = frameIndex;

    // Premium image processing
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    
    // Applying cinematic color grading and sharpening to improve perceived quality
    // This helps hide compression artifacts in low-res source images
    ctx.filter = "contrast(1.1) saturate(1.1) brightness(1.05)";

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    const canvasRatio = canvasWidth / canvasHeight;
    const imgRatio = img.width / img.height;

    let drawWidth, drawHeight, offsetX, offsetY;

    if (canvasRatio > imgRatio) {
      drawWidth = canvasWidth;
      drawHeight = canvasWidth / imgRatio;
      offsetX = 0;
      offsetY = (canvasHeight - drawHeight) / 2;
    } else {
      drawWidth = canvasHeight * imgRatio;
      drawHeight = canvasHeight;
      offsetX = (canvasWidth - drawWidth) / 2;
      offsetY = 0;
    }

    // Draw solid base
    ctx.fillStyle = "#050505";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    
    // Draw the product frame
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    
    // Reset filter for any subsequent draws
    ctx.filter = "none";
  };

  useMotionValueEvent(progress, "change", (latest) => {
    if (images.length === frameCount) {
      const frameIndex = Math.min(
        frameCount,
        Math.max(1, Math.ceil(latest * frameCount))
      );
      
      if (frameIndex !== lastDrawnFrame.current) {
        requestAnimationFrame(() => drawFrame(frameIndex, images));
      }
    }
  });

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none -z-10 bg-[#050505] overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ width: "100%", height: "100%" }}
      />
      
      {/* Cinematic Film Grain Overlay to mask compression and give a high-end feel */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
      
      {/* Sophisticated radial vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(5,5,5,0.9)_100%)] pointer-events-none" />
      
      {/* Deep bottom fade */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80" />
    </div>
  );
}


