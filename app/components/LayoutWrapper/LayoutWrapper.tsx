"use client";

import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";

const LayoutWrapper = ({children}:{children: React.ReactNode}) => {

    const [sidebarMove, useSidebarMove] = useState(false);

    return (
        <div>
            <Navbar />
            <div className='flex h-max'>
                <div>
                    <Sidebar
                        sidebarMove={sidebarMove}
                        sidebarExpanded={() => useSidebarMove(true)}
                        sidebarReduce={() => useSidebarMove(false)}
                    />
                   
                </div>
                <div className="flex-1">
                     {sidebarMove && (
                        <div
                            className={` fixed inset-x-48 w-full h-full bg-black bg-opacity-50 z-20 `}
                            onClick={() => useSidebarMove(false)}
                        />
                    )}
                    {children}
                </div>
            </div>
        </div>
    )
}

export default LayoutWrapper