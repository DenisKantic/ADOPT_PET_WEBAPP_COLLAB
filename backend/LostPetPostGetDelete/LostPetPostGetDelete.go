package LostPetPostGetDelete

import (
	"backend/db"
	"database/sql"
	"encoding/json"
	"errors"
	"fmt"
	"github.com/joho/godotenv"
	"log"
	"net/http"
	"os"
)

var (
	PETURL   string
	PETLOCAL string
)

func init() {
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Error loading .env file %v", err)
	}

	PETURL = os.Getenv("PETURL")
	PETLOCAL = os.Getenv("PETLOCAL")
}

func GetThreeLostPost(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", PETURL)
	w.Header().Set("Access-Control-Allow-Methods", "GET")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	if r.Method == http.MethodOptions {
		return
	}

	// Get the email from query parameters
	email := r.URL.Query().Get("email")
	if email == "" {
		http.Error(w, "Email parameter is required", http.StatusBadRequest)
		return
	}

	fmt.Println("EMAIL I GOT", email)

	database, err := db.DbConnect()
	if err != nil {
		http.Error(w, "Error connecting to the database", http.StatusInternalServerError)
		return
	}

	defer database.Close()

	query := "SELECT id, image_paths, category, phonenumber, petname, spol, location, slug, created_at FROM lostPetPost WHERE user_email = $1 LIMIT 3"
	rows, err := database.Query(query, email)
	if err != nil {
		http.Error(w, "Error querying the database", http.StatusInternalServerError)
		return
	}

	defer rows.Close()

	var lostPost []map[string]interface{}

	for rows.Next() {
		var id int
		var image_paths, category, petname, location, spol string
		var created_at, phonenumber string
		var slug string

		err := rows.Scan(&id, &image_paths, &category, &phonenumber, &petname, &spol, &location, &slug, &created_at)
		if err != nil {
			http.Error(w, "Error scanning the row", http.StatusInternalServerError)
			return
		}

		post := map[string]interface{}{
			"id":           id,
			"image_paths":  image_paths,
			"category":     category,
			"petname":      petname,
			"petname_slug": slug,
			"location":     location,
			"created_at":   created_at,
			"spol":         spol,
			"phonenumber":  phonenumber,
			"slug":         slug,
		}

		lostPost = append(lostPost, post)
	}

	if err := rows.Err(); err != nil {
		http.Error(w, "Error with rows", http.StatusInternalServerError)
		return
	}

	response := map[string]interface{}{
		"lost_post": lostPost,
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response)

}

func GetAllLostPost(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", PETURL)
	w.Header().Set("Access-Control-Allow-Methods", "GET")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	if r.Method == http.MethodOptions {
		return
	}

	database, err := db.DbConnect()
	if err != nil {
		http.Error(w, "Error connecting to the database", http.StatusInternalServerError)
		return
	}

	defer database.Close()

	query := "SELECT id, image_paths, category, petname, spol, location, slug, created_at FROM lostPetPost ORDER BY created_at limit 5"
	rows, err := database.Query(query)
	if err != nil {
		http.Error(w, "Error querying the database", http.StatusInternalServerError)
		return
	}

	defer rows.Close()

	var lostPost []map[string]interface{}

	for rows.Next() {
		var id int
		var image_paths, category, petname, location, spol string
		var created_at string
		var slug string

		err := rows.Scan(&id, &image_paths, &category, &petname, &spol, &location, &slug, &created_at)
		if err != nil {
			http.Error(w, "Error scanning the row", http.StatusInternalServerError)
			return
		}

		post := map[string]interface{}{
			"id":           id,
			"image_paths":  image_paths,
			"category":     category,
			"petname":      petname,
			"petname_slug": slug,
			"location":     location,
			"created_at":   created_at,
			"spol":         spol,
			"slug":         slug,
		}

		lostPost = append(lostPost, post)
	}

	if err := rows.Err(); err != nil {
		http.Error(w, "Error with rows", http.StatusInternalServerError)
		return
	}

	response := map[string]interface{}{
		"lost_post": lostPost,
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response)

}

type Post struct {
	ID          int    `json:"id"`
	Image_paths string `json:"image_paths"`
	Category    string `json:"category"`
	Petname     string `json:"petname"`
	Phonenumber string `json:"phonenumber"`
	Description string `json:"description"`
	Spol        string `json:"spol"`
	Location    string `json:"location"`
	Created_at  string `json:"created_at"`
}

func GetOneLostPost(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", PETURL)
	w.Header().Set("Access-Control-Allow-Methods", "GET")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	if r.Method == http.MethodOptions {
		return
	}

	slug := r.URL.Query().Get("slug")

	fmt.Println("SLUG", slug)

	var post Post

	if slug == "" {
		http.Error(w, "Missing required item", http.StatusBadRequest)
		return
	}

	database, err := db.DbConnect()
	if err != nil {
		http.Error(w, "Error connecting to the database", http.StatusInternalServerError)
		return
	}
	defer database.Close()

	err = database.QueryRow("SELECT id, image_paths, category, petname, phonenumber, description, spol , location, created_at FROM lostPetPost WHERE slug = $1", slug).
		Scan(&post.ID, &post.Image_paths, &post.Category, &post.Petname, &post.Phonenumber, &post.Description, &post.Spol, &post.Location, &post.Created_at)

	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			http.Error(w, "Item not found", http.StatusNotFound)
			return
		} else {
			http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		}
		fmt.Println("Query error:", err) // Log query error
		return
	}

	response := map[string]interface{}{
		"lost_post": post,
	}

	w.Header().Set("Content-Type", "application/json")

	if err := json.NewEncoder(w).Encode(response); err != nil {
		http.Error(w, "Failed to encode the item", http.StatusInternalServerError)
	}
}

func DeleteLostPetPost(w http.ResponseWriter, r *http.Request) {

	// extract ID from URL path
	id := r.URL.Query().Get("id")
	if id == "" {
		http.Error(w, "Missing ID", http.StatusBadRequest)
		return
	}

	database, err := db.DbConnect()
	if err != nil {
		http.Error(w, "Problem with connecting to database", http.StatusInternalServerError)
		return
	}

	defer func(database *sql.DB) {
		err := database.Close()
		if err != nil {

		}
	}(database)

	_, err = database.Exec("DELETE FROM lostPetPost WHERE id = $1", id)
	if err != nil {
		http.Error(w, "Error deleting post", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
}
