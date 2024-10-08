package main

import (
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

	// serving static files
	serveStaticFiles(mux)
	log.Fatal(http.ListenAndServe(":8080", mux))

}

func main() {
	fmt.Println("Server is running on 8080 port")
	setupRoutes()
}
