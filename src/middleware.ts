import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from 'jose';
import { secret } from "./services/secret";

const secretKey = new TextEncoder().encode(secret);

export async function middleware(request: NextRequest) {
    const currentUser = request.cookies.get('currentUser')?.value;

    // Skip middleware for static assets
    if (isStaticAsset(request)) {
        return NextResponse.next();
    }

    if (!currentUser) {
        return handleNoCurrentUser(request);
    }

    return await handleUserCredentials(request, currentUser);
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
    ],
};

function isStaticAsset(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const staticFileExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.svg', '.ico', '.css', '.js'];
    return staticFileExtensions.some(extension => pathname.endsWith(extension));
}

function handleNoCurrentUser(request: NextRequest) {
    if (request.nextUrl.pathname === '/login') {
        return NextResponse.next();
    }
    return redirectToLogin(request);
}

async function handleUserCredentials(request: NextRequest, currentUser: string) {
    try {
        const user = JSON.parse(currentUser);
        const decoded = await jwtVerify(user.accessToken, secretKey);
        if (isPayloadValid(decoded.payload, user)) {
            return handleRedirectBasedOnUser(request, user);
        } else {
            return redirectToLogin(request);
        }
    } catch (error) {
        console.error('Error while verifying token:', error);
        return redirectToLogin(request);
    }
}

function handleRedirectBasedOnUser(request: NextRequest, user: any) {
    if (request.nextUrl.pathname === '/') {
        return NextResponse.redirect(new URL('/login', request.url));
    }
    if (request.nextUrl.pathname === '/login' && user.profile === 'admin') { // on admin login redirect to dashboard
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    if (request.nextUrl.pathname === '/login' && user.profile === 'user') { // on user login redirect to userplatform
        return NextResponse.redirect(new URL('/userplatform/courses', request.url));
    }
    if (user.profile === 'user' && !request.nextUrl.pathname.includes("userplatform")) { // if user changed url redirect him bach to userplatform 
        return NextResponse.redirect(new URL('/userplatform/courses', request.url));
    }
    if (user.profile === 'admin' && request.nextUrl.pathname.includes("userplatform")) { // if admin entered userplatform redirect him back to dashboard
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    return NextResponse.next();
}

function redirectToLogin(request: NextRequest) {
    const response = NextResponse.redirect(new URL('/login', request.url));
    response.cookies.delete('currentUser');
    return response;
}

function isPayloadValid(payload: any, user: any) {
    return (
        payload._id === user._id &&
        payload.name === user.name &&
        payload.profile === user.profile
    );
}
