"use client";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { use } from "react";
import { useState, useEffect } from "react";
import axios from "axios";

interface ProfilePageProps {
    params: Promise<{ id: string }>;
}

interface Profile {
    _id: string;
    email: string;
    isAdmin: boolean;
    isVerified: boolean;
    name: string;
    updatedAt: string;
    username: string;
    createdAt: string;
}

const ProfilePage = ({ params }: ProfilePageProps) => {
    const [userData, setUserData] = useState<Profile | null>(null);

    const router = useRouter();
    const { id } = use(params);


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


    const goBack = () => {
        router.push("/profile");
    };

    return (
        <div className="w-full h-screen flex justify-center items-center">
            <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black border drop-shadow-md">
                <h1 className="font-bold text-center text-xl text-neutral-800 dark:text-neutral-200">
                    Profile Details
                </h1>
                <Card>
                    <CardHeader>
                        <CardTitle>User ID: {id}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {userData ? (
                            <div>
                                <p><strong>Name:</strong> {userData.name}</p>
                                <p><strong>Email:</strong> {userData.email}</p>
                                <p><strong>Username:</strong> {userData.username}</p>
                                <p><strong>Admin:</strong> {userData.isAdmin ? "Yes" : "No"}</p>
                                <p><strong>Verified:</strong> {userData.isVerified ? "Yes" : "No"}</p>
                                <p><strong>Created At:</strong> {new Date(userData.createdAt).toLocaleString()}</p>
                                <p><strong>Updated At:</strong> {new Date(userData.updatedAt).toLocaleString()}</p>
                            </div>
                        ) : (
                            <p>Loading...</p>
                        )}
                    </CardContent>
                </Card>
                <Button className="mt-4 w-full" onClick={goBack}>
                    Back to Profile
                </Button>
            </div>
        </div>
    );
};

export default ProfilePage;
