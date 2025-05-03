import React from "react";
import PageSkeleton from "./PageSkeleton";

export const Page3SidebarContent = () => (
  <>
    <h1 className="text-lg font-semibold mb-4">Page 3: Advanced Features</h1>
    <p className="text-sm text-gray-300 mb-4">
      Discover the cutting-edge technology integrated into the Seacat. Page 3
      details the hybrid propulsion system.
    </p>
    <p className="text-sm text-gray-300 mb-4">
      Explore energy efficiency and reduced environmental impact. Learn about
      the silent electric cruising capabilities.
    </p>
    <p className="text-sm text-gray-300 mb-4">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis, quis alias
      assumenda maiores dolore deleniti velit dicta optio accusamus facilis
      recusandae neque magni ex in magnam soluta laboriosam vero quo quas
      tenetur, error placeat nulla. Natus optio eius quaerat animi.{" "}
    </p>
    <p className="text-sm text-gray-300 mb-4">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos perferendis,
      aliquam libero assumenda totam quod rem, voluptas veritatis aspernatur
      iusto eius fuga earum, ratione similique accusamus esse illo corporis et.{" "}
    </p>
    <p className="text-sm text-gray-300 mb-4">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos perferendis,
      aliquam libero assumenda totam quod rem, voluptas veritatis aspernatur
      iusto eius fuga earum, ratione similique accusamus esse illo corporis et.{" "}
    </p>
    <p className="text-sm text-gray-300 mb-4">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos perferendis,
      aliquam libero assumenda totam quod rem, voluptas veritatis aspernatur
      iusto eius fuga earum, ratione similique accusamus esse illo corporis et.{" "}
    </p>
  </>
);

const Page3 = ({ isSidebarOpen, openSidebar, closeSidebar }) => {
  return (
    <div>
      <PageSkeleton
        isSidebarOpen={isSidebarOpen}
        openSidebar={openSidebar}
        closeSidebar={closeSidebar}
        squareRotation={90}
        menuTextContainerClassName="top-16 left-[90px] text-left"
        menuTitle="Imagine The Unthinkable"
        menuSubtitle="The New Way of Comfort"
      />
    </div>
  );
};

export default Page3;
