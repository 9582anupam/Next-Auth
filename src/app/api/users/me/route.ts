import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

connect();

export const GET = async () => {
    try {
        // console.log(request.cookies.get("token"));
        // const token = request?.cookies?.get("token")?.value || "";
        const cookieStore = await cookies();
        const token: any = cookieStore.get("token")?.value || "";

        console.log("token2", token);
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
        console.log(decoded);
        const user = await User.findById(decoded.id).select(
            "-password"
        ).
        lean();

        if (!user) {
            return NextResponse.json(
                { success: false, error: "User not found" },
                { status: 400 }
            );
        }

        return NextResponse.json(
            {
                success: true,
                user,
            },
            { status: 200 }
        );
    } catch (error: any) {
        console.error(error);
        return NextResponse.json(
            { success: false, error: error },
            { status: 500 }
        );
    }
};
