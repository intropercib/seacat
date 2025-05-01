import { X } from "lucide-react";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const SideBar = ({ isOpen, onClose, children }) => {
  const sidebarRef = useRef(null);

  useEffect(() => {
    const sidebarElement = sidebarRef.current;
    if (!sidebarElement) return;

    gsap.to(sidebarElement, {
      x: isOpen ? "0%" : "100%",
      duration: 0.8,
      ease: "power2.inOut",
    });
  }, [isOpen]);

  return (
    <div
      ref={sidebarRef}
      className={`sidebar-scroll-container h-screen w-[300px] bg-[#000000] text-white overflow-y-auto fixed top-0 right-0 p-4 transform z-[60] ${isOpen ? 'translate-x-0' : 'translate-x-full invisible'}`}
      style={{ willChange: 'transform', transform: 'translateX(100%)' }}
    >
      <div className="flex justify-end mb-4">
        <X
          className="h-6 w-6 cursor-pointer hover:text-gray-400"
          onClick={onClose}
        />
      </div>
      <div className="text-white">
        {children}
      </div>
    </div>
  );
};

export default SideBar;
