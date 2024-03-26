import { NextResponse , NextRequest } from "next/server";

export function middleware(request:NextRequest){

    const currentUser = request.cookies.get('currentUser')?.value
    if(
        (!currentUser || Date.now > JSON.parse(currentUser).expiredAt)
        )
    {
        if(request.nextUrl.pathname == '/login') {
            const response = NextResponse.next()
            return response
        }
        else{

        // request.cookies.delete('currentUser')
        console.log(currentUser)

        const response = NextResponse.redirect(new URL('/login', request.url))
        // response.cookies.delete('currentUser')
        return response}
    }

    if(currentUser){
        
        const response = NextResponse.next()
        return response
    }

    
}

