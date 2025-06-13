import React from "react";
import "./Sidebar.css"
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from "@/lib/store";

type SidebarProps = {
    sidebarMove: boolean;
    sidebarExpanded: () => void;
    sidebarReduce: () => void;
}


const Sidebar = ({ sidebarMove, sidebarExpanded, sidebarReduce }: SidebarProps) => {
    //Redux
    const dispatch: AppDispatch = useDispatch();
    const basicsData = useSelector((state: RootState) => state.mainData.basicsData);

    return (
        <nav className={` ${sidebarMove ? "sidebarExp" : "sidebar"}`}>
            <div className="sidebarContent">
                <button
                    onMouseOver={sidebarExpanded}
                    onMouseOut={sidebarReduce}
                    className="sidebarButton"
                >
                    <img
                        src={basicsData.imageUrl}
                        alt="Custom Icon"
                        className="size-10"
                    />
                </button>
            </div>
        </nav>
    );
}

export default Sidebar;