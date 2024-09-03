package createDonationPost

import (
	"backend/db"
	"backend/helper"
	"database/sql"
	"encoding/json"
	"fmt"
	_ "github.com/lib/pq"
	"io"
	"net/http"
	"os"
	"path/filepath"
	"regexp"
	"strings"
)

func CreatePost(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	w.Header().Set("Access-Control-Allow-Methods", "POST")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	if r.Method == http.MethodOptions {
		return
	}

	err := r.ParseMultipartForm(35 << 20) // 35 MB max request per form
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	//extracting form values
	images := r.MultipartForm.File["images"]
	post_category := r.FormValue("post_category")
	animal_category := r.FormValue("animal_category")
	post_name := r.FormValue("post_name")
	phonenumber := r.FormValue("phonenumber")
	description := r.FormValue("description")
	location := r.FormValue("location")
	email := r.FormValue("email")

	if post_category == "" || post_name == "" || phonenumber == "" || email == "" ||
		description == "" || animal_category == "" || location == "" {
		fmt.Println("MISSING REQUIRED FIELDS")
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	if len(images) == 0 {
		http.Error(w, "No images uploaded", http.StatusBadRequest)
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

	var totalCountPost int

	err = database.QueryRow("SELECT COUNT(*) FROM donationPost WHERE user_email = $1", email).Scan(&totalCountPost)
	if err != nil {
		http.Error(w, "Error counting the created post", http.StatusInternalServerError)
		return
	}

	fmt.Println("Total created post", totalCountPost)

	if totalCountPost >= 3 {
		response := map[string]string{
			"error": "User has already created 3 posts",
		}
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusForbidden)
		if err := json.NewEncoder(w).Encode(response); err != nil {
			http.Error(w, "Error encoding response", http.StatusInternalServerError)
			return
		}
		return
	}

	// creating slug from the pets name for dynamic route
	var slug = strings.ToLower(post_name)
	slug = strings.ReplaceAll(slug, " ", "-")
	re := regexp.MustCompile(`[^a-z0-9-]`)
	slug = re.ReplaceAllString(slug, "")
	fmt.Println("NEW SLUG,", slug)

	parentFolder := "donationPostImages"
	slugFolderPath := filepath.Join(parentFolder, slug)

	slugFolderPath = helper.GenerateUniqueSlugPath(slugFolderPath, slug, parentFolder)

	err = os.MkdirAll(slugFolderPath, os.ModePerm)
	if err != nil {
		http.Error(w, "Error creating directory for slug", http.StatusInternalServerError)
		return
	}

	// opening images, saving in file server, retrieving paths and storing in database
	var filePaths []string

	for i, file := range images {
		// open the uploaded images
		src, err := file.Open()
		if err != nil {
			http.Error(w, "Error opening the images", http.StatusInternalServerError)
			return
		}

		defer src.Close()

		// renaming images with petName(i+1)
		/* this is used to avoid errors if image names
		contains spaces, it could cause images to not load
		on client side
		*/
		fileExtension := filepath.Ext(file.Filename)
		newFileName := fmt.Sprintf("%s%d%s", slug, i+1, fileExtension)

		// create a new file in the server
		dstPath := filepath.Join(slugFolderPath, newFileName)
		dst, err := os.Create(dstPath)
		if err != nil {
			http.Error(w, "Error creating a new file in the server", http.StatusInternalServerError)
			return
		}

		defer dst.Close()

		// copy the uploaded file to the server
		_, err = io.Copy(dst, src)
		if err != nil {
			http.Error(w, "Error uploading file in the server", http.StatusInternalServerError)
			return
		}

		// collect file paths
		filePaths = append(filePaths, dstPath)

	} // end of the for loop for images

	// separating images (if it has 2 or more) with commas
	filePathsWithCommas := "{" + strings.Join(filePaths, ",") + "}"
	fmt.Println("\nNEW FILE NAMES IN ARRAY", filePathsWithCommas)
	err = SaveToDB(filePathsWithCommas, animal_category, post_category, post_name, phonenumber, description, location, slug, email)
	if err != nil {
		http.Error(w, fmt.Sprintf("ERROR here %v", err), http.StatusInternalServerError)
		return
	}

	response := map[string]interface{}{
		"message":    "Files uploaded and paths stored successfully",
		"file_paths": filePaths,
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	if err := json.NewEncoder(w).Encode(response); err != nil {
		http.Error(w, "Error encoding response", http.StatusInternalServerError)
		return
	}
}

func generateUniqueSlug(db *sql.DB, baseSlug string) (string, error) {
	slug := baseSlug
	suffix := 1

	for {
		var count int
		err := db.QueryRow("SELECT COUNT(*) FROM donationPost WHERE slug = $1", slug).Scan(&count)
		if err != nil {
			return "", err
		}

		if count == 0 {
			break
		}

		slug = fmt.Sprintf("%s-%d", baseSlug, suffix)
		suffix++
	}

	return slug, nil
}

func SaveToDB(filePathsWithCommas string,
	post_name string, phonenumber string, description string,
	post_category string, animal_category string,
	location string, slug string, email string) error {

	database, err := db.DbConnect()
	if err != nil {
		return fmt.Errorf("error occurred on server: %v", err)
	}
	defer database.Close()

	// Generate a unique slug
	uniqueSlug, err := generateUniqueSlug(database, slug)
	if err != nil {
		return fmt.Errorf("error generating unique slug: %v", err)
	}

	//query := "INSERT INTO adoptPost (filePaths, category, petName, phoneNumber, description, vakcinisan, cipovan, pasos,spol, starost, location, slug) VALUES ($1, $2, $3, $4, $5,$6,$7,$8,$9,$10,$11,$12)"
	_, err = database.Exec("INSERT INTO donationPost ( image_paths, post_category, animal_category, post_name, phonenumber, description, location, slug, user_email) VALUES ($1, $2, $3, $4, $5,$6,$7,$8,$9)", filePathsWithCommas, post_category, animal_category, post_name, phonenumber, description, location, uniqueSlug, email)
	if err != nil {
		return fmt.Errorf("error u izvrsenju baze: %v", err)
	}

	return nil
}
