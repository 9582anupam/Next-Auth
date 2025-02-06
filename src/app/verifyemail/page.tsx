"use client";
import axios from "axios";
import { useState } from "react";
import { useSearchParams } from 'next/navigation';

export default function VerifyEmail() {
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    const [message, setMessage] = useState("");

    const verifyEmailSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post("api/users/verifyEmail", { token });
            console.log("Response from verifyEmail", response);
            setMessage("Email verified successfully!");
        } catch (error) {
            setMessage("Failed to verify email.");
            console.error("Error verifying email", error);
        }
    };

    return (
        <div className="w-full h-screen flex justify-center items-center">
            <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black border drop-shadow-md">
                <h2 className="font-bold text-center text-xl text-neutral-800 dark:text-neutral-200">
                    Verify Your Email
                </h2>
                <form className="my-8" onSubmit={verifyEmailSubmit}>
                    <button
                        className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                        type="submit">
                        Verify Email &rarr;
                        <BottomGradient />
                    </button>
                </form>
                {message && (
                    <p className="text-center text-neutral-800 dark:text-neutral-200 mt-4">
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
}

const BottomGradient = () => {
    return (
        <>
            <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
            <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
        </>
    );
};
