import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Plus } from "lucide-react";
import logo from "../assets/logo-seacat.png";
import iconMenu from "../assets/icon-menu-stroke.png";
import usePrevious from "../hooks/usePrevious";

gsap.registerPlugin(useGSAP);

const Header = ({ pageNumber }) => {
  const containerRef = useRef(null);
  const header1Ref = useRef(null);
  const leftRef = useRef(null);
  const centerRef = useRef(null);
  const rightRef = useRef(null);
  const iconMenuRef = useRef(null);
  const prevPageNumber = usePrevious(pageNumber);

  useGSAP(() => {
    const header1Element = header1Ref.current;
    const header2Elements = [
      leftRef.current,
      centerRef.current,
      rightRef.current,
    ].filter(Boolean);
    const iconMenuElement = iconMenuRef.current;

    if (iconMenuElement) {
      gsap.killTweensOf(iconMenuElement, "rotation");
      gsap.to(iconMenuElement, {
        rotation: "+=360", 
        duration: 1,    
        repeat: -1,
        ease: "none",
      });
    }


    if (!header1Element || header2Elements.length < 3) {
      return;
    }

    const Y_OFFSET = 30;
    const DURATION_INITIAL = 1.5;
    const DURATION_FADE = 0.8;
    const DURATION_STAGGER = 1.2;
    const isInitialLoad = prevPageNumber === undefined;

    let targetHeader1State = { opacity: 0, y: -Y_OFFSET }; 
    let targetHeader2State = { opacity: 0, y: Y_OFFSET };  

    if (pageNumber === 1) {
      targetHeader1State = { opacity: 1, y: 0 };
    } else if (pageNumber >= 2 && pageNumber <= 9) {
      targetHeader2State = { opacity: 1, y: 0 };
    }

    if (isInitialLoad && pageNumber === 1) {
      console.log("Initial Load: Animating Header 1 In");
      gsap.set(header2Elements, targetHeader2State); 
      gsap.fromTo(header1Element,
        { opacity: 0, y: Y_OFFSET }, 
        {
          ...targetHeader1State,
          duration: DURATION_INITIAL,
          delay: 0.5,
          ease: "power1.out",
          overwrite: true 
        }
      );
    } else if (!isInitialLoad && pageNumber !== prevPageNumber) {
      const isTransitioning1to2 = pageNumber === 2 && prevPageNumber === 1;
      const isTransitioning2to1 = pageNumber === 1 && prevPageNumber === 2;

      let header1Duration = DURATION_FADE;
      let header2Duration = DURATION_FADE;
      let header1Ease = "power1.in";
      let header2Ease = "power1.in";
      let header1Delay = 0;
      let header2Delay = 0;
      let header2Stagger = 0.25;

      if (isTransitioning1to2) {
        header1Ease = "power1.in";
        header2Ease = "power1.out";
        header2Duration = DURATION_STAGGER;
        header2Delay = DURATION_FADE * 0.4;
        header2Stagger = 0.15;
        gsap.set(header2Elements, { y: Y_OFFSET });
      } else if (isTransitioning2to1) {
        header1Ease = "power1.out";
        header2Ease = "power1.in";
        header1Duration = DURATION_STAGGER;
        header1Delay = DURATION_FADE * 0.4;
        header2Stagger = { amount: 0.3, from: "end" };
        gsap.set(header1Element, { y: -Y_OFFSET });
      } else {
        header1Duration = 0;
        header2Duration = 0;
      }

      gsap.to(header1Element, {
        ...targetHeader1State,
        duration: header1Duration,
        delay: header1Delay,
        ease: header1Ease,
        overwrite: true
      });

      gsap.to(header2Elements, {
        ...targetHeader2State,
        duration: header2Duration,
        delay: header2Delay,
        stagger: header2Stagger,
        ease: header2Ease,
        overwrite: true 
      });

    }

  }, { scope: containerRef, dependencies: [pageNumber, prevPageNumber] });

  if (pageNumber === 10) {
    return null;
  }

  return (
    <div ref={containerRef} className="absolute top-0 left-0 w-full z-20">
      <div
        className="absolute top-0 left-0 h-[100px] w-full flex justify-center items-center pt-[50px]"
        ref={header1Ref}
        style={{ willChange: 'transform, opacity' }}
      >
        <svg viewBox="0 0 373.25 72.72" width="129" height="25" className="fill-white">
          <path d="M3.23 53.35v19.37H0v-22.6h45.23v3.23h-42zM54.92 69.49h38.73V53.36H54.92Zm41.95 3.23H51.69V50.13h45.18ZM148.56 72.71h-45.18v-3.22h41.96v-6.72h-41.96V50.12h45.18v3.23h-41.95v6.21h41.95v13.15zM200.25 72.71h-45.18v-3.22h41.95v-6.72h-41.95V50.12h45.18v3.23H158.3v6.21h41.95v13.15zM206.76 50.12h3.22v22.59h-3.22zM370.02 50.12h3.23v22.59h-3.23zM261.9 72.71h-3.22V53.35h-38.73v19.36h-3.23V50.12h45.18v22.59zM271.64 69.49h38.73v-6.71h-38.73Zm-3.23-9.93h41.96v-6.21h-41.96v-3.23h45.18v22.59h-45.18ZM340.4 72.71l-20.68-22.59h4.52L342.6 70.2l17.83-20.08h4.52l-20.03 22.59h-4.52zM242.65 24.45a25.916 25.916 0 0 0-1.7-2.8c-.08.01-.17.01-.25.02a2.108 2.108 0 0 1-1.57.71H125.61a2.087 2.087 0 0 1-1.56-.71c-.08-.01-.17-.01-.25-.02a25.306 25.306 0 0 0-1.7 2.8 24.763 24.763 0 0 0-1.53 3.74h123.62a25.315 25.315 0 0 0-1.54-3.74M234.22 10.18a.1.1 0 0 0-.04-.05c-.08 0-.17.01-.25.01l-.04.04a2.083 2.083 0 0 1-1.53.68h-99.99a2.1 2.1 0 0 1-1.53-.68l-.04-.04a2.09 2.09 0 0 0-.25-.01.218.218 0 0 0-.04.05q-1.665 2.2-3.15 4.55h110.01q-1.485-2.34-3.15-4.55M225.89.04c-.01-.01-.02-.03-.03-.04-.06 0-.14.01-.2.01a.138.138 0 0 0-.03.04 1.745 1.745 0 0 1-1.27.56h-83.95a1.728 1.728 0 0 1-1.27-.56c-.01-.01-.02-.03-.03-.04-.07 0-.14-.01-.21-.01-.01.01-.02.03-.03.04q-1.4 1.845-2.63 3.81h92.3a63.08 63.08 0 0 0-2.65-3.81"></path>
        </svg>
      </div>

      <div
        className="absolute top-0 left-0 z-10 h-[100px] w-full flex justify-between items-end pt-[50px] px-[80px]"
        style={{ willChange: 'transform, opacity' }}
      >
        <div className="pb-[10px]" ref={leftRef}>
          <h2 className="bg-gradient-to-r from-[#385FEB] to-[#03033D] bg-clip-text text-transparent text-xs leading-[1.3] cursor-pointer">ROSSINAVI</h2>
          <h2 className="bg-gradient-to-r from-[#385FEB] to-[#03033D] bg-clip-text text-transparent text-xs leading-[1.3] cursor-pointer">BLUE EXPERIENCE</h2>
        </div>
        <div ref={centerRef}>
          <img src={logo} alt="logo" className="h-[50px] mix-blend-overlay -translate-x-[30%]" />
        </div>
        <div className="relative h-[50px] w-[50px] cursor-pointer mb-[5px]" ref={rightRef}> 
          <img
            ref={iconMenuRef}
            src={iconMenu}
            alt="icon"
            className="absolute top-1/2 left-1/2 h-full w-auto -translate-x-1/2 -translate-y-1/2 z-0 block"
          />
          <Plus className="absolute top-1/2 left-1/2 h-[40%] w-auto -translate-x-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors duration-300 ease-in-out z-10" />
        </div>
      </div>
    </div>
  );
};

export default Header;
