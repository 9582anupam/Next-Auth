import { connect } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";

connect();

export const GET = async () => {
    try {

        const response = NextResponse.json({
            message: "Logout successful",
            status: 200,
            success: true,
        });

        response.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(0),
        });

        return response;
        
        
    } catch (error: any) {
        console.log(error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
};
