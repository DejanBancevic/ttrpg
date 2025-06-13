"use client";

import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import { usePathname } from "next/navigation";

const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {

    const [sidebarMove, useSidebarMove] = useState(false);
    const pathname = usePathname();

    // Hide Sidebar on login page (and optionally other public pages)
    const shouldHideSidebar = pathname === "/" || pathname === "/login";
    // Inside LayoutWrapper
    const shouldHideUI = pathname === "/" || pathname === "/login";

    return (
        <>
            {!shouldHideUI && <Navbar />}
            <div className="flex h-max">
                {!shouldHideUI && (
                    <Sidebar
                        sidebarMove={sidebarMove}
                        sidebarExpanded={() => useSidebarMove(true)}
                        sidebarReduce={() => useSidebarMove(false)}
                    />
                )}
                <div className="flex-1 relative">
                    {sidebarMove && (
                        <div
                            className="fixed inset-0 bg-black bg-opacity-50 z-20"
                            onClick={() => useSidebarMove(false)}
                        />
                    )}
                    {children}
                </div>
            </div>
        </>
    );
}

    export default LayoutWrapper;