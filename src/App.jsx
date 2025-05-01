import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import Page1 from "./Page/Page1";
import Page2 from "./Page/Page2";
import Page3 from "./Page/Page3"; 
import Page4 from "./Page/Page4"; 
import Page5 from "./Page/Page5"; 
import Header from "./components/Header";


const getPageComponent = (pageNumber, sidebarProps) => {
  switch (pageNumber) {
    case 1: return <Page1 />;
    case 2: return <Page2 pageNumber={pageNumber} {...sidebarProps} />;
    case 3: return <Page3 pageNumber={pageNumber} {...sidebarProps} />;
    case 4: return <Page4 pageNumber={pageNumber} {...sidebarProps} />;
    case 5: return <Page5 pageNumber={pageNumber} {...sidebarProps} />;
    // case 6: return <Page6 pageNumber={pageNumber} {...sidebarProps} />;
    // case 7: return <Page7 pageNumber={pageNumber} {...sidebarProps} />;
    // case 8: return <Page8 pageNumber={pageNumber} {...sidebarProps} />;
    // case 9: return <Page9 pageNumber={pageNumber} {...sidebarProps} />;
    // case 10: return <Page10 pageNumber={pageNumber} {...sidebarProps} />;
    default: return null;
  }
};

const getVideoSource = (dir, page) => {
  const rev = (n) => `/src/assets/vdo${n}rev.webm`;
  const fwd = (n) => `/src/assets/vdo${n}.webm`;
  // Assuming videos only up to page 9 for now
  if (page >= 1 && page <= 6) return dir === "up" ? rev(page) : fwd(page);
  if (page === 7 || page === 8 || page === 9) return fwd(page);
  return null;
};


