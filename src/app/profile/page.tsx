"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface Profile {
    _id: string;
    email: string;
    isAdmin: boolean;
    isVerified: boolean;
    name: string;
    updatedAt: string;
    username: string;
}

const Profile = () => {
    const [userData, setUserData] = useState<Profile | null>(null);
    const router = useRouter();

    useEffect(() => {
        // Fetch user data using an API endpoint
        const fetchUserData = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/users/me");
                console.log("User data", response.data);
                setUserData(response.data.user);
            } catch (error) {
                console.error("Error fetching user data", error);
            }
        };
        fetchUserData();
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

    const goToProfilePage = () => {
        router.push(`/profile/${userData?._id}`);
    };

    return (
        <div className="w-full h-screen flex justify-center items-center">
            <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black border drop-shadow-md">
                <h1 className="font-bold text-center text-xl text-neutral-800 dark:text-neutral-200">
                    Profile Page
                </h1>
                <p className="text-center text-neutral-800 dark:text-neutral-200 mb-4">
                    Welcome to your profile page.
                </p>
                <Button className="mt-4 w-full" onClick={goToProfilePage}>
                    Go to Profile Details
                </Button>
                <Button className="mt-4 w-full" onClick={logout}>
                    Logout
                </Button>
            </div>
        </div>
    );
};

export default Profile;
