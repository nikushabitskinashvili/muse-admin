import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const AUTH_COOKIE_KEY = 'auth';
function decodeToken(token:string) {
    try {
      const parts = token.split(".");
      
      if (parts.length !== 3) {
        throw new Error("Invalid token format");
      }
  
      const payload = parts[1];
      
      const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
      const decodedPayload = JSON.parse(atob(base64));
      
      return decodedPayload; 
    } catch (error) {
      console.error("Failed to decode token:", error);
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

        const decodedToken = decodeToken(token);
        if (decodedToken && decodedToken.role !== "admin") {
            const response = NextResponse.redirect(new URL("/auth/login?error=unAuthorized", request.url));
            response.cookies.set(AUTH_COOKIE_KEY, '', { expires: new Date(0), path: '/' });
            return response;
          }

    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/Public|icons|images|favicon.ico|.*\\.svg).*)"]
};
