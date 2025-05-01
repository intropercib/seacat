import React, { useEffect, useRef, useState } from "react";
import SideBar from "../components/SideBar";
import CenterMenu from "../components/CenterMenu";

const PageSkeleton = ({
  isSidebarOpen,
  openSidebar,
  closeSidebar,
  sidebarContent,
  squareRotation,
  menuTextContainerClassName,
  menuTitle, 
  menuSubtitle 
}) => {
  const [applyHiddenStyles, setApplyHiddenStyles] = useState(false);
  const hideTimeoutRef = useRef(null);

  useEffect(() => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }

    if (isSidebarOpen) {
      hideTimeoutRef.current = setTimeout(() => {
        setApplyHiddenStyles(true);
        hideTimeoutRef.current = null;
      }, 800); 
    } else {
      setApplyHiddenStyles(false);
    }

    return () => {
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  }, [isSidebarOpen]);

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <div
        className={`flex-shrink-0 ${isSidebarOpen ? "z-0" : "z-10"} ${
          applyHiddenStyles ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
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
      <SideBar isOpen={isSidebarOpen} onClose={closeSidebar}>
        {sidebarContent}
      </SideBar>
    </div>
  );
};

export default PageSkeleton;
