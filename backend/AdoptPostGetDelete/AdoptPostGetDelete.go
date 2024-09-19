package AdoptPostGetDelete

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
	"path/filepath"
	"strconv"
)

var (
	JWT_SECRET    string
	EMAIL_SMTP    string
	PASSWORD_SMTP string
	PETURL        string
	PETLOCAL      string
)

func init() {
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Error loading .env file %v", err)
	}

	JWT_SECRET = os.Getenv("JWT_SECRET")
	EMAIL_SMTP = os.Getenv("EMAIL_SMTP")
	PASSWORD_SMTP = os.Getenv("PASSWORD_SMTP")
	PETURL = os.Getenv("PETURL")
	PETLOCAL = os.Getenv("PETLOCAL")
}

func GetFiveAdoptPost(w http.ResponseWriter, r *http.Request) {
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

	query := "SELECT ID, image_paths, category, phonenumber, petname, spol, starost, location, slug, created_at FROM adoptPost ORDER BY created_at DESC LIMIT 6"
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
		var created_at, phonenumber string
		var slug string

		err := rows.Scan(&id, &image_paths, &category, &phonenumber, &petname, &spol, &starost, &location, &slug, &created_at)
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
			"phonenumber":  phonenumber,
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

func GetThreeAdoptPost(w http.ResponseWriter, r *http.Request) {
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

	query := "SELECT ID, image_paths, category, phonenumber, petname, spol, starost, location, slug, created_at FROM adoptPost WHERE user_email = $1 LIMIT 3"
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
		var created_at, phonenumber string
		var slug string

		err := rows.Scan(&id, &image_paths, &category, &phonenumber, &petname, &spol, &starost, &location, &slug, &created_at)
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
			"phonenumber":  phonenumber,
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
	w.Header().Set("Access-Control-Allow-Origin", PETURL)
	w.Header().Set("Access-Control-Allow-Methods", "GET")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	if r.Method == http.MethodOptions {
		return
	}

	// Get page, pageSize, and location from query parameters
	pageStr := r.URL.Query().Get("page")
	pageSizeStr := r.URL.Query().Get("pageSize")
	location := r.URL.Query().Get("location")

	page := 1
	pageSize := 20 // Default page size

	// Parse page number if provided
	if pageStr != "" {
		if p, err := strconv.Atoi(pageStr); err == nil && p > 0 {
			page = p
		}
	}

	// Parse page size if provided
	if pageSizeStr != "" {
		if s, err := strconv.Atoi(pageSizeStr); err == nil && s > 0 {
			pageSize = s
		}
	}

	offset := (page - 1) * pageSize

	database, err := db.DbConnect()
	if err != nil {
		http.Error(w, "Error connecting to the database", http.StatusInternalServerError)
		return
	}
	defer database.Close()

	// Build the base query and the count query
	var query string
	var countQuery string

	if location != "" {
		// If location is provided, filter by location
		query = `
			SELECT id, image_paths, category, petname, spol, starost, location, slug, created_at 
			FROM adoptPost 
			WHERE location = $1 
			ORDER BY created_at DESC 
			LIMIT $2 OFFSET $3`
		countQuery = "SELECT COUNT(*) FROM adoptPost WHERE location = $1"
	} else {
		// If no location filter, fetch all posts
		query = `
			SELECT id, image_paths, category, petname, spol, starost, location, slug, created_at 
			FROM adoptPost 
			ORDER BY created_at DESC 
			LIMIT $1 OFFSET $2`
		countQuery = "SELECT COUNT(*) FROM adoptPost"
	}

	// Get the total number of adopt posts
	var totalCount int
	if location != "" {
		err = database.QueryRow(countQuery, location).Scan(&totalCount)
	} else {
		err = database.QueryRow(countQuery).Scan(&totalCount)
	}
	if err != nil {
		http.Error(w, "Error querying the database for count", http.StatusInternalServerError)
		return
	}

	// Calculate total pages
	totalPages := (totalCount + pageSize - 1) / pageSize

	// Fetch posts with pagination
	var rows *sql.Rows
	if location != "" {
		rows, err = database.Query(query, location, pageSize, offset)
	} else {
		rows, err = database.Query(query, pageSize, offset)
	}
	if err != nil {
		http.Error(w, "Error querying the database", http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var adoptPost []map[string]interface{}

	for rows.Next() {
		var id int
		var image_paths, category, petname, location, spol, starost, created_at, slug string

		err := rows.Scan(&id, &image_paths, &category, &petname, &spol, &starost, &location, &slug, &created_at)
		if err != nil {
			http.Error(w, "Error scanning the row", http.StatusInternalServerError)
			return
		}

		post := map[string]interface{}{
			"id":          id,
			"image_paths": image_paths,
			"category":    category,
			"petname":     petname,
			"spol":        spol,
			"starost":     starost,
			"location":    location,
			"created_at":  created_at,
			"slug":        slug,
		}

		adoptPost = append(adoptPost, post)
	}

	if err := rows.Err(); err != nil {
		http.Error(w, "Error with rows", http.StatusInternalServerError)
		return
	}

	response := map[string]interface{}{
		"adopt_post":  adoptPost,
		"totalPages":  totalPages,
		"currentPage": page,
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
	Vakcinisan  bool   `json:"vakcinisan"`
	Cipovan     bool   `json:"cipovan"`
	Pasos       bool   `json:"pasos"`
	Spol        string `json:"spol"`
	Starost     string `json:"starost"`
	Location    string `json:"location"`
	Username    string `json:"username"`
	Created_at  string `json:"created_at"`
}

func GetOneAdoptPost(w http.ResponseWriter, r *http.Request) {
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

	err = database.QueryRow("SELECT id, image_paths, category, petname, phonenumber, description, vakcinisan, cipovan, pasos, spol ,starost, location, created_at, username FROM adoptPost WHERE slug = $1", slug).
		Scan(&post.ID, &post.Image_paths, &post.Category, &post.Petname, &post.Phonenumber, &post.Description,
			&post.Vakcinisan, &post.Cipovan, &post.Pasos, &post.Spol, &post.Starost, &post.Location, &post.Created_at, &post.Username)

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

func DeleteAdoptPost(w http.ResponseWriter, r *http.Request) {

	// Extract ID from URL query
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
	defer database.Close()

	// 1. Retrieve slug associated with the post to find the folder path
	var slug string
	err = database.QueryRow("SELECT slug FROM adoptPost WHERE id = $1", id).Scan(&slug)
	if err != nil {
		http.Error(w, "Error retrieving post slug", http.StatusInternalServerError)
		return
	}

	// Construct the folder path based on the slug
	parentFolder := "adoptPostImages"
	folderPath := filepath.Join(parentFolder, slug)

	// 2. Delete the entire folder where the images are stored
	err = os.RemoveAll(folderPath)
	if err != nil {
		http.Error(w, "Error deleting image folder", http.StatusInternalServerError)
		return
	}

	// 3. Delete the post from the database
	_, err = database.Exec("DELETE FROM adoptPost WHERE id = $1", id)
	if err != nil {
		http.Error(w, "Error deleting post", http.StatusInternalServerError)
		return
	}

	// Return success response
	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Post and associated folder deleted successfully"))
}
