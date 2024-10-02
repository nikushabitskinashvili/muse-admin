import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose"; // Import jose for decoding the token
const AUTH_COOKIE_KEY =  'auth'

// Utility function to decode and verify JWT
async function verifyToken(token: string) {
    const secret = new TextEncoder().encode("daculiparoli"); // Use your actual secret key
    try {
        const { payload } = await jwtVerify(token, secret);
        return payload;
    } catch (error) {
        console.error("Invalid token:", error);
        return null;
    }
}

export async function middleware(request: NextRequest) {
    const cookieStore = cookies();
    const cookie = cookieStore.get(AUTH_COOKIE_KEY);
    const { pathname } = request.nextUrl;

    if (!cookie?.value && !pathname.startsWith("/auth/login") && !pathname.startsWith("/auth/signup")) {
        return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    if (cookie?.value && (pathname.startsWith("/auth/login") || pathname.startsWith("/auth/signup"))) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    if (cookie?.value) {
        const token = cookie.value;
        const decodedToken = await verifyToken(token);

        if(decodedToken.role !== "admin" || decodedToken.role === "Admin") {
            throw new Error("Invalid token:", decodedToken);
        }

        if (decodedToken && decodedToken.blocked) {
            const response = NextResponse.redirect(new URL("/auth/login?error=blocked", request.url));
            response.cookies.set(AUTH_COOKIE_KEY, '', { expires: new Date(0), path: '/' });
            return response;
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
