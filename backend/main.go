package main

import (
	"backend/AdoptPostGetDelete"
	"backend/auth"
	"backend/createAdoptPost"
	"backend/createLostPost"
	"fmt"
	"log"
	"net/http"
)

func serveStaticFiles(mux *http.ServeMux) {
	adoptImages := "adoptImages"

	fmt.Println("Serving adopt images directory")
	mux.Handle("/adoptImages/", http.StripPrefix("/adoptImages/", http.FileServer(http.Dir(adoptImages))))
}

func setupRoutes() {
	mux := http.NewServeMux()
	mux.HandleFunc("/createAdoptPost", createAdoptPost.CreatePost)

	// get all adoptPost for homepage
	mux.HandleFunc("/getAdoptPostHome", AdoptPostGetDelete.GetAllAdoptPost)
	// get just 3  adopt post for dashboard
	mux.HandleFunc("/getAdoptPostDashboard", AdoptPostGetDelete.GetThreeAdoptPost)
	// get one adoptPost with slug
	mux.HandleFunc("/getOneAdoptPost/", AdoptPostGetDelete.GetOneAdoptPost)

	// API FOR LOST PET CATEGORY
	mux.HandleFunc("/createLostPost", createLostPost.CreatePost)

	// register API
	mux.HandleFunc("/register", auth.Register)
	//login API
	mux.HandleFunc("/login", auth.Login)
	// check is user logged in
	mux.HandleFunc("/checkAuth", auth.CheckAuth)
	// verify token
	mux.HandleFunc("/verifyToken", auth.VerifyToken)
	// logout
	mux.HandleFunc("/logout", auth.Logout)

	// serving static files
	serveStaticFiles(mux)
	log.Fatal(http.ListenAndServe(":8080", mux))

}

func main() {
	fmt.Println("Server is running on 8080 port")
	setupRoutes()
}
