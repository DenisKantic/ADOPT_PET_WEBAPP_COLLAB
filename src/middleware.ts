import {NextRequest, NextResponse} from 'next/server'

export function middleware(req: NextRequest){
    console.log('middleware is running on route, ', req.nextUrl.pathname)

    const token = req.cookies.get('token')?.value

    console.log("TOKEN", token)

    if(!token){
        const loginUrl = new URL('/login', req.url)
        return NextResponse.redirect(loginUrl)
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/dashboard/:path*']
}

