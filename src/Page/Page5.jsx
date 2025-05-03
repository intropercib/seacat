import React from "react";
import PageSkeleton from "./PageSkeleton";

export const Page5SidebarContent = () => (
  <>
    <h1 className="text-lg font-semibold mb-4">Page 5: Deck Spaces</h1>
    <p className="text-sm text-gray-300 mb-4">
      Experience the expansive outdoor living areas. Page 5 focuses on the sun decks, lounges, and dining spaces.
    </p>
    <p className="text-sm text-gray-300 mb-4">
      Enjoy panoramic views and seamless connection with the sea.
    </p>
  </>
);

const Page5 = ({ isSidebarOpen, openSidebar, closeSidebar }) => {
  return (
    <div>
      <PageSkeleton
        isSidebarOpen={isSidebarOpen}
        openSidebar={openSidebar}
        closeSidebar={closeSidebar}
        squareRotation={270}
        menuTextContainerClassName="-top-14 right-[70px] text-right"
        menuTitle="The Double Hull"
        menuSubtitle="Movement and Stability"
      />
    </div>
  );
};

export default Page5;
