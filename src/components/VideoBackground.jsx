import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const VideoBackground = ({ videoSrc, isSidebarOpen, pageNumber }) => {
  const videoRef = useRef(null);
  
  useEffect(() => {
    if (videoRef.current) {
      gsap.to(videoRef.current, {
        x: isSidebarOpen ? -300 : 0, 
        duration: 0.8, 
        ease: "power2.inOut",
      });
    }
  }, [isSidebarOpen]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.loop = (pageNumber === 8);
    }
  }, [pageNumber, videoSrc]);

  if (!videoSrc) return null;

  return (
    <video
      ref={videoRef}
      key={videoSrc} 
      className="background-video absolute top-0 left-0 h-[100%] w-[100%] object-cover opacity-100"
      autoPlay
      muted
      playsInline 
      src={videoSrc}
      style={{ willChange: 'transform' }} 
    />
  );
};

export default VideoBackground;