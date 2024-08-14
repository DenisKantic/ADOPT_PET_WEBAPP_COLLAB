package auth

import (
	"backend/db"
	"database/sql"
	"errors"
	"fmt"
	"github.com/dgrijalva/jwt-go"
	"github.com/joho/godotenv"
	"golang.org/x/crypto/bcrypt"
	"log"
	"net/http"
	"os"
	"time"
)

var (
	JWT_SECRET string
)

func init() {
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Error loading .env file %v", err)
	}

	JWT_SECRET = os.Getenv("JWT_SECRET")
}

type Claims struct {
	Email string `json:"email"`
	jwt.StandardClaims
}

func GenerateToken(email string) (string, error) {
	claims := &Claims{
		Email: email,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: time.Now().Add(time.Hour * 1).Unix(),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString([]byte(JWT_SECRET))
}

func Register(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	w.Header().Set("Access-Control-Allow-Methods", "POST")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Access-Control-Allow-Credentials", "true")

	if r.Method == http.MethodOptions {
		return
	}

	err := r.ParseMultipartForm(32 << 20)
	if err != nil {
		http.Error(w, "Error proccessing form", http.StatusInternalServerError)
		return
	}

	email := r.FormValue("email")
	username := r.FormValue("username")
	password := r.FormValue("password")

	// hash the password

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		http.Error(w, "Error proccessing password", http.StatusInternalServerError)
		return
	}

	database, err := db.DbConnect()

	if err != nil {
		http.Error(w, "Error proccessing database connection", http.StatusInternalServerError)
		return
	}

	defer database.Close()

	// check if email is already existing in database

	var existingMail string
	err = database.QueryRow("SELECT email FROM users WHERE email=$1", email).Scan(&existingMail)

	if err != nil && !errors.Is(err, sql.ErrNoRows) {
		http.Error(w, "Internal proccessing error", http.StatusInternalServerError)
		return
	}

	if existingMail != "" {
		http.Error(w, "Email already exists", http.StatusBadRequest)
		return
	}

	_, err = database.Exec("INSERT INTO users (email,username,password) VALUES ($1,$2,$3)", email, username, hashedPassword)
	if err != nil {
		http.Error(w, "Error creating user", http.StatusInternalServerError)
		return
	}

	fmt.Fprintln(w, "USER IS CREATED")

	w.WriteHeader(http.StatusOK)
}
