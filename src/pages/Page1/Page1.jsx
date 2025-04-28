import React, { useEffect, useRef, useState } from "react";
import "./Page1.css";
import title from "../../assets/section-title-2.png";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Page1 = () => {
  const circularRef = useRef(null);
  const bubblesRef = useRef([]);
  const shaderRef = useRef(null);
  const scrollOptionRef = useRef(null);
  const pageContentRef = useRef(null);

  useEffect(() => {
    if (!circularRef.current) return;
    gsap.set(circularRef.current, { y: -10 });
    gsap.to(circularRef.current, {
      y: 10,
      duration: 2,
      repeat: -1,
      ease: "back",
    });
  }, []);

  useEffect(() => {
    if (!shaderRef.current) return;

    bubblesRef.current.forEach((bubble) => {
      if (!bubble) return;

      const initialLeft = Math.random() * 80 + 10;
      const initialTop = Math.random() * 80 + 10;

      gsap.set(bubble, {
        left: `${initialLeft}%`,
        top: `${initialTop}%`,
      });

      const animateBubble = () => {
        const newLeft = Math.random() * 80 + 10;
        const newTop = Math.random() * 80 + 10;
        const duration = 2 + Math.random() * 3;

        gsap.to(bubble, {
          left: `${newLeft}%`,
          top: `${newTop}%`,
          duration: duration,
          ease: "sine.inOut",
          onComplete: animateBubble,
        });
      };

      animateBubble();
    });

    return () => {
      bubblesRef.current.forEach((bubble) => {
        if (bubble) gsap.killTweensOf(bubble);
      });
    };
  }, []);

  useEffect(() => {
    if (!scrollOptionRef.current) return;

    const initialTween = gsap.fromTo(
      scrollOptionRef.current,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.5, ease: "power2.out" }
    );

    if (pageContentRef.current) {
      const scrollTrigger = ScrollTrigger.create({
        trigger: pageContentRef.current,
        start: "top 10%",
        end: "top 20%",
        scrub: 0.5,
        animation: gsap.to(scrollOptionRef.current, {
          y: -50,
          opacity: 0,
          ease: "power1.in",
        }),
      });

      return () => {
        initialTween.kill();
        scrollTrigger.kill();
      };
    }

    return () => {
      initialTween.kill();
    };
  }, []);

  return (
    <div className="page1-content" ref={pageContentRef}>
      <div className="title">
        <img src={title} alt="seacat" />
        <div className="shader" ref={shaderRef}>
          {[...Array(10)].map((_, index) => (
            <div
              key={index}
              className={`bubble bubble${index + 1}`}
              ref={(el) => (bubblesRef.current[index] = el)}
            ></div>
          ))}
        </div>
      </div>
      <div className="scrollOption" ref={scrollOptionRef}>
        <div className="dot" ref={circularRef}></div>
        <p className="scrollTitle">Scroll down and hop on board</p>
      </div>
    </div>
  );
};

export default Page1;
