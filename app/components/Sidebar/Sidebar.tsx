import React from "react";
import "./Sidebar.css"



type Props = {};

const Sidebar = (props: Props) => (
    <nav className="sidebar">
        <div className="sidebarContent">
            <button className="sidebarButton">John Johnson</button>
            <button className="sidebarButton">Doug Raw</button>
            <button className="sidebarButton">Lace Max</button>
            <button className="sidebarButton">Sunny Jim</button>
            <button className="sidebarButton">Ruvic Coldwin</button>
        </div>
    </nav>
);

export default Sidebar;