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

const getVideoSource = (dir, page) => {
  const rev = (n) => `/src/assets/vdo${n}rev.webm`;
  const fwd = (n) => `/src/assets/vdo${n}.webm`;
  if (page >= 1 && page <= 6) return dir === "up" ? rev(page) : fwd(page);
  if (page === 8 || page === 9) return fwd(page);
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

  useEffect(() => {
    const handleScroll = (e) => {
      if (isSidebarOpen) {
        if (!e.target.closest(".sidebar-scroll-container")) {
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
    appElement?.addEventListener("wheel", handleScroll, { passive: false });
    return () => {
      appElement?.removeEventListener("wheel", handleScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
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
    if (isTransitioning) {
      const newSrc = getVideoSource(scrollDirection, pageNumber);
      setVideoSrc(newSrc);
    }
  }, [isTransitioning, pageNumber, scrollDirection]);

  useEffect(() => {
    const rootElement = document.getElementById("root");
    if (rootElement) {
      rootElement.style.overflow = pageNumber === 10 ? "auto" : "hidden";
    }
  }, [pageNumber]);

  const handlePageChange = (newPage, direction) => {
    if (isTransitioning || isSidebarOpen) return;
    setIsTransitioning(true);
    setScrollDirection(direction);
    setPageNumber(newPage);
  };

  return (
    <>
      <div
        className={`app-container relative w-full text-white opacity-100 ${
          pageNumber === 10
            ? "h-auto overflow-y-auto scrollbar-hide"
            : "h-screen overflow-hidden"
        }`}
        ref={appRef}
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
