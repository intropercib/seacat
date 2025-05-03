import React, { useState, useEffect, useRef } from "react";
import Page1 from "./Page/Page1";
import Page2, { Page2SidebarContent } from "./Page/Page2";
import Page3, { Page3SidebarContent } from "./Page/Page3";
import Page4, { Page4SidebarContent } from "./Page/Page4";
import Page5, { Page5SidebarContent } from "./Page/Page5";
import Page6 from "./Page/Page6";
import Page7 from "./Page/Page7";
import Page8 from "./Page/Page8";
import Page9 from "./Page/Page9";
import Page10 from "./Page/Page10";
import Header from "./components/Header";
import VideoBackground from "./components/VideoBackground";
import PageContent from "./components/PageContent";
import PageIndicator from "./components/PageIndicator";
import SideBar from "./components/SideBar";
import Loader from "./components/Loader";

import vdo1 from '/src/assets/vdo1.webm';
import vdo2 from '/src/assets/vdo2.webm';
import vdo3 from '/src/assets/vdo3.webm';
import vdo4 from '/src/assets/vdo4.webm';
import vdo5 from '/src/assets/vdo5.webm';
import vdo6 from '/src/assets/vdo6.webm';
import vdo1rev from '/src/assets/vdo1rev.webm';
import vdo2rev from '/src/assets/vdo2rev.webm';
import vdo3rev from '/src/assets/vdo3rev.webm';
import vdo4rev from '/src/assets/vdo4rev.webm';
import vdo5rev from '/src/assets/vdo5rev.webm';
import vdo6rev from '/src/assets/vdo6rev.webm';
import vdo8 from '/src/assets/vdo8.webm';
import vdo9 from '/src/assets/vdo9.webm';

const getSidebarContent = (pageNumber) => {
  switch (pageNumber) {
    case 2:
      return <Page2SidebarContent />;
    case 3:
      return <Page3SidebarContent />;
    case 4:
      return <Page4SidebarContent />;
    case 5:
      return <Page5SidebarContent />;
    default:
      return null;
  }
};

const getPageComponent = (pageNumber, sidebarProps) => {
  switch (pageNumber) {
    case 1:
      return <Page1 />;
    case 2:
      return <Page2 pageNumber={pageNumber} {...sidebarProps} />;
    case 3:
      return <Page3 pageNumber={pageNumber} {...sidebarProps} />;
    case 4:
      return <Page4 pageNumber={pageNumber} {...sidebarProps} />;
    case 5:
      return <Page5 pageNumber={pageNumber} {...sidebarProps} />;
    case 6:
      return <Page6 />;
    case 7:
      return <Page7 />;
    case 8:
      return <Page8 />;
    case 9:
      return <Page9 />;
    case 10:
      return <Page10 />;
    default:
      return null;
  }
};

const videoMap = {
  fwd: { 1: vdo1, 2: vdo2, 3: vdo3, 4: vdo4, 5: vdo5, 6: vdo6, 8: vdo8, 9: vdo9 },
  rev: { 1: vdo1rev, 2: vdo2rev, 3: vdo3rev, 4: vdo4rev, 5: vdo5rev, 6: vdo6rev },
};

const getVideoSource = (dir, page) => {
  if (dir === 'up' && videoMap.rev[page]) {
    return videoMap.rev[page];
  }
  if (videoMap.fwd[page]) {
    return videoMap.fwd[page];
  }
  return null; 
};

