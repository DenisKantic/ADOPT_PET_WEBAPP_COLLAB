package AdoptPostGetDelete

import (
	"backend/db"
	"database/sql"
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
)

func GetThreeAdoptPost(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
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

	query := "SELECT id, image_paths, category, petname, spol, starost, location, slug, created_at FROM adoptPost WHERE user_email = $1 LIMIT 3"
	rows, err := database.Query(query, email)
	if err != nil {
		http.Error(w, "Error querying the database", http.StatusInternalServerError)
		return
	}

	defer rows.Close()

	var adoptPost []map[string]interface{}

	for rows.Next() {
		var id int
		var image_paths, category, petname, location, spol, starost string
		var created_at string
		var slug string

		err := rows.Scan(&id, &image_paths, &category, &petname, &spol, &starost, &location, &slug, &created_at)
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
			"starost":      starost,
			"slug":         slug,
		}

		adoptPost = append(adoptPost, post)
	}

	if err := rows.Err(); err != nil {
		http.Error(w, "Error with rows", http.StatusInternalServerError)
		return
	}

	response := map[string]interface{}{
		"adopt_post": adoptPost,
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response)

}

func GetAllAdoptPost(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
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

	query := "SELECT id, image_paths, category, petname, spol, starost, location, slug, created_at FROM adoptPost ORDER BY created_at limit 5"
	rows, err := database.Query(query)
	if err != nil {
		http.Error(w, "Error querying the database", http.StatusInternalServerError)
		return
	}

	defer rows.Close()

	var adoptPost []map[string]interface{}

	for rows.Next() {
		var id int
		var image_paths, category, petname, location, spol, starost string
		var created_at string
		var slug string

		err := rows.Scan(&id, &image_paths, &category, &petname, &spol, &starost, &location, &slug, &created_at)
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
			"starost":      starost,
			"slug":         slug,
		}

		adoptPost = append(adoptPost, post)
	}

	if err := rows.Err(); err != nil {
		http.Error(w, "Error with rows", http.StatusInternalServerError)
		return
	}

	response := map[string]interface{}{
		"adopt_post": adoptPost,
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
	Phonenumber string `json:"phoneNumber"`
	Description string `json:"description"`
	Vakcinisan  bool   `json:"vakcinisan"`
	Cipovan     bool   `json:"cipovan"`
	Pasos       bool   `json:"pasos"`
	Spol        string `json:"spol"`
	Starost     string `json:"starost"`
	Location    string `json:"location"`
	Created_at  string `json:"created_at"`
}

func GetOneAdoptPost(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
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

	err = database.QueryRow("SELECT id, image_paths, category, petname, phonenumber, description, vakcinisan, cipovan, pasos, spol ,starost, location, created_at FROM adoptPost WHERE slug = $1", slug).
		Scan(&post.ID, &post.Image_paths, &post.Category, &post.Petname, &post.Phonenumber, &post.Description,
			&post.Vakcinisan, &post.Cipovan, &post.Pasos, &post.Spol, &post.Starost, &post.Location, &post.Created_at)

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
		"adopt_post": post,
	}

	w.Header().Set("Content-Type", "application/json")

	if err := json.NewEncoder(w).Encode(response); err != nil {
		http.Error(w, "Failed to encode the item", http.StatusInternalServerError)
	}
}
