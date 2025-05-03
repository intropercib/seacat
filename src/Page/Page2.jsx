import React from "react";
import PageSkeleton from "./PageSkeleton";

export const Page2SidebarContent = () => (
  <>
    <h1 className="text-lg font-semibold mb-4">Page 2: Overview</h1>
    <p className="text-sm text-gray-300 mb-4">
      This is the default sidebar content for Page 2. Explore the initial
      details of the Seacat experience.
    </p>
    <p className="text-sm text-gray-300 mb-4">
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. In explicabo nam
      eaque? Aliquid praesentium iste tempore debitis amet soluta quas eaque
      cumque, explicabo voluptas repellendus laborum, exercitationem laboriosam
      ut dolore quibusdam voluptates veritatis ipsa earum odit harum eum sunt
      illo.
    </p>
    <p className="text-sm text-gray-300 mb-4">
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. In explicabo nam
      eaque? Aliquid praesentium iste tempore debitis amet soluta quas eaque
      cumque, explicabo voluptas repellendus laborum, exercitationem laboriosam
      ut dolore quibusdam voluptates veritatis ipsa earum odit harum eum sunt
      illo.
    </p>
    <p className="text-sm text-gray-300 mb-4">
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. In explicabo nam
      eaque? Aliquid praesentium iste tempore debitis amet soluta quas eaque
      cumque, explicabo voluptas repellendus laborum, exercitationem laboriosam
      ut dolore quibusdam voluptates veritatis ipsa earum odit harum eum sunt
      illo.
    </p>
    <p className="text-sm text-gray-300 mb-4">
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. In explicabo nam
      eaque? Aliquid praesentium iste tempore debitis amet soluta quas eaque
      cumque, explicabo voluptas repellendus laborum, exercitationem laboriosam
      ut dolore quibusdam voluptates veritatis ipsa earum odit harum eum sunt
      illo.
    </p>
  </>
);

const Page2 = ({ isSidebarOpen, openSidebar, closeSidebar }) => {
  return (
    <div>
      <PageSkeleton
        isSidebarOpen={isSidebarOpen}
        openSidebar={openSidebar}
        closeSidebar={closeSidebar}
        menuTitle="Electric Mode"
        menuSubtitle="Pure Adventure"
        squareRotation={0}
        menuTextContainerClassName="-top-12 left-[80px] text-left"
      />
    </div>
  );
};

export default Page2;
