import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./Header.css";
import { Plus } from "lucide-react";
import logo from "../../assets/logo-seacat.png";
import iconMenu from "../../assets/icon-menu-stroke.png";
import usePrevious from "../../hooks/usePrevious";

const Header = ({ pageNumber }) => {
  const header1Ref = useRef(null);
  const leftRef = useRef(null);
  const centerRef = useRef(null);
  const rightRef = useRef(null);

  const prevPageNumber = usePrevious(pageNumber);
  useEffect(() => {
    if (prevPageNumber === undefined || pageNumber === prevPageNumber) {
      if (pageNumber === 1 && header1Ref.current) {
        gsap.set(header1Ref.current, { opacity: 1, y: 0 });
      } else if (pageNumber === 2) {
        const elements = [
          leftRef.current,
          centerRef.current,
          rightRef.current,
        ].filter(Boolean);
        gsap.set(elements, { opacity: 1, y: 0 });
      }
      return;
    }

    const isTransitioning1to2 = pageNumber === 2 && prevPageNumber === 1;
    const isTransitioning2to1 = pageNumber === 1 && prevPageNumber === 2;

    if (!isTransitioning1to2 && !isTransitioning2to1) {
      if (pageNumber === 1 && header1Ref.current) {
        gsap.set(header1Ref.current, { opacity: 1, y: 0 });
        const elements = [
          leftRef.current,
          centerRef.current,
          rightRef.current,
        ].filter(Boolean);
        gsap.set(elements, { opacity: 0 });
      } else if (pageNumber === 2) {
        if (header1Ref.current) gsap.set(header1Ref.current, { opacity: 0 });
        const elements = [
          leftRef.current,
          centerRef.current,
          rightRef.current,
        ].filter(Boolean);
        gsap.set(elements, { opacity: 1, y: 0 });
      } else if (pageNumber >= 3) {
        if (header1Ref.current) gsap.set(header1Ref.current, { opacity: 0 });
        const elements = [
          leftRef.current,
          centerRef.current,
          rightRef.current,
        ].filter(Boolean);
        gsap.set(elements, { opacity: 1, y: 0 });
      }
      return;
    }

    const tl = gsap.timeline();
    const header2Elements = [
      { ref: leftRef.current, delay: 0 },
      { ref: centerRef.current, delay: 0.1 },
      { ref: rightRef.current, delay: 0.2 },
    ].filter((item) => item.ref !== null);

    if (isTransitioning1to2) {
      if (header1Ref.current) {
        tl.to(
          header1Ref.current,
          {
            duration: 0.5,
            opacity: 0,
            y: -50,
            ease: "power1.in",
          },
          0
        );
      }

      header2Elements.forEach((item) => {
        gsap.set(item.ref, { opacity: 0, y: 50 });
        tl.to(
          item.ref,
          {
            duration: 0.8,
            opacity: 1,
            y: 0,
            ease: "power1.out",
          },
          0.2 + item.delay
        );
      });
    } else if (isTransitioning2to1) {
      header2Elements.forEach((item) => {
        gsap.set(item.ref, { opacity: 1, y: 0 });
        tl.to(
          item.ref,
          {
            duration: 0.5,
            opacity: 0,
            y: 50,
            ease: "power1.in",
          },
          item.delay
        );
      });

      if (header1Ref.current) {
        gsap.set(header1Ref.current, { opacity: 0, y: -50 });
        tl.to(
          header1Ref.current,
          {
            duration: 0.8,
            opacity: 1,
            y: 0,
            ease: "power1.out",
          },
          0.2
        );
      }
    }
  }, [pageNumber, prevPageNumber]);
  if (pageNumber === 10) {
    return null;
  }

  return (
    <>
      {(pageNumber === 1 || prevPageNumber === 1) && (
        <div
          className="page1Header"
          ref={header1Ref}
          style={{ position: "absolute", width: "100%" }}
        >
          <svg
            className="rossinavi"
            viewBox="0 0 373.25 72.72"
            width="129"
            height="25"
            color="#fff"
            fill="white"
          >
            <path d="M3.23 53.35v19.37H0v-22.6h45.23v3.23h-42zM54.92 69.49h38.73V53.36H54.92Zm41.95 3.23H51.69V50.13h45.18ZM148.56 72.71h-45.18v-3.22h41.96v-6.72h-41.96V50.12h45.18v3.23h-41.95v6.21h41.95v13.15zM200.25 72.71h-45.18v-3.22h41.95v-6.72h-41.95V50.12h45.18v3.23H158.3v6.21h41.95v13.15zM206.76 50.12h3.22v22.59h-3.22zM370.02 50.12h3.23v22.59h-3.23zM261.9 72.71h-3.22V53.35h-38.73v19.36h-3.23V50.12h45.18v22.59zM271.64 69.49h38.73v-6.71h-38.73Zm-3.23-9.93h41.96v-6.21h-41.96v-3.23h45.18v22.59h-45.18ZM340.4 72.71l-20.68-22.59h4.52L342.6 70.2l17.83-20.08h4.52l-20.03 22.59h-4.52zM242.65 24.45a25.916 25.916 0 0 0-1.7-2.8c-.08.01-.17.01-.25.02a2.108 2.108 0 0 1-1.57.71H125.61a2.087 2.087 0 0 1-1.56-.71c-.08-.01-.17-.01-.25-.02a25.306 25.306 0 0 0-1.7 2.8 24.763 24.763 0 0 0-1.53 3.74h123.62a25.315 25.315 0 0 0-1.54-3.74M234.22 10.18a.1.1 0 0 0-.04-.05c-.08 0-.17.01-.25.01l-.04.04a2.083 2.083 0 0 1-1.53.68h-99.99a2.1 2.1 0 0 1-1.53-.68l-.04-.04a2.09 2.09 0 0 0-.25-.01.218.218 0 0 0-.04.05q-1.665 2.2-3.15 4.55h110.01q-1.485-2.34-3.15-4.55M225.89.04c-.01-.01-.02-.03-.03-.04-.06 0-.14.01-.2.01a.138.138 0 0 0-.03.04 1.745 1.745 0 0 1-1.27.56h-83.95a1.728 1.728 0 0 1-1.27-.56c-.01-.01-.02-.03-.03-.04-.07 0-.14-.01-.21-.01-.01.01-.02.03-.03.04q-1.4 1.845-2.63 3.81h92.3a63.08 63.08 0 0 0-2.65-3.81"></path>
          </svg>
        </div>
      )}

      {((pageNumber >= 2 && pageNumber <= 9) ||
        (prevPageNumber >= 2 && prevPageNumber <= 9)) && (
        <div
          className="page2Header"
          style={{ position: "absolute", width: "100%" }}
        >
          <div className="left" ref={leftRef}>
            <h2>ROSSINAVI</h2>
            <h2>BLUE EXPERIENCE</h2>
          </div>
          <div className="center" ref={centerRef}>
            <img src={logo} alt="logo" />
          </div>
          <div className="right" ref={rightRef}>
            <div className="circular">
              <img src={iconMenu} alt="icon" />
              <Plus className="plus" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
