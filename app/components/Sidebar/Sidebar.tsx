import React from "react";
import "./Sidebar.css"


type SidebarProps = {
    sidebarMove: boolean;
    sidebarExpanded: () => void;
    sidebarReduce: () => void;
}


const Sidebar = ({ sidebarMove, sidebarExpanded, sidebarReduce }: SidebarProps) => (
    
    <nav className={` ${sidebarMove ? "sidebarExp" : "sidebar"}`}>
        <div className="sidebarContent">
            <button onMouseOver={sidebarExpanded} onMouseOut={sidebarReduce} className="sidebarButton">First</button>
            <button onMouseOver={sidebarExpanded} onMouseOut={sidebarReduce} className="sidebarButton">Second</button>
            <button onMouseOver={sidebarExpanded} onMouseOut={sidebarReduce} className="sidebarButton">Third</button>
            <button onMouseOver={sidebarExpanded} onMouseOut={sidebarReduce} className="sidebarButton">da</button>
            <button onMouseOver={sidebarExpanded} onMouseOut={sidebarReduce} className="sidebarButton">da</button>
        </div>
    </nav>
);

export default Sidebar;