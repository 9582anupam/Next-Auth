// app/api/users/login/route.ts

import { NextResponse } from "next/server";

export async function POST() {
    return NextResponse.json({
        message: "loggedin",
    });
}
