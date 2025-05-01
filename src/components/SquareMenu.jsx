import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import squareImg from "../assets/hot-point-color-removebg-preview.png";
import { Plus } from "lucide-react";

const SquareMenu = ({ isVisible, rotation = 0 }) => { 
  const squareRef = useRef(null);
  const tween = useRef(null);

  useEffect(() => {
    const element = squareRef.current;
    if (!element) return;

    gsap.set(element, { scale: 0 , duration:0.8});

    tween.current = gsap.to(element, {
      scale: 1,
      duration: 0.8, 
      ease: "power1.out",
      paused: true,
    });

    return () => {
      tween.current?.kill();
    };
  }, []);

  useEffect(() => {
    const animation = tween.current;
    if (animation) {
      if (isVisible) {
        animation.timeScale(1);
        animation.play(0);
      } else {
        animation.timeScale(1); 
        animation.reverse();
      }
    }
  }, [isVisible]);

  return (
    <>
      <div
        ref={squareRef}
        className="relative inline-block h-[100px] group cursor-pointer"
        style={{ transform: `rotate(${rotation}deg)` }} 
      >
        <img src={squareImg} alt="square" className="h-full w-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Plus className="magnetic-target-plus h-[30px] w-auto text-[#646060] transition-colors duration-300 ease-in-out group-hover:text-white" />
        </div>
      </div>
    </>
  );
};

export default SquareMenu;
