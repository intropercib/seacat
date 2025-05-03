import React from "react";
import CenterMenu from "../components/CenterMenu";

const PageSkeleton = ({
  openSidebar,
  isSidebarOpen,
  squareRotation,
  menuTextContainerClassName,
  menuTitle,
  menuSubtitle
}) => {
  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <div
        className={`flex-shrink-0 z-10`}
      >
        <CenterMenu
          onOpenSidebar={openSidebar}
          isSidebarOpen={isSidebarOpen}
          squareRotation={squareRotation}
          menuTextContainerClassName={menuTextContainerClassName}
          menuTitle={menuTitle}
          menuSubtitle={menuSubtitle}
        />
      </div>
    </div>
  );
};

export default PageSkeleton;
