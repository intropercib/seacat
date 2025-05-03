import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import Draggable from "gsap/Draggable";
import vdo7 from "/src/assets/vdo7.webm";

gsap.registerPlugin(Draggable);

const initialPage7VideoStyles = {
  height: "100%",
  width: "100%",
  objectFit: "contain",
  transform: "scale(2) translateX(350px) translateY(30px)",
  opacity: 1,
};

const reappearedSnappedVideoStyles = {
  ...initialPage7VideoStyles,
  transform: "scale(2) translateX(-350px) translateY(30px)",
  opacity: 1,
};

const Page7 = () => {
  const videoSource = vdo7;
  const [videoStyles, setVideoStyles] = useState(initialPage7VideoStyles);

  const svg1Ref = useRef(null);
  const svg2Ref = useRef(null);
  const textRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const svg1 = svg1Ref.current;
    const textElement = textRef.current;
    const videoElement = videoRef.current;
    let returnTween = null;
    let isCurrentlySnapped = false;

    setVideoStyles(initialPage7VideoStyles);
    gsap.set(videoElement, { opacity: 1 });

    const draggableInstance = Draggable.create(svg1, {
      type: "x,y",
      bounds: ".redbox",
      onPress: function () {
        if (returnTween) {
          returnTween.kill();
          returnTween = null;
        }
        gsap.killTweensOf(this.target);
        gsap.killTweensOf(textElement);
        gsap.killTweensOf(videoElement);

        gsap.to(this.target, {
          scale: 1.2,
          duration: 0.2,
          ease: "power2.out",
          overwrite: "auto",
        });
        gsap.to(textElement, { opacity: 1, duration: 0.2 });
        this.update();
        isCurrentlySnapped = false;
        setVideoStyles(initialPage7VideoStyles);
        gsap.set(videoElement, { opacity: 1 });
      },
      onDrag: function () {
        const dragBox = this.target.getBoundingClientRect();
        const dropBox = svg2Ref.current.getBoundingClientRect();
        const dragCenter = {
          x: dragBox.left + dragBox.width / 2,
          y: dragBox.top + dragBox.height / 2,
        };
        const dropCenter = {
          x: dropBox.left + dropBox.width / 2,
          y: dropBox.top + dropBox.height / 2,
        };
        const dx = dropCenter.x - dragCenter.x;
        const dy = dropCenter.y - dragCenter.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        const magneticThreshold = 100;
        const snapThreshold = 30;
        const pullIntensityFactor = 0.4;

        if (returnTween) {
          returnTween.kill();
          returnTween = null;
        }

        if (distance < snapThreshold) {
          isCurrentlySnapped = true;
          gsap.to(this.target, {
            x: this.x + dx,
            y: this.y + dy,
            duration: 0.3,
            ease: "power2.out",
            overwrite: "auto",
          });
          gsap.to(textElement, {
            opacity: 0,
            duration: 0.3,
            overwrite: "auto",
          });
        } else {
          if (isCurrentlySnapped) {
            isCurrentlySnapped = false;
            gsap.to(textElement, {
              opacity: 1,
              duration: 0.3,
              overwrite: "auto",
            });
            if (!returnTween || !returnTween.isActive()) {
              returnTween = gsap.to(this.target, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: "power2.out",
                overwrite: "auto",
              });
            }
          } else {
            gsap.to(textElement, {
              opacity: 1,
              duration: 0.1,
              overwrite: "auto",
            });
            if (distance < magneticThreshold) {
              const pullStrength =
                (1 -
                  (distance - snapThreshold) /
                    (magneticThreshold - snapThreshold)) *
                pullIntensityFactor;
              gsap.to(this.target, {
                x: `+=${dx * pullStrength * 0.2}`,
                y: `+=${dy * pullStrength * 0.2}`,
                duration: 0.1,
                ease: "none",
                overwrite: "auto",
              });
            }
          }
        }
      },
      onDragEnd: function () {
        const dragBox = this.target.getBoundingClientRect();
        const dropBox = svg2Ref.current.getBoundingClientRect();
        const dragCenter = {
          x: dragBox.left + dragBox.width / 2,
          y: dragBox.top + dragBox.height / 2,
        };
        const dropCenter = {
          x: dropBox.left + dropBox.width / 2,
          y: dropBox.top + dropBox.height / 2,
        };
        const dx = dropCenter.x - dragCenter.x;
        const dy = dropCenter.y - dragCenter.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const snapThreshold = 30;

        if (returnTween) {
          returnTween.kill();
          returnTween = null;
        }
        gsap.killTweensOf(this.target);
        gsap.killTweensOf(textElement);
        gsap.killTweensOf(videoElement);

        if (distance < snapThreshold) {
          gsap.to(this.target, {
            x: this.x + dx,
            y: this.y + dy,
            scale: 1,
            duration: 0.2,
            ease: "power2.out",
          });
          gsap.to(textElement, { opacity: 0, duration: 0.2 });

          gsap.to(videoElement, {
            opacity: 0,
            duration: 0.5,
            ease: "power2.out",
            onComplete: () => {
              setVideoStyles(reappearedSnappedVideoStyles);
              gsap.to(videoElement, {
                opacity: 1,
                duration: 0.5,
                delay: 0.1,
                ease: "power2.in",
              });
            },
          });
        } else {
          gsap.to(this.target, {
            x: 0,
            y: 0,
            scale: 1,
            duration: 0.5,
            ease: "power2.out",
            onComplete: () => {
              setVideoStyles(initialPage7VideoStyles);
              gsap.set(videoElement, { opacity: 1 });
            },
          });
          gsap.to(textElement, { opacity: 1, duration: 0.5 });
          gsap.to(videoElement, { opacity: 1, duration: 0.5 });
        }
      },
    });

    return () => {
      if (draggableInstance && draggableInstance[0]) {
        draggableInstance[0].kill();
      }
      gsap.killTweensOf(svg1);
      gsap.killTweensOf(textElement);
      gsap.killTweensOf(videoElement);
    };
  }, []);

  return (
    <>
      <style>
        {`
            .arc1 {
              animation: rotateArc1 4s linear infinite;
              transform-origin: 100px 100px;
              }
            .arc2 {
                animation: rotateArc2 4s linear infinite;
                transform-origin: 100px 100px;
            }
            @keyframes rotateArc1 {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            @keyframes rotateArc2 {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(-360deg); }
            }
           
          `}
      </style>
      <div className="h-full w-full flex items-center justify-center relative overflow-hidden">
        <video
          ref={videoRef}
          key={videoSource}
          className="page7-background-video"
          autoPlay
          muted
          loop
          playsInline
          src={videoSource}
          style={videoStyles}
        />

        <div className="absolute -bottom-[10px] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] flex flex-col justify-center items-center">
          <div className="redbox flex justify-center items-center gap-4 w-fit px-6">
            <svg
              ref={svg1Ref}
              width="100"
              height="100"
              viewBox="0 0 200 200"
              xmlns="http://www.w3.org/2000/svg"
              style={{ cursor: "grab" }}
            >
              <circle cx="100" cy="100" r="90" fill="transparent" />
              <g stroke="white" strokeWidth="2">
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  strokeDasharray="2 10"
                  className="arc2"
                />
              </g>
              <circle
                cx="100"
                cy="100"
                r="60"
                fill="none"
                stroke="white"
                strokeWidth="2"
              />
              <path
                className="arc1"
                d="M57.6,142.4 A60,60 0 1,1 142.4,142.4"
                fill="none"
                stroke="orange"
                strokeWidth="6"
                strokeLinecap="round"
              />
            </svg>

            <div ref={textRef}>
              {" "}
              <p className="text-neutral-500 underline decoration-dotted underline-offset-4 ">Turn on the lights</p>
            </div>

            <svg
              ref={svg2Ref}
              width="60"
              height="60"
              viewBox="0 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="100" height="100" fill="transparent" />
              <circle cx="50" cy="50" r="5" fill="orange" />
              <circle
                cx="50"
                cy="50"
                r="10"
                fill="none"
                stroke="white"
                strokeWidth="2"
              />
            </svg>
          </div>

          <div className="flex flex-row items-center gap-4 mt-[20px]">
            <div>
              <h1 className="text-4xl font-bold text-white">HIBERNATION</h1>
            </div>

            <div className="text-gray-300 text-sm w-[500px]">
              <p>
                When Sea Cat is stationary and moored, it becomes the largest
                power bank in the world. In fact, consumption is reduced to a
                minimum and the energy generated can be sold to the quay or to a
                private property. There is enough energy to supply lighting to
                an entire villa.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page7;
