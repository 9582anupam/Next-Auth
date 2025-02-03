// app/api/users/login/route.ts
import { connect } from "@/dbConfig/dbConfig";
import { NextResponse, NextRequest } from "next/server";
import User from "@/models/userModel";
import jwt from "jsonwebtoken";

connect();

export const POST = async (request: NextRequest) => {
    try {
        console.log("Request received");
        const reqBody = await request.json();
        const { email, password } = reqBody;

        if (!email || !password) {
            return NextResponse.json(
                { error: "Please provide an email and password" },
                { status: 400 }
            );
        }

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json(
                { error: "Invalid email or password" },
                { status: 400 }
            );
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return NextResponse.json(
                { error: "Invalid email or password" },
                { status: 400 }
            );
        }

        const tokenData = {
            id: user._id,
            name: user.name,
            email: user.email,
        }

        const token = jwt.sign(tokenData, process.env.JWT_SECRET!, {
            expiresIn: "2d",
        });
        console.log("token1", token);

        const response = NextResponse.json({
            message: "Login successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
            },
            status: 200,
            success: true,
        });

        response.cookies.set("token", token, {
            httpOnly: true
        })

        return response;
        
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
