"use client"

import Link from "next/link";
import React, { useState } from "react";
import logo from "./logo.png"
import "./Navbar.css"

const Navbar = () => {

    return (
        <nav>
            <div className="flex items-center gap-2 ml-2 md:ml-4 md:h-20">
                <Link href="/">
                    <img src={logo.src} alt="" className="mr-2 w-10 h-10 md:w-16 md:h-16" />
                </Link>
                <div className="md:flex pb-1 md:gap-4">
                    <h1 className="text-ctext text-lg md:text-3xl">TTRPG Editor</h1>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;