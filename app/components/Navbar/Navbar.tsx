"use client"

import Link from "next/link";
import React from "react";
import logo from "../../../public/logo.png"
import dh from "../../../public/dh.png"
import swn from "../../../public/swn.png"
import "./Navbar.css"
import { signOut, useSession } from "next-auth/react";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from "@/lib/store";
import { updateLocks } from '@/lib/features/main/mainSlice';
import { Lock, Unlock, Archive, FileText } from "@deemlol/next-icons";

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
                <button className="text-xl px-3 py-4 rounded-lg m-3" onClick={() => handleSignOut()}>
                    {session?.user?.name} | Sign out
                </button>
            );
        }

    }

    return (
        <nav>
            <div className="flex justify-between w-full items-center gap-2 ml-2 md:ml-4 md:h-20 pr-10">
                
                {/*Left Side*/}
                <div className="flex items-center">
                    <Link href="/">
                        <img src={logo.src} alt="" className="mr-2 w-10 h-10 md:w-16 md:h-16" />
                    </Link>

                    <div className="md:flex pb-1 md:gap-4 md:mr-20">
                        <h1 className="text-ctext text-lg md:text-3xl">TTRPG Editor</h1>
                    </div>

                    <div className="flex items-center gap-5">
                        <button
                            onClick={() => window.open('https://5e.tools/', '_blank')}
                            className="p-3">
                            {
                                <img
                                    src="https://gitlab.com/uploads/-/system/project/avatar/41385849/favicon-256x256.png"
                                    alt="Custom Icon"
                                    className="size-10"
                                />
                            }
                        </button>

                        <button
                            onClick={() => window.open('https://tesera.ru/images/items/2287258/stars-without-number-revised_free_edition.pdf', '_blank')}
                            className="p-3">
                            {
                                <img
                                    src={swn.src}
                                    alt="Custom Icon"
                                    className="w-24 h-10"
                                />
                            }
                        </button>

                        <button
                            onClick={() => window.open('https://www.daggerheart.com/wp-content/uploads/2025/05/DH-SRD-May202025.pdf', '_blank')}
                            className="p-2">
                            {
                                <img
                                    src={dh.src}
                                    alt="Custom Icon"
                                    className="size-12"
                                />
                            }
                        </button>
                    </div>

                </div>

                {/*Right Side*/}
                <div className="flex items-center gap-5">

                    <button
                        className="text-lg px-2 pb-1 ">
                        {
                            <div className="flex flex-col text-center items-center">
                                <h1>Notes</h1>
                                <div className="relative w-6 h-7">
                                    <FileText
                                        size={26}
                                    />
                                </div>
                            </div>
                        }
                    </button>

                    <button
                        className="text-lg px-2 pb-1 ">
                        {
                            <div className="flex flex-col text-center items-center">
                                <h1>Saves</h1>
                                <div className="relative w-6 h-7">
                                    <Archive
                                        size={26}
                                    />
                                </div>
                            </div>
                        }
                    </button>

                    <button
                        onClick={() => dispatch(updateLocks({ key: 'deleteLock', value: !locks.deleteLock }))}
                        className="text-lg px-2 pb-1 ">
                        {
                            <div className="flex flex-col text-center items-center">
                                <h1>Delete Lock</h1>
                                <div className="relative w-8 h-7">
                                    <Lock
                                        size={26}
                                        className={`absolute inset-0 transition-all duration-300 ${locks.deleteLock ? 'opacity-100 scale-100 text-white' : 'opacity-0 scale-75 text-sec'}`}
                                    />
                                    <Unlock
                                        size={26}
                                        className={`absolute inset-0 transition-all duration-300 ${locks.deleteLock ? 'opacity-0 scale-75 text-sec' : 'opacity-100 scale-100 text-sec'}`}
                                    />
                                </div>
                            </div>
                        }
                    </button>

                    <button
                        onClick={() => dispatch(updateLocks({ key: 'labelLock', value: !locks.labelLock }))}
                        className="text-lg px-2 pb-1 ">
                        {
                            <div className="flex flex-col text-center items-center">
                                <h1>Label Lock</h1>
                                <div className="relative w-8 h-7">
                                    <Lock
                                        size={26}
                                        className={`absolute inset-0 transition-all duration-300 ${locks.labelLock ? 'opacity-100 scale-100 text-white' : 'opacity-0 scale-75 text-sec'}`}
                                    />
                                    <Unlock
                                        size={26}
                                        className={`absolute inset-0 transition-all duration-300 ${locks.labelLock ? 'opacity-0 scale-75 text-sec' : 'opacity-100 scale-100 text-sec'}`}
                                    />
                                </div>
                            </div>

                        }
                    </button>

                    <button
                        onClick={() => dispatch(updateLocks({ key: 'inputLock', value: !locks.inputLock }))}
                        className="text-lg px-2 pb-1 ">
                        {
                            <div className="flex flex-col text-center items-center">
                                <h1>Input Lock</h1>
                                <div className="relative w-8 h-7">
                                    <Lock
                                        size={26}
                                        className={`absolute inset-0 transition-all duration-300 ${locks.inputLock ? 'opacity-100 scale-100 text-white' : 'opacity-0 scale-75 text-sec'}`}
                                    />
                                    <Unlock
                                        size={26}
                                        className={`absolute inset-0 transition-all duration-300 ${locks.inputLock ? 'opacity-0 scale-75 text-sec' : 'opacity-100 scale-100 text-sec'}`}
                                    />
                                </div>
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