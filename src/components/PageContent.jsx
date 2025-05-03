import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const PageContent = ({ currentContent, previousContent, isTransitioning }) => {
  const currentContentRef = useRef(null);
  const previousContentRef = useRef(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    const prevEl = previousContentRef.current;
    const currEl = currentContentRef.current;

    if (isTransitioning) {
      timelineRef.current = gsap.timeline({
        onComplete: () => {
          if (prevEl) {
            gsap.set(prevEl, { opacity: 0, zIndex: 1 });
          }
        }
      });

      if (prevEl && currEl) {
        gsap.set(prevEl, { opacity: 1, zIndex: 1 });
        gsap.set(currEl, { opacity: 0, zIndex: 2 });
        
        timelineRef.current
          .to(prevEl, { opacity: 0, duration: 0.3, ease: "power2.inOut" }, 0)
          .to(currEl, { opacity: 1, duration: 0.3, ease: "power2.inOut" }, 0.1); 
      } 
      else if (!prevEl && currEl) {
        gsap.set(currEl, { opacity: 0, zIndex: 2 });
        timelineRef.current.to(currEl, { opacity: 1, duration: 0.5, ease: "power2.inOut" }, 0);
      }
    } else {
      if (currEl) {
        gsap.set(currEl, { opacity: 1, zIndex: 2 });
      }
      if (prevEl) {
        gsap.set(prevEl, { opacity: 0, zIndex: 1 });
      }
    }

    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, [isTransitioning, currentContent, previousContent]);

  return (
    <div className="pages-container pointer-events-none relative h-screen w-full opacity-100 z-10">
      {previousContent && (
        <div
          ref={previousContentRef}
          className="page-content previous-content absolute top-0 left-0 h-full w-full pointer-events-auto opacity-0" 
          key={`prev-${previousContent?.props?.pageNumber ?? 'null'}-${previousContent?.props?.isSidebarOpen}`}
        >
          {previousContent}
        </div>
      )}

      {currentContent && (
        <div
          ref={currentContentRef}
          className="page-content current-content absolute top-0 left-0 h-full w-full pointer-events-auto opacity-0"           
          key={`curr-${currentContent?.props?.pageNumber ?? 'null'}-${currentContent?.props?.isSidebarOpen}`}
        >
          {currentContent}
        </div>
      )}
    </div>
  );
};

export default PageContent;