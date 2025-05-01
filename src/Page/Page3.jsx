import React from "react";
import PageSkeleton from "./PageSkeleton";

const Page3SidebarContent = () => (
  <>
    <h1 className="text-lg font-semibold mb-4">Page 3: Advanced Features</h1>
    <p className="text-sm text-gray-300 mb-4">
      Discover the cutting-edge technology integrated into the Seacat. Page 3 details the hybrid propulsion system.
    </p>
    <p className="text-sm text-gray-300 mb-4">
      Explore energy efficiency and reduced environmental impact. Learn about the silent electric cruising capabilities.
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
        sidebarContent={<Page3SidebarContent />}
        squareRotation={90}
        menuTextContainerClassName="top-16 left-[90px] text-left"
        menuTitle="Imagine The Unthinkable" 
        menuSubtitle="The New Way of Comfort" 
      />
    </div>
  );
};

export default Page3;
