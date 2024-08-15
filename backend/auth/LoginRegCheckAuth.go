package auth

import (
	"backend/db"
	"crypto/rand"
	"database/sql"
	"encoding/hex"
	"errors"
	"fmt"
	"github.com/dgrijalva/jwt-go"
	"github.com/joho/godotenv"
	"golang.org/x/crypto/bcrypt"
	"log"
	"net/http"
	"net/smtp"
	"os"
	"time"
)

var (
	JWT_SECRET    string
	EMAIL_SMTP    string
	PASSWORD_SMTP string
)

func init() {
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Error loading .env file %v", err)
	}

	JWT_SECRET = os.Getenv("JWT_SECRET")
	EMAIL_SMTP = os.Getenv("EMAIL_SMTP")
	PASSWORD_SMTP = os.Getenv("PASSWORD_SMTP")
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

func GenerateActivationToken() (string, error) {
	bytes := make([]byte, 32)
	if _, err := rand.Read(bytes); err != nil {
		return "", err
	}

	return hex.EncodeToString(bytes), nil
}

func SendActivationEmail(email, token string) error {
	from := EMAIL_SMTP
	password := PASSWORD_SMTP
	to := email
	smtpHost := "mail.smtp2go.com"
	smtpPort := "587"

	message := []byte("To: " + email + "\r\n" +
		"Subject: Aktivirajte svoj korisnički nalog \r\n" +
		"\r\n" +
		"Hvala Vam što želite koristiti našu aplikaciju:\r\n" +
		"Da bi nastavili koristiti našu aplikaciju, morate kliknuti ispod na link " +
		"kako bi aktivirali svoj korisnički nalog. \r\n " +
		"\r\n" +
		"http://localhost:3000/activate?token=" + token + "\r\n" +
		"\r\n" +
		"Za sva dodatna pitanja, primjedbe ili žalbe, molimo Vas da se slobodno obratite " +
		"na naš email contact@petconnectbosnia.com")

	auth := smtp.PlainAuth("", from, password, smtpHost)

	err := smtp.SendMail(smtpHost+":"+smtpPort, auth, from, []string{to}, message)
	if err != nil {
		// Log the detailed error
		log.Printf("Error sending activation email: %v", err)
		return fmt.Errorf("Error sending activation email: %v", err)
	}
	return err
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
		fmt.Println("Error on hashing password", err)
		return
	}

	//generate activation token
	activationToken, err := GenerateActivationToken()
	if err != nil {
		http.Error(w, "Error proccessing activation token", http.StatusInternalServerError)
		return
	}

	// database initialization
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

	_, err = database.Exec("INSERT INTO users (email,username,password, is_active, activation_token) VALUES ($1,$2,$3, $4,$5)",
		email, username, hashedPassword, false, activationToken)
	if err != nil {
		http.Error(w, "Error creating user", http.StatusInternalServerError)
		return
	}

	// send activation email
	err = SendActivationEmail(email, activationToken)
	if err != nil {
		//delete the user if sending activation email fails
		_, delErr := database.Exec("DELETE FROM users WHERE email=$1", email)
		if delErr != nil {
			http.Error(w, "Error deleting user", http.StatusInternalServerError)
			return
		}
		http.Error(w, "Error proccessing activation email", http.StatusInternalServerError)
		return
	}

	fmt.Fprintln(w, "USER IS CREATED, please check your email to activate your account")

	w.WriteHeader(http.StatusOK)
}

func Login(w http.ResponseWriter, r *http.Request) {
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
	password := r.FormValue("password")

	// database initialization
	database, err := db.DbConnect()
	if err != nil {
		http.Error(w, "Error proccessing database connection", http.StatusInternalServerError)
		return
	}

	defer database.Close()

	var storedPassword string

	compareHash := database.QueryRow("SELECT password FROM users WHERE email=$1", email).Scan(&storedPassword)

	if compareHash != nil {
		http.Error(w, "Invalid email", http.StatusBadRequest)
		return
	}

	compareHash = bcrypt.CompareHashAndPassword([]byte(storedPassword), []byte(password))

	if compareHash != nil {
		http.Error(w, "Invalid password", http.StatusBadRequest)
		return
	}

	// generate token
	token, err := GenerateToken(email)
	if err != nil {
		http.Error(w, "Internal generating token", http.StatusInternalServerError)
		return
	}

	http.SetCookie(w, &http.Cookie{
		Name:     "token",
		Value:    token,
		HttpOnly: true,
		Secure:   true,
		Path:     "/",
		SameSite: http.SameSiteStrictMode,
		Expires:  time.Now().Add(24 * time.Hour),
	})

	fmt.Println("User is logged in")

	w.WriteHeader(http.StatusOK)
}

func IsUserLoggedIn(r *http.Request) (bool, string, error) {
	// Retrieve the token from the request's cookies
	cookie, err := r.Cookie("token")
	if err != nil {
		if errors.Is(err, http.ErrNoCookie) {
			// No token in the cookies means the user is not logged in
			return false, "", nil
		}
		// If there's another error, return it
		return false, "", err
	}

	// Parse the JWT token
	token, err := jwt.ParseWithClaims(cookie.Value, &Claims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(JWT_SECRET), nil
	})

	if err != nil {
		// If the token is invalid or expired, the user is not logged in
		return false, "", err
	}

	// Validate the token claims
	if claims, ok := token.Claims.(*Claims); ok && token.Valid {
		// The user is logged in; return the email from the claims
		return true, claims.Email, nil
	}

	// If the token is not valid, the user is not logged in
	return false, "", errors.New("invalid token")
}

func CheckAuth(w http.ResponseWriter, r *http.Request) {

	// check if user is logged in
	isLoggedIn, userEmail, err := IsUserLoggedIn(r)
	if err != nil {
		http.Error(w, "Internal server error", http.StatusInternalServerError)
		return
	}

	if !isLoggedIn {
		http.Error(w, "Unathorized", http.StatusUnauthorized)
		return
	}

	fmt.Fprintf(w, "Hello %s!, You are logged in", userEmail)
}
