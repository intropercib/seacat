import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import imgL01 from "../assets/l01.png";
import imgL02 from "../assets/l02.png";
import imgL03 from "../assets/l03.png";
import imgL04 from "../assets/l04.png";
import Footer from "../components/Footer";

const Page10 = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".text-line", {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      });

      gsap.from(".anim-img", {
        scale: 0.8,
        opacity: 0,
        duration: 1.5,
        ease: "power2.out",
        stagger: 0.2,
        delay: 0.5,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <div
        className="w-full flex flex-col items-center pt-[100px] pb-[100px] min-h-screen"
        ref={containerRef}
      >
        <div className="text-6xl uppercase flex flex-col justify-center items-center mb-10">
          <div>
            <p className="text-line">Follow</p>
            <p className="text-line">the green</p>
            <p className="text-line">star</p>
          </div>
        </div>

        <div className="mt-[3rem] mb-[14rem]">
          <div className="mt-[4.5rem] mb-[6rem] relative">
            <div className="relative">
              <div className="h-[200px] w-[300px] absolute -top-[100px] -left-[100px] bg-gray-800 z-30 anim-img">
                <img
                  src={imgL01}
                  alt="img"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="h-[500px] w-[700px] object-cover bg-gray-700 flex items-center justify-center z-20 anim-img">
                <img
                  src={imgL02}
                  alt="img"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="h-[200px] w-[300px] absolute top-[100px] -right-[100px] bg-gray-800 z-30 anim-img">
                <img
                  src={imgL03}
                  alt="img"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="h-[200px] w-[400px] absolute -bottom-[190px] right-0 bg-black p-4 z-30 anim-img">
                <h1 className="text-3xl uppercase text-orange-500">
                  Triple Zero
                </h1>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit Lorem
                  ipsum dolor sit, amet consectetur adipisicing elit. Eveniet ex
                  enim, culpa possimus quia omnis architecto consectetur fugiat
                  voluptates dolore necessitatibus eos ipsum, error soluta nisi
                  expedita harum voluptas quasi.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-[300px] relative">
            <div className="relative">
              <div className="h-[200px] w-[300px] absolute -top-[100px] -left-[100px] bg-gray-800 z-30 anim-img">
                <img
                  src={imgL04}
                  alt="img"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="h-[500px] w-[700px] object-cover bg-gray-700 flex items-center justify-center z-20 anim-img">
                <img
                  src={imgL02}
                  alt="img"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="h-[200px] w-[300px] absolute top-[100px] -right-[100px] bg-gray-800 anim-img">
                <img
                  src={imgL01}
                  alt="img"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="h-[200px] w-[400px] absolute -bottom-[190px] left-0 bg-black p-4 anim-img">
                <h1 className="text-3xl uppercase text-orange-500">
                  Triple Zero
                </h1>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit Lorem
                  ipsum dolor sit amet consectetur adipisicing elit. Distinctio
                  dicta, voluptates vitae excepturi dolores accusantium saepe
                  nihil voluptate molestiae dolorum impedit vero ipsa doloremque
                  sequi est facilis quo corporis reprehenderit!
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-4xl uppercase text-center mb-10 text-line">
          <h1>BECAUSE SEA CAT IS NOT JUST A CATAMARAN.</h1>
          <h1>IT'S THE JOURNEY YOU HAVE YET TO TAKE. THE</h1>
          <h1>BEST.</h1>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Page10;
