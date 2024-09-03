package DonationPostGetDelete

import (
	"backend/db"
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"
	"strings"
)

func GetDonationPosts(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	w.Header().Set("Access-Control-Allow-Methods", "GET")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	if r.Method == http.MethodOptions {
		return
	}

	// Pagination parameters
	pageStr := r.URL.Query().Get("page")
	page, err := strconv.Atoi(pageStr)
	if err != nil || page < 1 {
		page = 1
	}

	limit := 24
	offset := (page - 1) * limit

	// Filter parameters
	animalCategory := r.URL.Query().Get("animal_category")
	postCategory := r.URL.Query().Get("post_category")
	location := r.URL.Query().Get("location")
	dateFrom := r.URL.Query().Get("date_from")
	dateTo := r.URL.Query().Get("date_to")

	// Construct the base query
	query := `
		SELECT image_paths, post_category, animal_category, post_name, phone_number, description, location, slug, user_email, created_at 
		FROM donationPost
		WHERE 1=1
	`
	args := []interface{}{}
	argCounter := 1

	// Apply filters
	if animalCategory != "" {
		query += fmt.Sprintf(" AND animal_category = $%d", argCounter)
		args = append(args, animalCategory)
		argCounter++
	}

	if postCategory != "" {
		query += fmt.Sprintf(" AND post_category = $%d", argCounter)
		args = append(args, postCategory)
		argCounter++
	}

	if location != "" {
		query += fmt.Sprintf(" AND location = $%d", argCounter)
		args = append(args, location)
		argCounter++
	}

	if dateFrom != "" && dateTo != "" {
		query += fmt.Sprintf(" AND created_at BETWEEN $%d AND $%d", argCounter, argCounter+1)
		args = append(args, dateFrom, dateTo)
		argCounter += 2
	}

	// Add pagination to the query
	query += fmt.Sprintf(" ORDER BY created_at DESC LIMIT $%d OFFSET $%d", argCounter, argCounter+1)
	args = append(args, limit, offset)

	// Connect to the database
	database, err := db.DbConnect()
	if err != nil {
		http.Error(w, "Problem connecting to the database", http.StatusInternalServerError)
		return
	}
	defer database.Close()

	// Execute the query
	rows, err := database.Query(query, args...)
	if err != nil {
		http.Error(w, "Error retrieving posts from the database", http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var posts []map[string]interface{}

	for rows.Next() {
		var imagePaths string
		var postCategory, animalCategory, postName, phoneNumber, description, location, slug, userEmail string
		var createdAt string

		err = rows.Scan(&imagePaths, &postCategory, &animalCategory, &postName, &phoneNumber, &description, &location, &slug, &userEmail, &createdAt)
		if err != nil {
			http.Error(w, "Error scanning database rows", http.StatusInternalServerError)
			return
		}

		post := map[string]interface{}{
			"image_paths":     strings.Split(imagePaths, ","), // Assuming image_paths is a comma-separated string
			"post_category":   postCategory,
			"animal_category": animalCategory,
			"post_name":       postName,
			"phone_number":    phoneNumber,
			"description":     description,
			"location":        location,
			"slug":            slug,
			"user_email":      userEmail,
			"created_at":      createdAt,
		}

		posts = append(posts, post)
	}

	// Convert the posts to JSON and write the response
	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(posts); err != nil {
		http.Error(w, "Error encoding response to JSON", http.StatusInternalServerError)
		return
	}
}

func GetThreeDonationPost(w http.ResponseWriter, r *http.Request) {
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

	query := "SELECT id, image_paths, animal_category, post_category, post_name, phone_number, location, description, slug, created_at FROM donationPost WHERE user_email = $1 LIMIT 3"
	rows, err := database.Query(query, email)
	if err != nil {
		http.Error(w, "Error querying the database", http.StatusInternalServerError)
		return
	}

	defer rows.Close()

	var donationPost []map[string]interface{}

	for rows.Next() {
		var id int
		var image_paths, animal_category, post_category, post_name, phone_number, location, description string
		var created_at string
		var slug string

		err := rows.Scan(&id, &image_paths, &animal_category, &post_category, &post_name, &phone_number, &location, &description, &slug, &created_at)
		if err != nil {
			http.Error(w, "Error scanning the row", http.StatusInternalServerError)
			return
		}

		post := map[string]interface{}{
			"id":              id,
			"image_paths":     image_paths,
			"animal_category": animal_category,
			"post_category":   post_category,
			"post_name":       post_name,
			"location":        location,
			"created_at":      created_at,
			"phone_number":    phone_number,
			"slug":            slug,
		}

		donationPost = append(donationPost, post)
	}

	if err := rows.Err(); err != nil {
		http.Error(w, "Error with rows", http.StatusInternalServerError)
		return
	}

	response := map[string]interface{}{
		"donation_post": donationPost,
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response)

}
