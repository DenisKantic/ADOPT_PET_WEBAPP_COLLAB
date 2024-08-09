package createAdoptPost

import (
	"database/sql"
	"fmt"
	"github.com/joho/godotenv"
	"log"
	"net/http"
	"os"
	"regexp"
	"strings"
)

// variables for reading from .env file
var (
	DB_USER     string
	DB_PASSWORD string
	DB_NAME     string
	DB_HOST     string
	DB_PORT     string
)

// function for reading the .env variables
func init() {

	err := godotenv.Load(".env")
	if err != nil {
		fmt.Println("Error loading .env file")
		log.Fatal("Error loading .env file")
		return
	}

	DB_USER = os.Getenv("DB_USER")
	DB_PASSWORD = os.Getenv("DB_PASSWORD")
	DB_NAME = os.Getenv("DB_NAME")
	DB_HOST = os.Getenv("DB_HOST")
	DB_PORT = os.Getenv("DB_PORT")
}

// function for connecting to the database
func dbConnect() (*sql.DB, error) {
	psqlInfo := "host=%s port=%s user=%s password=%s, dbname=%s, sslmode=disable "

	psqlInfo = fmt.Sprintf(psqlInfo, DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME)
	fmt.Println("Connection string:", psqlInfo)

	db, err := sql.Open("postgres", psqlInfo)
	if err != nil {
		return nil, fmt.Errorf("Error oppening connection %w", err)
	}
	return db, nil
}

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

	// extracting form values
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
	slug = strings.ReplaceAll(petName, " ", "-")
	re := regexp.MustCompile(`[^a-z0-9-]`)
	slug = re.ReplaceAllString(slug, "")

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
}
