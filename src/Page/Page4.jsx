import React from "react";
import PageSkeleton from "./PageSkeleton";

export const Page4SidebarContent = () => (
  <>
    <h1 className="text-lg font-semibold mb-4">Page 4: Interior Design</h1>
    <p className="text-sm text-gray-300 mb-4">
      Step inside the luxurious cabins and saloons. Page 4 showcases the bespoke
      interior craftsmanship.
    </p>
    <p className="text-sm text-gray-300 mb-4">
      Materials, layout, and amenities are detailed here, highlighting comfort
      and style.
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

const Page4 = ({ isSidebarOpen, openSidebar, closeSidebar }) => {
  return (
    <div>
      <PageSkeleton
        isSidebarOpen={isSidebarOpen}
        openSidebar={openSidebar}
        closeSidebar={closeSidebar}
        squareRotation={180}
        menuTextContainerClassName="top-10 right-[100px] text-right"
        menuTitle="The New Route Of Design"
        menuSubtitle="The Profile Of A Dream"
      />
    </div>
  );
};

export default Page4;