function App() {
  const [pageNumber, setPageNumber] = useState(1);
  const [scrollDirection, setScrollDirection] = useState("down");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); 

  const openSidebar = () => {
    setIsSidebarOpen(true);
  };
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const sidebarProps = { isSidebarOpen, openSidebar, closeSidebar };

  const [contentState, setContentState] = useState({
    current: getPageComponent(1, sidebarProps), 
    previous: null,
  });
  const [videoSrc, setVideoSrc] = useState(() => getVideoSource("down", 1));

  const appRef = useRef(null);
  const totalPages = 10; 
  const scrollTimeout = useRef(null);
  const indicatorRefs = useRef([]);
  const indicatorContainerRef = useRef(null);
  const currentContentRef = useRef(null);
  const previousContentRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const handleScroll = (e) => {
      if (isSidebarOpen) {
        if (!e.target.closest('.sidebar-scroll-container')) {
          return;
        }
        return;
      }

      if (isTransitioning) return;
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);

      scrollTimeout.current = setTimeout(() => {
        if (e.deltaY > 0 && pageNumber < totalPages) {
          setIsTransitioning(true);
          setScrollDirection("down");
          setPageNumber((prev) => prev + 1);
        } else if (e.deltaY < 0 && pageNumber > 1) {
          setIsTransitioning(true);
          setScrollDirection("up");
          setPageNumber((prev) => prev - 1);
        }
      }, 50);
    };

    const appElement = appRef.current;
    appElement?.addEventListener("wheel", handleScroll, { passive: true }); 
    return () => {
      appElement?.removeEventListener("wheel", handleScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, [pageNumber, isTransitioning, isSidebarOpen, totalPages]); 

  useEffect(() => {
    if (isTransitioning) {
      const transitionDuration = 1200; 
      const timer = setTimeout(() => setIsTransitioning(false), transitionDuration);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  useEffect(() => {
    const currentPageNumber = pageNumber; 
    setContentState((prevState) => {
      const newCurrentComponent = getPageComponent(currentPageNumber, sidebarProps);
      const needsUpdate =
        !prevState.current || 
        prevState.current.type !== newCurrentComponent?.type ||
        (prevState.current.props?.pageNumber >= 2 && prevState.current.props?.isSidebarOpen !== isSidebarOpen); 

      if (needsUpdate) {
         return {
           current: newCurrentComponent,
           previous: prevState.current && prevState.current.key !== newCurrentComponent?.key ? prevState.current : null,
         };
      }
      return prevState;
    });
  }, [pageNumber, isSidebarOpen]);

  useEffect(() => {
    if (isTransitioning) {
      const newSrc = getVideoSource(scrollDirection, pageNumber);
      const videoElement = videoRef.current;
      if (videoElement) {
        const currentFullSrc = videoElement.currentSrc;
        const newFullSrc = newSrc ? new URL(newSrc, window.location.origin).href : null;

        if (newFullSrc && currentFullSrc !== newFullSrc) {
          setVideoSrc(newSrc);
        } else if (!newFullSrc && currentFullSrc) {
           setVideoSrc(null);
        }
      } else if (newSrc) {
         setVideoSrc(newSrc);
      }
    }
  }, [isTransitioning, pageNumber, scrollDirection]);


  useEffect(() => {
    const prevEl = previousContentRef.current;
    const currEl = currentContentRef.current;

    if (currEl) {
      gsap.set(currEl, { opacity: 1, zIndex: 2 }); 
    }
    if (prevEl) {
      gsap.set(prevEl, { opacity: 0, zIndex: 1 });
    }

    if (isTransitioning && prevEl && currEl) {
      gsap.set(prevEl, { opacity: 1, zIndex: 1 }); 
      gsap.set(currEl, { opacity: 0, zIndex: 2 }); 

      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(prevEl, { opacity: 0 });
        },
      });

      tl.to(prevEl, { opacity: 0, duration:  0.1, ease: "power1.inOut" }, 0)
        .to(currEl, { opacity: 1, duration:  0.1, ease: "power1.inOut" }, 0);

    } else if (isTransitioning && !prevEl && currEl) {
       gsap.set(currEl, { opacity: 0, zIndex: 2 });
       gsap.to(currEl, { opacity: 1, duration: 1.0, ease: "power1.inOut" });
    }

  }, [isTransitioning, contentState]);
   useEffect(() => {
     const prevEl = previousContentRef.current;
     const currEl = currentContentRef.current;
     if (!isTransitioning) {
        if (currEl) gsap.set(currEl, { opacity: 1, zIndex: 2 });
        if (prevEl) gsap.set(prevEl, { opacity: 0, zIndex: 1 });
     }
   }, [contentState, isTransitioning]); 

  useEffect(() => {
    const rootElement = document.getElementById("root");
    if (rootElement) {
        rootElement.style.overflow = pageNumber === 10 ? "auto" : "hidden";
    }
  }, [pageNumber]);

  useEffect(() => {
    const indicatorContainer = indicatorContainerRef.current;
    if (!indicatorContainer) return;
    if (isSidebarOpen) {
      gsap.to(indicatorContainer, {
        opacity: 0,
        duration: 0.75,
        ease: "power1.out"
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
  useEffect(() => {
    if (videoRef.current) {
      gsap.to(videoRef.current, {
        x: isSidebarOpen ? -300 : 0, 
        duration: 0.8, 
        ease: "power2.inOut",
      });
    }
  }, [isSidebarOpen]);


  return (
    <div className="app-container relative h-screen w-full text-white opacity-100 overflow-hidden" ref={appRef}> 
      {videoSrc && (
         <video
           ref={videoRef}
           key={videoSrc} 
           className="background-video absolute top-0 left-0 h-full w-full object-cover opacity-100"
           autoPlay
           muted
           playsInline 
           src={videoSrc}
           style={{ willChange: 'transform' }} 
         >
         </video>
      )}

      <Header pageNumber={pageNumber} />

      <div className="pages-container relative h-screen w-full opacity-100 z-10 pointer-events-none"> 
        {contentState.previous && (
          <div
            ref={previousContentRef}
            className="page-content previous-content absolute top-0 left-0 h-full w-full pointer-events-auto" 
            key={`prev-${contentState.previous?.props?.pageNumber ?? 'null'}-${contentState.previous?.props?.isSidebarOpen}`}
          >
            {contentState.previous}
          </div>
        )}

        {contentState.current && (
          <div
            ref={currentContentRef}
            className="page-content current-content absolute top-0 left-0 h-full w-full pointer-events-auto"             key={`curr-${pageNumber}-${contentState.current?.props?.isSidebarOpen}`}
          >
            {contentState.current}
          </div>
        )}
      </div>

      {pageNumber > 1 && pageNumber <= totalPages && (
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
                  ${isActive
                    ? "h-[100px] w-[200px] cursor-pointer bg-transparent bg-[url('/src/assets/scrollbar.png')] bg-contain bg-center bg-no-repeat"
                    : "h-[20px] w-[2px] cursor-pointer" 
                  }
                `}
                ref={el => (indicatorRefs.current[index] = el)}
                onClick={() => {
                  if (isTransitioning || pageNumber === indicatorPageNumber) return;
                  if (isSidebarOpen) return;

                  if (indicatorPageNumber <= totalPages) {
                     setIsTransitioning(true);
                     setScrollDirection(indicatorPageNumber > pageNumber ? "down" : "up");
                     setPageNumber(indicatorPageNumber);
                  }
                }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default App;
