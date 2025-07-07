"use client";

import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import { usePathname } from "next/navigation";
import { AppDispatch, RootState } from "@/lib/store";
import { useDispatch, useSelector } from "react-redux";
import { setShowInfo } from "@/lib/features/main/mainSlice";
import MDEditor from "@uiw/react-md-editor";

const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {

    const dispatch: AppDispatch = useDispatch();
    const showInfo = useSelector((state: RootState) => state.mainData.showInfo);
    const [sidebarMove, setSidebarMove] = useState(false);
    const pathname = usePathname();

    // Inside LayoutWrapper
    const shouldHideUI = pathname === "/" || pathname === "/login";
    const [lol, setLol]= useState("");

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

                    {showInfo && (
                        <div>
                            <div
                                className="fixed inset-0 bg-black bg-opacity-50 z-10"
                                onClick={() => dispatch(setShowInfo(false))}
                            />
                            <div className="z-20 bg-blackButtonBackground border  border-sec shadow-md shadow-sec rounded-lg 
                            fixed right-4 top-24 w-[680px] h-[800px]  resize-none"
                            >
                                <MDEditor className="text-white!" value={lol} onChange={(e) => setLol(e ?? "")} />
                            </div>
                        </div>

                    )}

                    {children}

                </div>
            </div>
        </>
    );
}

export default LayoutWrapper;