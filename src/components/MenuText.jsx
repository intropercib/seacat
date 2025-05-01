import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

const splitTextIntoSpans = (text) => {
  return text.split("").map((char, index) => (
    <span
      key={index}
      className="char inline-block"
      style={{ whiteSpace: "pre" }}
    >
      {char}
    </span>
  ));
};

const MenuText = ({
  isVisible,
  containerClassName = "",
  title = "Electric Mode", 
  subtitle = "Pure Adventure" 
}) => {
  const containerRef = useRef(null);
  const h3Ref = useRef(null);
  const h1Ref = useRef(null);
  const tl = useRef(null);

  useEffect(() => {
    const elContainer = containerRef.current; 
    const elH3 = h3Ref.current;
    const elH1 = h1Ref.current;
    const charsH3 = gsap.utils.toArray(elH3.querySelectorAll(".char"));
    const charsH1 = gsap.utils.toArray(elH1.querySelectorAll(".char"));

    if (!charsH3.length && !charsH1.length) return;

    gsap.set([...charsH3, ...charsH1], { opacity: 0, y: 20 });

    tl.current = gsap.timeline({ paused: true });

    if (charsH3.length > 0) {
      tl.current.to(charsH3, {
        opacity: 1,
        y: 0,
        duration: 0.6, 
        stagger: 0.05, 
      });
    }
    if (charsH1.length > 0) {
      tl.current.to(
        charsH1,
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.05 }, 
        charsH3.length > 0 ? "-=0.6" : 0 
      );
    }

    return () => {
      tl.current?.kill();
    };
  }, []); 
  
  useEffect(() => {
    const timeline = tl.current;
    if (timeline) {
      if (isVisible) {
        timeline.timeScale(1); 
        timeline.play(0);
      } else {
        timeline.timeScale(1); 
        timeline.reverse();
      }
    }
  }, [isVisible]);

  return (
    <div ref={containerRef} className={`overflow-hidden ${containerClassName} uppercase`}>
      <h3
        ref={h3Ref}
        className="text-xl leading-none text-neutral-700 font-semibold"
        aria-label={title} 
      >
        {splitTextIntoSpans(title)}
      </h3>
      <h1
        ref={h1Ref}
        className="text-4xl font-bold"
        aria-label={subtitle} 
      >
        {splitTextIntoSpans(subtitle)} 
      </h1>
    </div>
  );
};

export default MenuText;
