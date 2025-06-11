"use client"

import { signIn } from "next-auth/react";

const Login = () => {

    const handleSignInGoogle = () => {
        const callbackUrl = `${window.location.origin}/home`;
        return signIn('google', { callbackUrl });
    };

    return (
        <div>
                <button
                    className="btn-land text-xl px-4 md:px-6 py-3 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
                    onClick={handleSignInGoogle}
                >
                    Sign in with Google
                </button>
        
        </div>
    )
}

export default Login