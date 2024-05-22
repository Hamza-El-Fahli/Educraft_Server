import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from 'jose';
import {secret} from "./services/secret";
const secretKey = new TextEncoder().encode(secret);
export async function middleware(request: NextRequest) {

    const currentUser = request.cookies.get('currentUser')?.value
    if(request.nextUrl.pathname == '/') 
        return NextResponse.redirect(new URL('/login',request.url))
        if(!!currentUser && request.nextUrl.pathname == '/login') 
            return NextResponse.redirect(new URL('/dashboard',request.url))
    if (!currentUser){
        if(request.nextUrl.pathname == '/login') return NextResponse.next()
        return redirectToLogin(request)}
    else
        return await testuserCredentials(request, currentUser)
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',

    ],
}




function redirectToLogin(request: NextRequest) {
    request.cookies.delete('currentUser') // clear the old cookie

    const response = NextResponse.redirect(new URL('/login', request.url)) // redirect to login
    response.cookies.delete('currentUser') // clear the old cookie

    return response

}

function testPayload(decode: any, currentUser: any) {
    return (decode.payload._id == JSON.parse(currentUser)._id && // id didn't change
        decode.payload.name == JSON.parse(currentUser).name && // username didn't change
        decode.payload.profile == JSON.parse(currentUser).profile && // user profile/privilages didn't change
        (decode.payload.profile.toLowerCase() == 'prof' || decode.payload.profile.toLowerCase() == 'admin')) // admins and profs are allowed , app users not allowed into this server side
}

async function testuserCredentials(request: NextRequest, currentUser: any) { // some test to check intergrity
    try {
        const decode = await jwtVerify(JSON.parse(currentUser).accessToken, secretKey) // decode the cookies
        if (testPayload(decode, currentUser)) // apply some tests
            return NextResponse.next()  // if everything is good continue
        else {
            return redirectToLogin(request) // if you found somethin suspecious return immidiately to login page
        }
    } catch (error) {
        console.error('Error while verifying token:', error);
        return redirectToLogin(request) // while checking error , redirect to login page
    }
}