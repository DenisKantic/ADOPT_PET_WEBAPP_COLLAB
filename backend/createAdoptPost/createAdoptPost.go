package createAdoptPost

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
	category := r.FormValue("category")
	petname := r.FormValue("petname")
	phonenumber := r.FormValue("phonenumber")
	description := r.FormValue("description")
	vakcinisan := r.FormValue("vakcinisan")
	cipovan := r.FormValue("cipovan")
	pasos := r.FormValue("pasos")
	spol := r.FormValue("spol")
	starost := r.FormValue("starost")
	location := r.FormValue("location")
	email := r.FormValue("email")

	if category == "" || petname == "" || phonenumber == "" || email == "" ||
		description == "" || vakcinisan == "" || cipovan == "" ||
		pasos == "" || spol == "" || starost == "" || location == "" {
		fmt.Println("MISSING REQUIRED FIELDS")
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Validate the boolean strings
	_, err = stringToBool(vakcinisan)
	if err != nil {
		fmt.Println("INVALID BOOLEAN VALUE FOR vakcinisan")
		http.Error(w, "Invalid boolean value for vakcinisan", http.StatusBadRequest)
		return
	}

	_, err = stringToBool(cipovan)
	if err != nil {
		fmt.Println("INVALID BOOLEAN VALUE FOR cipovan")
		http.Error(w, "Invalid boolean value for cipovan", http.StatusBadRequest)
		return
	}

	_, err = stringToBool(pasos)
	if err != nil {
		fmt.Println("INVALID BOOLEAN VALUE FOR pasos")
		http.Error(w, "Invalid boolean value for pasos", http.StatusBadRequest)
		return
	}

	if len(images) == 0 {
		http.Error(w, "No images uploaded", http.StatusBadRequest)
		return
	}

	// creating slug from the pets name for dynamic route
	var slug = strings.ToLower(petname)
	slug = strings.ReplaceAll(slug, " ", "-")
	re := regexp.MustCompile(`[^a-z0-9-]`)
	slug = re.ReplaceAllString(slug, "")
	fmt.Println("NEW SLUG,", slug)

	parentFolder := "adoptPostImages"
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
	err = SaveToDB(filePathsWithCommas, category, petname, phonenumber, description, vakcinisan, cipovan, pasos, spol, starost, location, slug, email)
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
		err := db.QueryRow("SELECT COUNT(*) FROM adoptPost WHERE slug = $1", slug).Scan(&count)
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

func stringToBool(input string) (bool, error) {
	switch input {
	case "da", "true", "1": // Treat "da" as true
		return true, nil
	case "ne", "false", "0": // Treat "ne" as false
		return false, nil
	default:
		return false, fmt.Errorf("invalid boolean value: %s", input)
	}
}

func SaveToDB(filePathsWithCommas string, category string,
	petname string, phonenumber string, description string,
	vakcinisan string, cipovan string,
	pasos string, spol string,
	starost string, location string, slug string, email string) error {

	database, err := db.DbConnect()
	if err != nil {
		return fmt.Errorf("error occurred on server: %v", err)
	}
	defer database.Close()

	// Convert vakcinisan, cipovan, pasos to boolean
	vakcinisanBool, err := stringToBool(vakcinisan)
	if err != nil {
		return fmt.Errorf("error converting vakcinisan to bool: %v", err)
	}

	cipovanBool, err := stringToBool(cipovan)
	if err != nil {
		return fmt.Errorf("error converting cipovan to bool: %v", err)
	}

	pasosBool, err := stringToBool(pasos)
	if err != nil {
		return fmt.Errorf("error converting pasos to bool: %v", err)
	}

	// Generate a unique slug
	uniqueSlug, err := generateUniqueSlug(database, slug)
	if err != nil {
		return fmt.Errorf("error generating unique slug: %v", err)
	}

	//query := "INSERT INTO adoptPost (filePaths, category, petName, phoneNumber, description, vakcinisan, cipovan, pasos,spol, starost, location, slug) VALUES ($1, $2, $3, $4, $5,$6,$7,$8,$9,$10,$11,$12)"
	_, err = database.Exec("INSERT INTO adoptPost ( image_paths, category, petname, phonenumber, description, vakcinisan, cipovan, pasos,spol, starost, location, slug, user_email) VALUES ($1, $2, $3, $4, $5,$6,$7,$8,$9,$10,$11,$12,$13)", filePathsWithCommas, category, petname, phonenumber, description, vakcinisanBool, cipovanBool, pasosBool, spol, starost, location, uniqueSlug, email)
	if err != nil {
		return fmt.Errorf("error u izvrsenju baze: %v", err)
	}

	return nil
}
