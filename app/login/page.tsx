"use client"

import { signIn } from "next-auth/react";

const Login = () => {

    const handleSignInGoogle = () => {
        const callbackUrl = `${window.location.origin}/home`;
        return signIn('google', { callbackUrl });
    };

    return (
        <div className="flex-col text-center py-6 px-6 md:ml-0 md:px-20 md:mt-[90px] ml-12">
                <button
                className="text-xl p-4"
                    onClick={handleSignInGoogle}
                >
                    Sign in with Google
            </button>
       
        
        </div>
    )
}

export default Login