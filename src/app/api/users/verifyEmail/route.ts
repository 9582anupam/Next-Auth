import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";

connect();

export const POST = async(request: NextRequest) => {
    try {
        console.log("Request received");
        const reqBody = await request.json();
        const { token } = reqBody;
        console.log(token);

        const user = await User.findOne({
            verifyToken: token,
            verifyTokenExpiry: {
                $gt: Date.now(),
            },
        });

        if (!user) {
            return NextResponse.json(
                { success: false, error: "Invalid or expired token" },
                { status: 400 }
            );
        }

        console.log(user);

        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;

        await user.save();

        return NextResponse.json(
            {
                success: true,
                message: "Email verified successfully",
            },
            { status: 200 }
        );
    } catch (err:any) {
        console.log(err);
        return NextResponse.json(
            { success: false, error: err.message },
            { status: 500 }
        );
    }
};

