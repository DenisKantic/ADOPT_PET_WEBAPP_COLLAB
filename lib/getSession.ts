import { auth } from "@/auth";
import { cache } from "react";

export default cache(auth);

/* this is for deduplicating useSession()
so it will get only one request from server side
We do this because on this example:
On home page, we have navbar and home screen. One request will be for the navbar
to see if the user is logged in and second is for the home screen.
With this, it will only get one and stored in cache (of course, cache will be renewed everytime
    user refresh the tab, because we NEED user cache for credentials to be the latest   
)
*/