function App() {
  const [isLoading, setIsLoading] = useState(true);
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

  const totalPages = 10;
  const scrollTimeout = useRef(null);
  const scrollSensitivityThreshold = 5; 

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    const handleScroll = (e) => {
      if (isSidebarOpen) {
        const sidebarScrollContainer = document.querySelector('.sidebar-scroll-container');
        if (sidebarScrollContainer && sidebarScrollContainer.contains(e.target)) {
          return;
        } else {
          e.preventDefault();
          return;
        }
      }

      if (isTransitioning || scrollTimeout.current) {
        e.preventDefault();
        return;
      }

      const isScrollingUp = e.deltaY < 0;
      const isScrollingDown = e.deltaY > 0;
      let shouldPreventDefault = false;

      if (pageNumber === 10) {
        const isNearTop = (window.scrollY || document.documentElement.scrollTop || document.body.scrollTop) < scrollSensitivityThreshold;

        if (isScrollingUp && isNearTop) {
          shouldPreventDefault = true;
        } else {
          return;
        }
      } else {
        shouldPreventDefault = true;
      }

      if (shouldPreventDefault) {
        e.preventDefault();
      } else {
        return;
      }

      scrollTimeout.current = setTimeout(() => {
        scrollTimeout.current = null;

        if (isScrollingDown && pageNumber < totalPages) {
          setIsTransitioning(true);
          setScrollDirection("down");
          setPageNumber((prev) => prev + 1);
        } else if (isScrollingUp && pageNumber > 1) {
          setIsTransitioning(true);
          setScrollDirection("up");
          setPageNumber((prev) => prev - 1);
        }
      }, 1250);
    };

    window.addEventListener("wheel", handleScroll, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleScroll);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
        scrollTimeout.current = null;
      }
    };
  }, [pageNumber, isTransitioning, isSidebarOpen, totalPages]);

  useEffect(() => {
    if (isTransitioning) {
      const transitionDuration = 1200;
      const timer = setTimeout(
        () => setIsTransitioning(false),
        transitionDuration
      );
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  useEffect(() => {
    const currentPageNumber = pageNumber;
    setContentState((prevState) => {
      const newCurrentComponent = getPageComponent(
        currentPageNumber,
        sidebarProps
      );
      const needsUpdate =
        !prevState.current ||
        prevState.current.type !== newCurrentComponent?.type ||
        prevState.current.props?.pageNumber !== currentPageNumber ||
        prevState.current.props?.isSidebarOpen !== isSidebarOpen;

      if (needsUpdate) {
        return {
          current: newCurrentComponent,
          previous:
            prevState.current &&
            prevState.current.key !== newCurrentComponent?.key
              ? prevState.current
              : null,
        };
      }
      return prevState;
    });
  }, [pageNumber, isSidebarOpen]);

  useEffect(() => {
    if (isTransitioning && pageNumber !== 10) {
      const newSrc = getVideoSource(scrollDirection, pageNumber);
      setVideoSrc(newSrc);
    } else if (pageNumber === 10 && scrollDirection === 'down') {
    }
  }, [isTransitioning, pageNumber, scrollDirection]);

  useEffect(() => {
    const isScrollablePage = pageNumber === 10;
    const htmlEl = document.documentElement;
    const bodyEl = document.body;

    htmlEl.style.overflow = isScrollablePage ? "auto" : "hidden";
    bodyEl.style.overflow = isScrollablePage ? "auto" : "hidden";

    if (isScrollablePage) {
      htmlEl.classList.add("scrollbar-hide");
      bodyEl.classList.add("scrollbar-hide");
    } else {
      htmlEl.classList.remove("scrollbar-hide");
      bodyEl.classList.remove("scrollbar-hide");
    }

    const rootElement = document.getElementById("root");
    if (rootElement) {
      rootElement.style.overflow = isScrollablePage ? "visible" : "hidden";
    }

    return () => {
        htmlEl.classList.remove("scrollbar-hide");
        bodyEl.classList.remove("scrollbar-hide");
    }

  }, [pageNumber]);


  const handlePageChange = (newPage, direction) => {
    if (isTransitioning || isSidebarOpen) return;
    setIsTransitioning(true);
    setScrollDirection(direction);
    setPageNumber(newPage);
  };


  if (isLoading) {
    return <Loader onLoadingComplete={handleLoadingComplete} />;
  }

  return (
    <>
      <div
        className={`app-container relative w-full text-white opacity-100 ${
          pageNumber === 10
            ? "h-auto"
            : "h-screen overflow-hidden"
        }`}
      >
        <VideoBackground
          videoSrc={videoSrc} 
          isSidebarOpen={isSidebarOpen}
          pageNumber={pageNumber}
        />

        <Header pageNumber={pageNumber} />

        <PageContent
          currentContent={contentState.current}
          previousContent={contentState.previous}
          isTransitioning={isTransitioning}
        />

        <PageIndicator
          pageNumber={pageNumber}
          totalPages={totalPages}
          isSidebarOpen={isSidebarOpen}
          isTransitioning={isTransitioning}
          onPageChange={handlePageChange}
        />

        <SideBar isOpen={isSidebarOpen} onClose={closeSidebar}>
          {getSidebarContent(pageNumber)}
        </SideBar>
      </div>
    </>
  );
}

export default App;
