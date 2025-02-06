"use client";
// import Image from "next/image";
// import Router from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const loginCheck = async () => {
            // Check if the user is logged in
            // const cookieStore = await cookies();
            // const token = cookieStore.get("token");
            const token = document.cookie.split(";").find((cookie) => cookie.includes("token"));
            console.log(token);
            if (token) {
                setIsLoggedIn(true);
            }
        };
        loginCheck();
    }, []);

    const logout = async () => {
        try {
            await axios.get("api/users/logout");
            console.log("User logged out");
            window.location.href = "/";
        } catch (error) {
            console.error("Error logging out user", error);
        }
    };


    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
                <div className="flex gap-4 items-center flex-col sm:flex-row">
                    {isLoggedIn ? (
                        <div className="flex gap-4">
                            <Link
                                className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
                                href="/profile">
                                Profile
                            </Link>
                            <Link
                                className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
                                onClick={logout}
                                href="/">
                                Logout
                            </Link>
                        </div>
                    ) : (
                        <div className="flex gap-4">
                            <Link
                                className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
                                href="/login">
                                Login
                            </Link>
                            <Link
                                className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
                                href="/signup">
                                Signup
                            </Link>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
