"use client";

import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import { usePathname } from "next/navigation";

const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {

    const [sidebarMove, setSidebarMove] = useState(false);
    const pathname = usePathname();

    // Inside LayoutWrapper
    const shouldHideUI = pathname === "/" || pathname === "/login";

    return (
        <>
            {!shouldHideUI && <Navbar />}
            <div className="flex h-max">
                {!shouldHideUI && (
                    <Sidebar
                        sidebarMove={sidebarMove}
                        sidebarExpanded={() => setSidebarMove(true)}
                        sidebarReduce={() => setSidebarMove(false)}
                    />
                )}
                <div className="flex-1 relative">
                    {sidebarMove && (
                        <div
                            className="fixed inset-0 bg-black bg-opacity-50 z-10"
                            onClick={() => setSidebarMove(false)}
                        />
                    )}

                    {children}

                </div>
            </div>
        </>
    );
}

export default LayoutWrapper;