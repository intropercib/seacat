import { useState, useEffect, useRef } from "react";
import "./App.css";
import Page1 from "./pages/Page1/Page1";
import Page2 from "./pages/Page2/Page2";
import Page3 from "./pages/Page3/Page3";
import Page4 from "./pages/Page4/Page4";
import Page5 from "./pages/Page5/Page5";
import Page6 from "./pages/Page6/Page6";
import Page7 from "./pages/Page7/Page7";
import Page8 from "./pages/Page8/Page8";
import Page9 from "./pages/Page9/Page9";
import Page10 from "./pages/Page10/Page10";
import ScrollingPage from "./pages/ScrollingPage/ScrollingPage";
import Header from "./components/Header/Header";
import { gsap } from "gsap";

function App() {
  const [pageNumber, setPageNumber] = useState(1);
  const [scrollDirection, setScrollDirection] = useState("down");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const appRef = useRef(null);
  const totalPages = 10;

  const scrollTimeout = useRef(null);
  const indicatorRefs = useRef([]);
  const indicatorContainerRef = useRef(null);

  useEffect(() => {
    const handleScroll = (e) => {
      if (isTransitioning) return;

      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }

      scrollTimeout.current = setTimeout(() => {
        if (e.deltaY > 0 && pageNumber < totalPages) {
          // Scrolling down
          setIsTransitioning(true);
          setScrollDirection("down");
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        } else if (e.deltaY < 0 && pageNumber > 1) {
          // Scrolling up
          setIsTransitioning(true);
          setScrollDirection("up");
          setPageNumber((prevPageNumber) => prevPageNumber - 1);
        }
      }, 50);
    };

    const appElement = appRef.current;
    if (appElement) {
      appElement.addEventListener("wheel", handleScroll);
    }

    return () => {
      if (appElement) {
        appElement.removeEventListener("wheel", handleScroll);
      }
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, [pageNumber, isTransitioning]);

  useEffect(() => {
    if (isTransitioning) {
      const transitionTimer = setTimeout(() => {
        setIsTransitioning(false);
      }, 500);
      return () => clearTimeout(transitionTimer);
    }
  }, [isTransitioning]);

  const renderScrollingPageContent = () => {
    switch (pageNumber) {
      case 1:
        return <Page1 />;
      case 2:
        return <Page2 pageNumber={pageNumber} />;
      case 3:
        return <Page3 pageNumber={pageNumber}/>;
      case 4:
        return <Page4 />;
      case 5:
        return <Page5 />;
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

  useEffect(() => {
    const rootElement = document.getElementById("root");
    if (pageNumber === 10) {
      rootElement.style.overflow = "auto";
    } else {
      rootElement.style.overflow = "hidden";
    }
    return () => {
      rootElement.style.overflow = "hidden";
    };
  }, [pageNumber]);

  useEffect(() => {
    if (pageNumber !== 1 && indicatorContainerRef.current) {
      gsap.fromTo(
        indicatorContainerRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 1, ease: "power2.out" }
      );
    }
  }, [pageNumber]);

  return (
    <div className="app-container" ref={appRef}>
      <Header pageNumber={pageNumber} />
      <div className="pages-container">
        <ScrollingPage
          pageNumber={pageNumber}
          direction={scrollDirection}
          isTransitioning={isTransitioning}
          currentPageContent={renderScrollingPageContent()}
        />
      </div>
      {/* Page indicators */}
      {pageNumber == 1 ? null : (
        <div
          className="page-indicator"
          ref={indicatorContainerRef}
          style={{ opacity: 0 }}
        >
          {[...Array(totalPages)].map((_, index) => {
            const indicatorPageNumber = index + 1;
            return (
              <div
                key={indicatorPageNumber}
                className={`indicator ${
                  pageNumber === indicatorPageNumber ? "active" : ""
                }`}
                ref={el => (indicatorRefs.current[index] = el)}
                onClick={() => {
                  if (isTransitioning || pageNumber === indicatorPageNumber)
                    return;
                  setIsTransitioning(
                    indicatorPageNumber <= 9 && pageNumber <= 9
                  );
                  setScrollDirection(
                    indicatorPageNumber > pageNumber ? "down" : "up"
                  );
                  setPageNumber(indicatorPageNumber);
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
