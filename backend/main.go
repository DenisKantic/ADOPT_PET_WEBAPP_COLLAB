package main

import (
	"backend/createAdoptPost"
	"fmt"
	"log"
	"net/http"
)

func setupRoutes() {
	mux := http.NewServeMux()
	mux.HandleFunc("/createAdoptPost", createAdoptPost.CreatePost)

	log.Fatal(http.ListenAndServe(":8080", mux))
}

func main() {
	fmt.Println("Server is running on 8080 port")
	setupRoutes()
}
