import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
    console.log('middleware is running on route, ', req.nextUrl.pathname);
    const url = req.nextUrl.clone();
    const pathname = url.pathname;

    const token = req.cookies.get('token')?.value;

    console.log("TOKEN", token);

    if (token) {
        try {
            const verifyResponse = await fetch('http://localhost:8080/checkAuth', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (verifyResponse.status === 200) {
                console.log("USER LOGGED IN")
                // Redirect authenticated users away from the login page
                if (pathname === '/login') {
                    url.pathname = '/dashboard';  // Change '/dashboard' to the route you want
                    return NextResponse.redirect(url);
                }
            }
            // else {

            //     // token is invalid or expired
            //     const response = NextResponse.redirect('http://localhost:3000/login');
            //     response.cookies.delete('token');
            //     return response;
            // }
        } catch (error) {
            console.error('Error verifying token:', error);
            const response = NextResponse.redirect('/login');
            response.cookies.delete('token');
            return response;
        }
    } else {

        // if no token and not on the login page, redirect to login
        console.log("USER NOT LOGGED IN")
        if (pathname !== '/login') {
            url.pathname = '/login';
            return NextResponse.redirect(url);
        }
    }

    // Allow the request to proceed if no redirect is needed
    return NextResponse.next();
}

export const config = {
    matcher:  ['/login', '/dashboard/:path*', '/dashboard'],
};
