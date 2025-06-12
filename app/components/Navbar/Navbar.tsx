"use client"

import Link from "next/link";
import React from "react";
import logo from "./logo.png"
import "./Navbar.css"
import { signOut, useSession } from "next-auth/react";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from "@/lib/store";
import { updateLocks } from '@/lib/features/main/mainSlice';
import { Lock, Unlock } from "@deemlol/next-icons";

const Navbar = () => {

    //Redux
    const dispatch: AppDispatch = useDispatch();
    const locks = useSelector((state: RootState) => state.mainData.locks);

    const handleSignOut = () => {
        const callbackUrl = `${window.location.origin}/`;
        return signOut({ callbackUrl });
    }

    const AuthButton = (): any => {
        const { data: session } = useSession();

        if (session) {
            return (
                <button className="text-xl p-3 rounded-lg m-3" onClick={() => handleSignOut()}>
                    {session?.user?.name} | Sign out
                </button>
            );
        }

    }

    return (
        <nav>
            <div className="flex justify-between w-full items-center gap-2 ml-2 md:ml-4 md:h-20 pr-10">
                <div className="flex items-center">
                    <Link href="/">
                        <img src={logo.src} alt="" className="mr-2 w-10 h-10 md:w-16 md:h-16" />
                    </Link>
                    <div className="md:flex pb-1 md:gap-4">
                        <h1 className="text-ctext text-lg md:text-3xl">TTRPG Editor</h1>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => dispatch(updateLocks({ key: 'labelLock', value: !locks.labelLock }))}
                        className="text-lg px-2 py-1 ">
                        {
                            <div className="flex flex-col text-center items-center">
                                <h1>Label Lock</h1>
                                {locks.labelLock ? (
                                    <Lock size={26} color="#FFFFFF" />
                                ) : (<Unlock size={26} color="#FFFFFF" />)}
                            </div>
                        }
                    </button>
                    <AuthButton />
                </div>

            </div>
        </nav>
    );
};

export default Navbar;