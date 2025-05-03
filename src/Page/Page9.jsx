import React, { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";

const Page9 = () => {
  const containerRef = useRef(null);
  const h1Ref = useRef(null);
  const p1Ref = useRef(null);
  const p2Ref = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from([h1Ref.current, p1Ref.current, p2Ref.current], {
        y: 30,
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative h-full w-full overflow-hidden">
      <div className="absolute bottom-[80px] px-[80px]" ref={containerRef}>
        <h1 ref={h1Ref} className="text-4xl mb-2">
          AI and Infotainment
        </h1>
        <div className="flex flex-row justify-around w-full gap-[40px] text-neutral-400">
          <div ref={p1Ref}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel non
            aperiam eum rem a molestiae vero expedita, modi quaerat asperiores
            ex pariatur debitis iusto ab impedit, optio dolores beatae culpa
            alias aspernatur aut voluptatem! Ipsam, nisi consequuntur?
            Similique, voluptatum perspiciatis. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Vitae doloremque neque explicabo sit
            a, nesciunt, quod earum saepe iste adipisci aspernatur placeat odio,
            cum pariatur et eum rerum! Facere inventore rerum, error facilis
            similique provident sapiente ex animi debitis labore.
          </div>
          <div ref={p2Ref}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iste,
            beatae nihil itaque quos impedit dolorem, deleniti, quae
            exercitationem explicabo deserunt magni reprehenderit commodi quidem
            laboriosam officia sint asperiores culpa eaque maxime eius odit?
            Neque, labore dicta culpa aliquam sit dolorem? Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Ipsam doloremque laudantium natus
            reiciendis, doloribus velit ratione placeat quae odio numquam
            excepturi harum ex reprehenderit aspernatur voluptatem repellendus
            ullam. Accusamus molestiae nesciunt hic cumque laborum illum
            aspernatur ex, ratione in delectus.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page9;
