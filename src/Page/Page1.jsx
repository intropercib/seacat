import React, { useEffect, useRef } from "react";
import title from "../assets/section-title-2.png";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Page1 = () => {
  const circularRef = useRef(null);
  const bubblesRef = useRef([]);
  const shaderRef = useRef(null);
  const scrollOptionRef = useRef(null);
  const pageContentRef = useRef(null);
  const titleContainerRef = useRef(null); 

  useEffect(() => {
    if (!circularRef.current) return;
    gsap.set(circularRef.current, { y: -10 });
    const tween = gsap.to(circularRef.current, {
      y: 10,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
    return () => tween.kill();
  }, []);

  useEffect(() => {
    if (!shaderRef.current) return;

    const tweens = bubblesRef.current
      .map((bubble) => {
        if (!bubble) return null;

        const initialLeft = Math.random() * 80 + 10;
        const initialTop = Math.random() * 80 + 10;

        gsap.set(bubble, {
          left: `${initialLeft}%`,
          top: `${initialTop}%`,
          scale: 0.5 + Math.random() * 0.5,
          opacity: 0.3 + Math.random() * 0.4,
        });

        let currentTween;

        const animateBubble = () => {
          const newLeft = Math.random() * 80 + 10;
          const newTop = Math.random() * 80 + 10;
          const duration = 6 + Math.random() * 8;
          const scale = 0.5 + Math.random() * 0.5;
          const opacity = 0.3 + Math.random() * 0.4;

          currentTween = gsap.to(bubble, {
            left: `${newLeft}%`,
            top: `${newTop}%`,
            scale: scale,
            opacity: opacity,
            duration: duration,
            ease: "sine.inOut",
            onComplete: animateBubble,
          });
        };

        animateBubble();
        return currentTween;
      })
      .filter(Boolean);

    return () => {
      tweens.forEach((tween) => tween?.kill());
      bubblesRef.current.forEach((bubble) => {
        if (bubble) gsap.killTweensOf(bubble);
      });
    };
  }, []);

  useEffect(() => {
    if (!scrollOptionRef.current || !pageContentRef.current) return;

    const initialTween = gsap.fromTo(
      scrollOptionRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, delay: 1.0, ease: "power2.out" }
    );

    const scrollTriggerInstance = ScrollTrigger.create({
      trigger: pageContentRef.current,
      start: "top top",
      end: "top -20%",
      scrub: 1,
      animation: gsap.to(scrollOptionRef.current, {
        y: -30,
        opacity: 0,
        ease: "power1.in",
      }),
      invalidateOnRefresh: true,
    });

    return () => {
      initialTween.kill();
      scrollTriggerInstance.kill();
    };
  }, []);

  useEffect(() => {
    if (!titleContainerRef.current) return;

    gsap.fromTo(
      titleContainerRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1.8,
        ease: "power2.out",
        delay: 0.5,
      }
    );
  }, []);

  return (
    <div
      className="relative flex h-full w-full flex-col items-center justify-center text-center text-white"
      ref={pageContentRef}
    >
      <div className="relative" ref={titleContainerRef}>
        <img
          src={title}
          alt="seacat"
          className="relative h-[150px] mix-blend-multiply"
        />
        <div className="absolute top-0 left-0 h-full w-full" ref={shaderRef}>
          {[...Array(10)].map((_, index) => (
            <div
              key={index}
              className="absolute h-5 w-5 rounded-full bg-black/30 shadow-lg shadow-black/80 shadow-inset-sm"
              ref={(el) => (bubblesRef.current[index] = el)}
            ></div>
          ))}
        </div>
      </div>

      <div
        className="absolute bottom-[90px] flex cursor-pointer items-center gap-2.5"
        ref={scrollOptionRef}
        style={{ opacity: 0 }}
      >
        <div
          className="h-2 w-2 rounded-full bg-gray-400"
          ref={circularRef}
        ></div>
        <p className="text-sm font-bold">Scroll down and hop on board</p>
      </div>
    </div>
  );
};

export default Page1;
