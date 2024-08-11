package createAdoptPost

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
	"io"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"regexp"
	"strings"
)

// DB_CONNECT variable for reading from .env file
var (
	DB_CONNECT string
)

// function for reading the .env variables
func init() {

	err := godotenv.Load()
	if err != nil {
		fmt.Println("Error loading .env file")
		log.Fatal("Error loading .env file")
	}

	DB_CONNECT = os.Getenv("DB_CONNECT")

}

// function for connecting to the database
func dbConnect() (*sql.DB, error) {

	db, err := sql.Open("postgres", DB_CONNECT)
	if err != nil {
		return nil, fmt.Errorf("error oppening connection %w", err)
	}

	// Test the connection
	if err := db.Ping(); err != nil {
		return nil, fmt.Errorf("error SPAJANJA to database: %w", err)
	}
	fmt.Println("CONNECTED TO THE DATABASE")
	return db, nil
}

func CreatePost(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
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
	petName := r.FormValue("petName")
	phoneNumber := r.FormValue("phoneNumber")
	description := r.FormValue("description")
	vakcinisan := r.FormValue("vakcinisan")
	cipovan := r.FormValue("cipovan")
	pasos := r.FormValue("pasos")
	spol := r.FormValue("spol")
	starost := r.FormValue("starost")
	location := r.FormValue("location")

	if category == "" || petName == "" || phoneNumber == "" ||
		description == "" || vakcinisan == "" || cipovan == "" ||
		pasos == "" || spol == "" || starost == "" || location == "" {
		http.Error(w, "Missing required fields", http.StatusBadRequest)
		return
	}

	if len(images) == 0 {
		http.Error(w, "No images uploaded", http.StatusBadRequest)
		return
	}

	// creating slug from the pets name for dynamic route
	var slug = strings.ToLower(petName)
	slug = strings.ReplaceAll(slug, " ", "-")
	re := regexp.MustCompile(`[^a-z0-9-]`)
	slug = re.ReplaceAllString(slug, "")
	fmt.Println("NEW SLUG,", slug)

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
		dstPath := filepath.Join("adoptImages", newFileName)
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
	err = SaveToDB(filePathsWithCommas, category, petName, phoneNumber, description, vakcinisan, cipovan, pasos, spol, starost, location, slug)
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

func SaveToDB(filePathsWithCommas string, category string,
	petName string, phoneNumber string, description string,
	vakcinisan string, cipovan string,
	pasos string, spol string,
	starost string, location string, slug string) error {

	db, err := dbConnect()
	if err != nil {
		return fmt.Errorf("error occurred on server: %v", err)
	}
	defer db.Close()

	//query := "INSERT INTO adoptPost (filePaths, category, petName, phoneNumber, description, vakcinisan, cipovan, pasos,spol, starost, location, slug) VALUES ($1, $2, $3, $4, $5,$6,$7,$8,$9,$10,$11,$12)"
	_, err = db.Exec("INSERT INTO adoptPost ( image_paths, category, petName, phoneNumber, description, vakcinisan, cipovan, pasos,spol, starost, location, slug) VALUES ($1, $2, $3, $4, $5,$6,$7,$8,$9,$10,$11, $12)", filePathsWithCommas, category, petName, phoneNumber, description, vakcinisan, cipovan, pasos, spol, starost, location, slug)
	if err != nil {
		return fmt.Errorf("error u izvrsenju baze: %v", err)
	}

	return nil
}
