"use client"

import { signIn } from "next-auth/react";
import Image from "next/image";
import loginVector from '../../public/loginVector.jpg';

const Login = () => {

    const handleSignInGoogle = () => {
        const callbackUrl = `${window.location.origin}/home`;
        return signIn('google', { callbackUrl });
    };

    return (
        <div className=" bg-[url('https://r4.wallpaperflare.com/wallpaper/296/895/796/gradient-digital-art-textured-simple-wallpaper-f2bb6ab5822ee9421d3628866106ad8b.jpg')] 
        bg-cover bg-center
        flex items-center justify-center min-h-screen">
            <div className="flex border border-black rounded-lg border-opacity-0 ">

                <Image
                    className="h-[450px] w-[680px] rounded-s-lg"
                    src={loginVector}
                    alt="Login vector image"
                />
                <div className="flex flex-col rounded-r-lg bg-black border-opacity-0 w-[350px] h-[450px] py-6 px-6">
                    <h1 className="text-xl text-white font-bold">
                        Greetings,
                    </h1>
                    <h1 className="text-3xl text-sec font-bold">
                        Traveler
                    </h1>
                    <h1 className="text-md text-white font-bold mt-10">
                        Welcome to the only TTRPG character sheet editor you'll ever need, made to support almost any type of game.
                    </h1>

                    <h1 className="text-sm text-grayActive text-center font-bold mt-24">
                        New here?
                    </h1>
                    <h1 className="text-sm text-grayActive text-center">
                        Sign up and let the journey begin!
                    </h1>
                    <button className="text-xl p-3 mt-6" onClick={handleSignInGoogle}>
                        Sign in with Google
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Login