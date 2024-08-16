import {NextRequest, NextResponse} from 'next/server'

export function middleware(req: NextRequest){
    console.log('middleware is running on route, ', req.nextUrl.pathname)
    const url = req.nextUrl.clone()
    const pathname = url.pathname;


    const token = req.cookies.get('token')?.value

    console.log("TOKEN", token)

    if(token){
        // Redirect authenticated users away from the login page
        if (pathname === '/login') {
            // Redirect to the dashboard or home page if already logged in
            url.pathname = '/dashboard';  // Change '/dashboard' to the route you want
            return NextResponse.redirect(url);
        }

        // Handle other routes if needed (e.g., dashboard)
        // Optionally, you can add additional logic here to handle routes requiring authentication
    } else {
        // If no token, and trying to access protected routes, redirect to login
        if (pathname !== '/login') {
            url.pathname = '/login';
            return NextResponse.redirect(url);
        }
    }

    // Allow the request to proceed if no redirect is needed
    return NextResponse.next();
}

export const config = {
    matcher: ['/login','/dashboard/:path*']
}

