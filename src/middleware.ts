import authConfig from "@public/auth.config"
import NextAuth from "next-auth"
import { DEFAULT_LOGIN_REDIRECT, publicRoutes, authRoutes, apiAuthPrefix, protectedRoutes } from "@public/routes"

const {auth} = NextAuth(authConfig)

export default auth((req) => {
  console.log("middleware is running on route:", req.nextUrl.pathname)
    const {nextUrl} = req;
    const isLoggedIn = !!req.auth;

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
    const isAuthRoute = authRoutes.includes(nextUrl.pathname)
    const isProtectedRoute = protectedRoutes.includes(nextUrl.pathname);

    if(isApiAuthRoute && isLoggedIn){
      return;
    }

    if(isAuthRoute){
      if(isLoggedIn){
        return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl)) // we need to include nextUrl so it can create absolute URL
      }
      return;
    }
    /*this means that we will allow auth route, to login, but only if the user is logged off */

    if(isPublicRoute){
      return;
    }

    if(isProtectedRoute && !isLoggedIn){
      return Response.redirect(new URL("/login", nextUrl))

    }


    // if(!isLoggedIn && !isPublicRoute){
    //   return Response.redirect(new URL("/login", nextUrl))
    // }

    return;
})
 
// // Optionally, don't invoke Middleware on some paths
// export const config = {
//   matcher: ["/login",]
// } this is example of how middleware works, as you can see on this example
// it will not work on "/login" path. Of course that could be "/register" or any path

export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)',
             '/', 
             '/(api|trpc)(.*)',
            '/lostPet/:path*'] // boilerplate code from clerkjs documentation which 
                                    // handles this for all /api calls better
}
