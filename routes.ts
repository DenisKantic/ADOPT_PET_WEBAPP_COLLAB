/* an array of routes that are accesible to the public
these routes do not require authentication 
*/

export const publicRoutes = [
    "/",
    "/adoptPet",
    "/lostPet",
    "/lostPet/:path*",
    "/donationPost",
    "/animalDetails/",
    "/policy"
]



/*these routes are used for authentication */
export const authRoutes = [
    "/login",
    "/register"
]

export const protectedRoutes = [
    "/dashboard",
    "/api"
]


export const apiAuthPrefix = "/api/auth" // this needs to be enabled so users can login 


// default redirect path after login 
export const DEFAULT_LOGIN_REDIRECT = "/dashboard"