package main

import (
	"backend/AdoptPostGetDelete"
	"backend/auth"
	"backend/createAdoptPost"
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
	// get one adoptPost with slug
	mux.HandleFunc("/getOneAdoptPost/", AdoptPostGetDelete.GetOneAdoptPost)

	// register API
	mux.HandleFunc("/register", auth.Register)
	//login API
	mux.HandleFunc("/login", auth.Login)
	// check is user logged in
	mux.HandleFunc("/checkAuth", auth.CheckAuth)

	// serving static files
	serveStaticFiles(mux)
	log.Fatal(http.ListenAndServe(":8080", mux))

}

func main() {
	fmt.Println("Server is running on 8080 port")
	setupRoutes()
}
