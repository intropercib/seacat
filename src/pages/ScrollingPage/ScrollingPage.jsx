import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./ScrollingPage.css";

const getVideoSource = (dir, page) => {
  switch (page) {
    case 1:
      return dir === "up"
        ? "/src/assets/vdo1rev.webm"
        : "/src/assets/vdo1.webm";
    case 2:
      return dir === "up"
        ? "/src/assets/vdo2rev.webm"
        : "/src/assets/vdo2.webm";
    case 3:
      return dir === "up"
        ? "/src/assets/vdo3rev.webm"
        : "/src/assets/vdo3.webm";
    case 4:
      return dir === "up"
        ? "/src/assets/vdo4rev.webm"
        : "/src/assets/vdo4.webm";
    case 5:
      return dir === "up"
        ? "/src/assets/vdo5rev.webm"
        : "/src/assets/vdo5.webm";
    case 6:
      return dir === "up"
        ? "/src/assets/vdo6rev.webm"
        : "/src/assets/vdo6.webm";
    case 7:
      return dir === "up"
        ? "/src/assets/vdo7rev.webm"
        : "/src/assets/vdo7.webm";
    case 8:
      return "/src/assets/vdo8.webm";
    case 9:
      return "/src/assets/vdo9.webm";
    case 10:
      return null;
    default:
      return "/src/assets/vdo1.webm";
  }
};

function ScrollingPage({
  direction = "down",
  isTransitioning,
  pageNumber,
  currentPageContent,
}) {
  const [contentState, setContentState] = useState({
    current: currentPageContent,
    previous: null,
  });
  const [videoSrc, setVideoSrc] = useState(() =>
    getVideoSource(direction, pageNumber)
  );
  const currentContentRef = useRef(null);
  const previousContentRef = useRef(null);
  const videoRef = useRef(null);
  useEffect(() => {
    setContentState((prevState) => ({
      current: currentPageContent,
      previous: prevState.current,
    }));
  }, [currentPageContent]);

  useEffect(() => {
    if (isTransitioning) {
      const newSrc = getVideoSource(direction, pageNumber);
      if (
        newSrc &&
        videoRef.current &&
        videoRef.current.src !== new URL(newSrc, window.location.origin).href
      ) {
        setVideoSrc(newSrc);
      }
    }
  }, [isTransitioning, pageNumber, direction]);

  useEffect(() => {
    const prevEl = previousContentRef.current;
    const currEl = currentContentRef.current;

    if (!isTransitioning && currEl) {
      gsap.set(currEl, { opacity: 1, zIndex: 2 });
      if (prevEl) {
        gsap.set(prevEl, { opacity: 0, zIndex: 1 });
      }
      return;
    }

    if (isTransitioning && prevEl && currEl) {
      gsap.set(prevEl, { opacity: 1, zIndex: 1 });
      gsap.set(currEl, { opacity: 0, zIndex: 2 });

      const animationDuration = 0.7;

      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(prevEl, { opacity: 0 });
        },
      });

      tl.to(
        prevEl,
        {
          opacity: 0.5,
          duration: animationDuration * 0.6,
          ease: "power1.inOut",
        },
        0
      )
        .to(
          prevEl,
          {
            opacity: 0,
            duration: animationDuration * 0.4,
            ease: "power1.inOut",
          },
          animationDuration * 0.6
        )
        .to(
          currEl,
          {
            opacity: 1,
            duration: animationDuration,
            ease: "power1.inOut",
          },
          0
        );
    }
  }, [isTransitioning, contentState]);
  return (
    <div className="page">
      <video
        ref={videoRef}
        key={videoSrc}
        className="background-video"
        autoPlay
        muted
        playsInline
        src={videoSrc}
      >
        Your browser does not support the video tag.
      </video>
      <div className="page-content-wrapper">
        {contentState.previous && (
          <div
            ref={previousContentRef}
            className="page-content previous-content"
            key={`prev-${contentState.previous?.type?.name || "prev"}`}
          >
            {contentState.previous}
          </div>
        )}
        {contentState.current && (
          <div
            ref={currentContentRef}
            className="page-content current-content"
            key={`curr-${contentState.current?.type?.name || "curr"}`}
          >
            {contentState.current}
          </div>
        )}
      </div>
    </div>
  );
}

export default ScrollingPage;
