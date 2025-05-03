import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import vdo8 from "/src/assets/vdo8.webm";
import vdo8_1 from "/src/assets/vdo8.1.webm";
import vdo8_2 from "/src/assets/vdo8.2.webm";

const Page8 = () => {
  const [activeTab, setActiveTab] = useState(0);
  const tabsContainerRef = useRef(null);
  const tabContentRefs = useRef([]);

  const tabContents = [
    {
      title: "Full Electric Mode",
      description:
        "Experience silent cruising and zero emissions. Ideal for short trips and enjoying the tranquility of the sea.",
      videoSrc: vdo8,
    },
    {
      title: "Diesel Electric Mode",
      description:
        "Optimized for longer journeys, balancing efficiency and power. Reduces fuel consumption compared to traditional diesel engines.",
      videoSrc: vdo8_1,
    },
    {
      title: "Hibernation Mode",
      description:
        "Minimizes energy consumption when docked, turning the yacht into a power source. Sell excess energy back to the grid or power a villa.",
      videoSrc: vdo8_2,
    },
  ];

  const handleTabClick = (index) => {
    if (index !== activeTab) {
      setActiveTab(index);
    }
  };

  const updateBackgroundVideo = (videoSrc) => {
    const videoElement = document.querySelector(".background-video");
    if (videoElement && videoSrc) {
      const absoluteVideoSrc = new URL(videoSrc, window.location.href).href;
      if (videoElement.currentSrc !== absoluteVideoSrc) {
        videoElement.src = videoSrc;
        videoElement.loop = true;
        videoElement.load();
        videoElement.play();
      }
    } 
  };

  useEffect(() => {
    const container = tabsContainerRef.current;
    const activeTabElement = tabContentRefs.current[activeTab];
    const newVideoSrc = tabContents[activeTab]?.videoSrc;

    if (container && activeTabElement) {
      const containerRect = container.getBoundingClientRect();
      const activeTabRect = activeTabElement.getBoundingClientRect();
      const targetX = -(activeTabRect.left - containerRect.left);

      gsap.to(container, {
        x: targetX,
        duration: 0.7,
        ease: "power3.inOut",
      });
    }

    if (newVideoSrc) {
      updateBackgroundVideo(newVideoSrc);
    }
  }, [activeTab]);

  return (
    <div className="flex items-center justify-center h-full w-full relative overflow-hidden">
      <div className="h-[670px] w-[400px] rotate-[135deg] bg-black absolute -top-[250px] -right-[120px] z-0 opacity-50"></div>
      <div className="h-[670px] w-[400px] rotate-[135deg] bg-black absolute -bottom-[250px] -left-[120px] z-0 opacity-50"></div>

      <div className="w-full absolute bottom-[100px] left-0 z-10 px-10 overflow-hidden">
        <div className="flex flex-row gap-2 mb-4 pl-2">
          {tabContents.map((_, index) => (
            <div
              key={`indicator-${index}`}
              className={`h-1 w-[60px] cursor-pointer transition-colors duration-300 ${
                activeTab === index
                  ? "bg-orange-500"
                  : "bg-neutral-600 hover:bg-neutral-400"
              }`}
              onClick={() => handleTabClick(index)}
              role="tab"
              aria-selected={activeTab === index}
              tabIndex="0"
              onKeyDown={(e) => e.key === "Enter" && handleTabClick(index)}
            ></div>
          ))}
        </div>

        <div
          ref={tabsContainerRef}
          className="flex flex-row items-start w-full gap-10 flex-nowrap"
          style={{ willChange: "transform" }}
        >
          {tabContents.map((content, index) => (
            <div
              ref={(el) => (tabContentRefs.current[index] = el)}
              className="flex-shrink-0 w-1/3 cursor-pointer"
              key={index}
              onClick={() => handleTabClick(index)}
              role="tabpanel"
              aria-labelledby={`indicator-${index}`}
              tabIndex={-1}
            >
              <p
                className={`text-sm ${
                  activeTab === index ? "text-white" : "text-neutral-500"
                }`}
              >
                The Heart of Change
              </p>
              <h1
                className={`text-3xl font-bold mt-1 ${
                  activeTab === index ? "text-white" : "text-neutral-500"
                }`}
              >
                {content.title}
              </h1>
              <p
                className={`text-sm mt-2 ${
                  activeTab === index ? "text-neutral-400" : "text-neutral-600"
                }`}
              >
                {content.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page8;
