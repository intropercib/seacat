import React, { useState, useEffect, useRef } from "react";
import ConcentricCircle from "../components/ConcentricCircle";
import { gsap } from "gsap";
import vdo6 from "/src/assets/vdo6.webm";
import vdo6_1 from "/src/assets/vdo6.1.webm";
import vdo6_2 from "/src/assets/vdo6.2.webm";

const Page6 = () => {
  const [activeTab, setActiveTab] = useState(0);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);

  const tabContents = [
    {
      title: "One day Trip",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate veniam recusandae provident eligendi reiciendis doloribus molestias impedit nesciunt magni sequi.",
      videoSrc: vdo6,
      progress: 35,
    },
    {
      title: "Weekend Getaway",
      description:
        "Explore beautiful destinations just a few hours away. Perfect for those seeking a short break from the daily routine with unforgettable experiences.",
      videoSrc: vdo6_1,
      progress: 65,
    },
    {
      title: "Adventure Tour",
      description:
        "Embark on thrilling adventures designed for adrenaline seekers. From rock climbing to white water rafting, these experiences will push your limits.",
      videoSrc: vdo6_2,
      progress: 90,
    },
  ];

  const updateBackgroundVideo = (videoSrc) => {
    const videoElement = document.querySelector(".background-video");
    if (videoElement && videoSrc) {
      videoElement.src = videoSrc;
      videoElement.load();
      videoElement.play();
    }
  };

  useEffect(() => {
    updateBackgroundVideo(tabContents[activeTab].videoSrc);

    if (titleRef.current && descriptionRef.current) {
      gsap.set([titleRef.current, descriptionRef.current], {
        y: 30,
        opacity: 0,
      });

      const tl = gsap.timeline();

      tl.to(titleRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
      }).to(
        descriptionRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.4"
      );
    }
  }, [activeTab]);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div className="flex items-center justify-center h-full w-full relative overflow-hidden">
      <div className="h-[670px] w-[400px] rotate-45 bg-black absolute -top-[250px] -left-[120px] z-0"></div>
      <div className="h-[670px] w-[400px] rotate-45 bg-black absolute -bottom-[250px] -right-[120px] z-0"></div>

      <div className="z-[5] flex flex-row items-center justify-center gap-4">
        <div className="w-[400px] absolute top-1/2 left-20">
          <div className="flex flex-row gap-2">
            {tabContents.map((content, index) => (
              <div
                key={index}
                className={`h-1 w-[60px] ${
                  activeTab === index ? "bg-orange-500" : "bg-white"
                } cursor-pointer transition-all duration-300 hover:bg-orange-300`}
                onClick={() => handleTabClick(index)}
                aria-label={`Select ${content.title}`}
                role="tab"
                tabIndex="0"
                onKeyDown={(e) => e.key === "Enter" && handleTabClick(index)}
              ></div>
            ))}
          </div>
          <div className="mt-2">
            <p className="text-white/70">Your Trip Your Mode</p>
            <h1 ref={titleRef} className="text-3xl font-bold opacity-0">
              {tabContents[activeTab].title}
            </h1>
            <p ref={descriptionRef} className="text-neutral-400 mt-2 opacity-0">
              {tabContents[activeTab].description}
            </p>
          </div>
        </div>
        <div className="h-[450px] w-[450px]">
          <ConcentricCircle
            percentage={tabContents[activeTab].progress}
            tabIndex={activeTab}
          />
        </div>
      </div>
    </div>
  );
};

export default Page6;
