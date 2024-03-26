import { NextResponse, type NextRequest } from "next/server";
import {jwtVerify} from 'jose';
import { secret } from "./services/secret";
export async function middleware(request: NextRequest) {
    const secretKey = new TextEncoder().encode(secret);

    const currentUser = request.cookies.get('currentUser')?.value

    if (
        (!currentUser
            // ||  (Date.now() >= JSON.parse(currentUser).expiredAt)
        )
    ) {
        

            const response = NextResponse.redirect(new URL('/login', request.url))
            return response
        
    }
    if (currentUser) {
try {

    const decode =await jwtVerify(JSON.parse(currentUser).accessToken, secretKey)
    if(
        decode.payload._id == JSON.parse(currentUser)._id &&
        decode.payload.name == JSON.parse(currentUser).name &&
        decode.payload.profile == JSON.parse(currentUser).profile &&
        (decode.payload.profile == 'prof' || decode.payload.profile == 'admin')
    )    return NextResponse.next()
    else {
        request.cookies.delete('currentUser')
        const response = NextResponse.redirect(new URL('/login', request.url))
        response.cookies.delete('currentUser')
        return response
}
} catch (error) {
    console.error('Error while verifying token:', error);

    const response = NextResponse.redirect(new URL('/login', request.url))
    response.cookies.delete('currentUser')
    return response
}
        
    }


}

export const config = {
    matcher: [
        '/((?!login|api|_next/static|_next/image|favicon.ico).*)',

    ],
  }