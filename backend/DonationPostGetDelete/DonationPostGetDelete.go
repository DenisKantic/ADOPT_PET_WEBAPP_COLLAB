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
