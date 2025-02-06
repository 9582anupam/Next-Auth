import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {

    const path = request.nextUrl.pathname;

    const publicPaths = path === "/login" || path === "/signup" || path === "/verifyemail";

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value || "";
    console.log("token", token);

    if (publicPaths && token) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    if (!publicPaths && !token) {
        return NextResponse.redirect(new URL("/login", request.url));
    }
    
    
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ["/login", "/signup", "/verifyemail"], 
};
