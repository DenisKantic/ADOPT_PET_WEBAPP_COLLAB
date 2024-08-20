import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
    console.log('middleware is running on route, ', req.nextUrl.pathname);
    const url = req.nextUrl.clone();
    const pathname = url.pathname;

    const token = req.cookies.get('token')?.value || "";

    console.log("TOKEN", token);

   
    if (token) {
        try {
            const verifyResponse = await fetch('http://localhost:8080/verifyToken', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (verifyResponse.status === 200) {
                console.log("USER LOGGED IN");
                // Redirect authenticated users away from the login page
                if (pathname === '/login') {
                    url.pathname = '/dashboard';  // Change '/dashboard' to the route you want
                    return NextResponse.redirect(url);
                }
                return NextResponse.next();
            }
        } catch (error) {
            console.error('Error verifying token:', error);
        }
    }

        // Allow guest users to access all pages except protected ones
        if (!token && pathname.startsWith('/dashboard')) {
            console.log("REDIRECTING TO LOGIN");
            req.cookies.delete(token);
            url.pathname = '/login';
            return NextResponse.redirect(url, { status: 303 });
        }
    return NextResponse.next();
}
export const config = {
    matcher:  ['/login', '/dashboard/:path*'],
};
