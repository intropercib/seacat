import React, { useEffect, useRef } from "react";
import "./Page2.css";
import square from "../../assets/hot-point-color-removebg-preview.png";
import { Plus } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const splitText = (text) => text.split("").map((char, i) => (
  <span key={i} className="letter">{char === " " ? "\u00A0" : char}</span>
));

const Page2 = ({ pageNumber }) => {
  const imageRef = useRef(null);
  const h3Ref = useRef(null);
  const h1Ref = useRef(null);
  const containerRef = useRef(null);
  const tl = useRef();

  useEffect(() => {
    tl.current = gsap.timeline({ paused: true });
    tl.current.fromTo(
      imageRef.current,
      { scale: 0.7, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.7, ease: "power3.out" }
    );
    tl.current.fromTo(
      h3Ref.current.querySelectorAll(".letter"),
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.04, duration: 0.5, ease: "power2.out" },
      "-=0.3"
    );
    tl.current.fromTo(
      h1Ref.current.querySelectorAll(".letter"),
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.04, duration: 0.7, ease: "power2.out" },
      "-=0.3"
    );
    return () => {
      tl.current && tl.current.kill();
    };
  }, []);

  useEffect(() => {
    if (tl.current) {
      if (pageNumber === 2) {
        tl.current.play();
      } else {
        tl.current.reverse();
      }
    }
  }, [pageNumber]);

  return (
    <div className="page2-content">
      <div className="container" ref={containerRef}>
        <div className="square">
          <img src={square} alt="square" ref={imageRef} />
          <Plus className="plus" />
        </div>
        <div className="content">
          <h3 ref={h3Ref}>{splitText("ELECTRIC MODE")}</h3>
          <h1 ref={h1Ref}>{splitText("PURE ADVENTURE")}</h1>
        </div>
      </div>
    </div>
  );
};

export default Page2;
