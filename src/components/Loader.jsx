import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import logo from "../assets/logo-seacat.png";
import line from "../assets/menu-line.png";

const LoadingScreen = ({ onLoadingComplete }) => {
  const logoLineRef = useRef(null);
  const logoContentRef = useRef(null);
  const logoContent2Ref = useRef(null);
  const loadingLineRef = useRef(null);
  const loadingScreenRef = useRef(null);

  const handleStartClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!loadingScreenRef.current) return;

    gsap.set(logoContent2Ref.current, { pointerEvents: "none" });

    gsap.to(loadingScreenRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: "power1.in",
      onComplete: onLoadingComplete,
    });
  };

  useEffect(() => {
    let i = 0;
    const tl1 = gsap.timeline();

    const interval = setInterval(() => {
      i++;
      if (i >= 100) {
        tl1.to(logoContentRef.current, {
          y: -10,
          delay: 0.7,
          opacity: 0,
        });

        setTimeout(() => {
          if (logoContent2Ref.current && loadingLineRef.current) {
            logoContent2Ref.current.style.display = "block";
            loadingLineRef.current.style.display = "block";

            gsap.set(logoContent2Ref.current, { pointerEvents: "auto" });

            tl1.to(logoContent2Ref.current, {
              y: -12,
              delay: 0.7, 
              opacity: 0.5,
            });

            gsap.to(loadingLineRef.current, {
              width: "175px",
              delay: 0.7,
              opacity: 0.8,
            });
          }
        }, 600);

        clearInterval(interval);
      }

      if (logoContentRef.current) {
        logoContentRef.current.textContent = `${i}%`;
      }
      if (logoLineRef.current) {
        logoLineRef.current.style.left = `${-100 + i}%`;
        logoLineRef.current.style.opacity = 1 - i / 100;
      }
    }, 60);

    const handleHover = (hover) => {
      if (loadingLineRef.current) {
        loadingLineRef.current.style.opacity = hover ? 0.5 : 0.8;
      }
      if (logoContent2Ref.current) {
        logoContent2Ref.current.style.opacity = hover ? 1 : 0.5;
      }
    };

    const loadingLineEl = loadingLineRef.current;
    const logoContent2El = logoContent2Ref.current;

    if (loadingLineEl) {
      loadingLineEl.addEventListener("mouseover", () => handleHover(true));
      loadingLineEl.addEventListener("mouseout", () => handleHover(false));
    }
    if (logoContent2El) {
      logoContent2El.addEventListener("mouseover", () => handleHover(true));
      logoContent2El.addEventListener("mouseout", () => handleHover(false));
      logoContent2El.addEventListener("click", handleStartClick);
      logoContent2El.addEventListener("touchstart", handleStartClick, {
        passive: false,
      });
    }

    return () => {
      clearInterval(interval);
      if (loadingLineEl) {
        loadingLineEl.removeEventListener("mouseover", () => handleHover(true));
        loadingLineEl.removeEventListener("mouseout", () => handleHover(false));
      }
      if (logoContent2El) {
        logoContent2El.removeEventListener("mouseover", () =>
          handleHover(true)
        );
        logoContent2El.removeEventListener("mouseout", () =>
          handleHover(false)
        );
        logoContent2El.removeEventListener("click", handleStartClick);
        logoContent2El.removeEventListener("touchstart", handleStartClick);
      }
      tl1.kill();
      gsap.killTweensOf([
        logoContentRef.current,
        logoContent2Ref.current,
        loadingLineRef.current,
        loadingScreenRef.current,
      ]);
    };
  }, [onLoadingComplete]);

  return (
    <div
      ref={loadingScreenRef}
      className="h-screen w-screen bg-black overflow-hidden text-white"
    >
      <div className="h-full w-full flex flex-col items-center justify-center">
        <div className="relative">
          <img
            src={logo}
            alt="Logo"
            className="h-[155px] w-[155px] object-contain"
          />
          <img
            ref={logoLineRef}
            src={line}
            alt="Line"
            className="w-[200px] h-[0.2rem] absolute top-[43.5%] opacity-0"
          />
          <p
            ref={logoContentRef}
            className="absolute bottom-[6%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[0.8rem] font-extrabold"
          >
            0%
          </p>
          <div className="relative">
            <a
              ref={logoContent2Ref}
              href="#"
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[12px] uppercase text-nowrap opacity-0 transition-opacity duration-500 cursor-pointer pointer-events-none"
              style={{ display: "none" }}
            >
              Start Experience
            </a>

            <div
              ref={loadingLineRef}
              className="absolute -top-[10px] left-1/2 -translate-x-1/2 -translate-y-1/2 h-[2px] w-1 bg-white/80 opacity-30 cursor-pointer"
              style={{ display: "none" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
