import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const PageIndicator = ({
  pageNumber,
  totalPages,
  isSidebarOpen,
  isTransitioning,
  onPageChange,
}) => {
  const indicatorContainerRef = useRef(null);
  const indicatorRefs = useRef([]);

  useEffect(() => {
    const indicatorContainer = indicatorContainerRef.current;
    if (!indicatorContainer) return;

    if (isSidebarOpen) {
      gsap.to(indicatorContainer, {
        opacity: 0,
        duration: 0.75,
        ease: "power1.out",
      });
    } else {
      if (pageNumber > 1 && pageNumber <= totalPages) {
        gsap.fromTo(
          indicatorContainer,
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 2.5, ease: "none" }
        );
      } else {
        gsap.set(indicatorContainer, { opacity: 0 });
      }
    }
  }, [pageNumber, isSidebarOpen, totalPages]);

  if (pageNumber <= 1 || pageNumber > totalPages) return null;

  const handleIndicatorClick = (indicatorPageNumber) => {
    if (isTransitioning || pageNumber === indicatorPageNumber || isSidebarOpen)
      return;

    if (indicatorPageNumber <= totalPages) {
      const direction = indicatorPageNumber > pageNumber ? "down" : "up";
      onPageChange(indicatorPageNumber, direction);
    }
  };

  return (
    <>
      <div
        className="indicator fixed top-1/2 right-[50px] z-50 flex h-auto w-[2px] -translate-y-1/2 flex-col items-center bg-[url('/src/assets/indicatorbar.png')] opacity-100 transition-all duration-300 ease-linear"
        ref={indicatorContainerRef}
      >
        {[...Array(totalPages)].map((_, index) => {
          const indicatorPageNumber = index + 1;
          const isActive = pageNumber === indicatorPageNumber;
          return (
            <div
              key={indicatorPageNumber}
              className={`
              ${
                isActive
                  ? "h-[100px] w-[200px] cursor-pointer bg-transparent bg-[url('/src/assets/scrollbar.png')] bg-contain bg-center bg-no-repeat"
                  : "h-[20px] w-[2px] cursor-pointer"
              }
            `}
              ref={(el) => (indicatorRefs.current[index] = el)}
              onClick={() => handleIndicatorClick(indicatorPageNumber)}
            />
          );
        })}
      </div>
    </>
  );
};

export default PageIndicator;
