"use client";

import { useRef, useEffect, useState } from "react";
import { useScroll, useTransform, motion, useMotionValueEvent } from "framer-motion";

interface ImageSequenceProps {
  frameCount: number;
  imageFolder: string;
  imagePrefix: string;
  imageExtension: string;
}

export default function ImageSequence({
  frameCount,
  imageFolder,
  imagePrefix,
  imageExtension,
}: ImageSequenceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Load all images
  useEffect(() => {
    let loadedCount = 0;
    const imgArray: HTMLImageElement[] = [];

    for (let i = 1; i <= frameCount; i++) {
        const img = new Image();
        // pad with zeros: e.g., 001, 010, 100
        const paddedIndex = i.toString().padStart(3, '0');
        img.src = `${imageFolder}/${imagePrefix}${paddedIndex}${imageExtension}`;
        img.onload = () => {
            loadedCount++;
            if (loadedCount === frameCount) {
                setLoaded(true);
            }
        };
        imgArray.push(img);
    }
    setImages(imgArray);
  }, [frameCount, imageFolder, imagePrefix, imageExtension]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Map scroll progress (0..1) to frame index (0..frameCount-1)
  const currentIndex = useTransform(scrollYProgress, [0, 1], [0, frameCount - 1]);

  useMotionValueEvent(currentIndex, "change", (latest) => {
    if (!loaded || !canvasRef.current) return;
    
    // Round to get the nearest integer frame
    const frameIndex = Math.min(
        frameCount - 1, 
        Math.max(0, Math.round(latest))
    );
    
    const context = canvasRef.current.getContext("2d");
    if (!context) return;
    
    const img = images[frameIndex];
    if(img){
        // clear canvas
        context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        
        // Calculate dynamic fit (cover or contain based on your need, here we'll cover)
        const canvasRatio = canvasRef.current.width / canvasRef.current.height;
        const imgRatio = img.width / img.height;
        let drawWidth, drawHeight, offsetX = 0, offsetY = 0;

        if (imgRatio > canvasRatio) {
            drawHeight = canvasRef.current.height;
            drawWidth = img.width * (drawHeight / img.height);
            offsetX = (canvasRef.current.width - drawWidth) / 2;
        } else {
            drawWidth = canvasRef.current.width;
            drawHeight = img.height * (drawWidth / img.width);
            offsetY = (canvasRef.current.height - drawHeight) / 2;
        }
        
        context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    }
  });

  return (
    <div ref={containerRef} className="relative h-[300vh] w-full bg-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {!loaded && (
           <div className="absolute inset-0 flex items-center justify-center z-20 bg-black">
              <div className="text-blue-500 font-mono text-sm tracking-widest animate-pulse flex flex-col items-center gap-4">
                  <div className="w-12 h-12 border-b-2 border-blue-500 rounded-full animate-spin"></div>
                  BUFFERING 3D ASSETS...
              </div>
           </div>
        )}
        <canvas 
          ref={canvasRef} 
          width={1920} 
          height={1080} 
          className="w-full h-full object-cover transform-gpu hardware-acceleration opacity-90 mix-blend-screen"
        />
        
        {/* Overlay Gradients & HUD Grid */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/50 z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-grid-white opacity-5 z-10 pointer-events-none" />
        
        {/* HUD Crosshairs */}
        <div className="absolute inset-4 z-20 pointer-events-none border border-white/[0.03] hidden md:block">
           <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-white/20" />
           <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-white/20" />
           <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-white/20" />
           <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-white/20" />
           
           <div className="absolute top-1/2 left-0 -translate-y-1/2 w-4 h-px bg-white/10" />
           <div className="absolute top-1/2 right-0 -translate-y-1/2 w-4 h-px bg-white/10" />
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-4 bg-white/10" />
           <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-4 bg-white/10" />
           
           <div className="absolute top-4 left-4 text-[10px] font-mono text-gray-500 tracking-widest leading-none">
             LAT: 28.6139<br/>LNG: 77.2090
           </div>
           <div className="absolute bottom-4 right-4 text-[10px] font-mono text-gray-500 tracking-widest text-right leading-none">
             SYS.ON<br/>SECURE
           </div>
        </div>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center z-30 pointer-events-none p-4">
           <motion.div 
             style={{
               opacity: useTransform(scrollYProgress, [0, 0.2, 0.4], [1, 1, 0]),
               scale: useTransform(scrollYProgress, [0, 0.2], [1, 0.9])
             }}
             className="text-center"
           >
             <div className="inline-flex items-center gap-2 px-3 py-1 bg-black/40 border border-white/10 text-gray-300 text-[10px] font-mono font-bold tracking-[0.2em] uppercase mb-8 backdrop-blur-md">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full bg-white opacity-75"></span>
                  <span className="relative inline-flex h-1.5 w-1.5 bg-white"></span>
                </span>
                SYSTEM ACTIVE
             </div>
             <h1 className="text-5xl md:text-8xl lg:text-9xl font-mono font-black tracking-tighter uppercase mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-600 drop-shadow-2xl">
                 CORE.SYSTEM
             </h1>
             <p className="mt-4 text-sm md:text-base text-gray-400 max-w-2xl mx-auto font-mono uppercase tracking-[0.3em]">
                Scroll to explore the architecture of modern location security.
             </p>
           </motion.div>
        </div>
      </div>
    </div>
  );
}
