import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import MenuText from "./MenuText";
import SquareMenu from "./SquareMenu";

const CenterMenu = ({
  onOpenSidebar,
  isSidebarOpen,
  squareRotation,
  menuTextContainerClassName,
  menuTitle,
  menuSubtitle
}) => {
  const containerRef = useRef(null);
  const isVisible = !isSidebarOpen;

  useEffect(() => {
    const container = containerRef.current;
    const plusIcon = container?.querySelector(".magnetic-target-plus");

    if (!container || !plusIcon) return;
    const ease = 0.3; 
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(container, {
        x: x * 0.1, 
        y: y * 0.1,
        ease: "power2.out",
        duration: ease,
      });

      gsap.to(plusIcon, {
        x: x * 0.3, 
        y: y * 0.3,
        ease: "power2.out",
        duration: ease,
      });
    };

    const resetPosition = () => {
      gsap.to(container, {
        x: 0,
        y: 0,
        ease: "power2.out",
        duration: 0.4,
      });
      gsap.to(plusIcon, {
        x: 0,
        y: 0,
        ease: "power2.out",
        duration: 0.4,
      });
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", resetPosition);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", resetPosition);
      gsap.killTweensOf(container);
      gsap.killTweensOf(plusIcon);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative cursor-pointer"
      onClick={onOpenSidebar}
    >
      <div className={`absolute text-nowrap pointer-events-none ${menuTextContainerClassName || '-top-12 left-[80px]'}`}>
        <MenuText
          isVisible={isVisible}
          title={menuTitle}
          subtitle={menuSubtitle}
        />
      </div>
      <SquareMenu isVisible={isVisible} rotation={squareRotation} />
    </div>
  );
};

export default CenterMenu;
