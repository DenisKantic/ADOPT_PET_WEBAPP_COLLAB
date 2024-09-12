package auth

import (
	"backend/db"
	"crypto/rand"
	"database/sql"
	"encoding/hex"
	"encoding/json"
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
	PETURL        string
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
}

type Claims struct {
	Email    string `json:"email"`
	Username string `json:"username"`
	jwt.StandardClaims
}

func VerifyToken(w http.ResponseWriter, r *http.Request) {
	tokenString := r.Header.Get("Authorization")

	claims := &jwt.StandardClaims{}
	token, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
		return []byte(JWT_SECRET), nil
	})

	if err != nil || !token.Valid {
		http.Error(w, "Unathorized", http.StatusUnauthorized)
		return
	}

	w.WriteHeader(http.StatusOK)
}

func GenerateToken(email, username string) (string, error) {
	claims := &Claims{
		Email:    email,
		Username: username,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: time.Now().Add(7 * 24 * time.Hour).Unix(),
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
		"http://www.petconnectbosnia.com/api/ActivateAccount?token=" + token + "\r\n" +
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
	w.Header().Set("Access-Control-Allow-Origin", PETURL)
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
		http.Error(w, "Error proccessing database POV connection", http.StatusInternalServerError)
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

	var role = "user"

	_, err = database.Exec("INSERT INTO users (email,username,password, is_activated, role) VALUES ($1,$2,$3, $4, $5)",
		email, username, hashedPassword, false, role)
	if err != nil {
		http.Error(w, "Error creating user", http.StatusInternalServerError)
		return
	}

	// Store activation token in inactivated_accounts table
	_, err = database.Exec("INSERT INTO unactivated_accounts (token, user_email) VALUES ($1, $2)",
		activationToken, email)
	if err != nil {
		http.Error(w, "Error storing activation token", http.StatusInternalServerError)
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

func ActivateAccount(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", PETURL)
	w.Header().Set("Access-Control-Allow-Methods", "POST")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Access-Control-Allow-Credentials", "true")

	if r.Method == http.MethodOptions {
		return
	}

	token := r.URL.Query().Get("token")

	// database initialization
	database, err := db.DbConnect()
	if err != nil {
		http.Error(w, "Error connecting to database", http.StatusInternalServerError)
		return
	}
	defer database.Close()

	// Check if the token exists
	var userEmail string
	err = database.QueryRow("SELECT user_email FROM unactivated_accounts WHERE token=$1", token).Scan(&userEmail)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			http.Error(w, "Invalid token", http.StatusBadRequest)
			return
		}
		http.Error(w, "Error querying token", http.StatusInternalServerError)
		return
	}

	// Activate the user account
	_, err = database.Exec("UPDATE users SET is_activated=true WHERE email=$1", userEmail)
	if err != nil {
		http.Error(w, "Error activating user", http.StatusInternalServerError)
		return
	}

	// Delete the token from inactivated_accounts
	_, err = database.Exec("DELETE FROM unactivated_accounts WHERE token=$1", token)
	if err != nil {
		http.Error(w, "Error deleting activation token", http.StatusInternalServerError)
		return
	}

	fmt.Fprintln(w, "Account activated successfully")
	w.WriteHeader(http.StatusOK)
}

func Login(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", PETURL)
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Access-Control-Allow-Credentials", "true")

	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusOK)
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

	var storedPassword, username, role string
	var isActivated bool

	err = database.QueryRow("SELECT password, username, is_activated, role FROM users WHERE email=$1", email).Scan(&storedPassword, &username, &isActivated, &role)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			http.Error(w, "Invalid email", http.StatusBadRequest)
		} else {
			http.Error(w, "Internal server error", http.StatusInternalServerError)
		}
		return
	}

	// Check if the user is activated
	if !isActivated {
		http.Error(w, "Please activate your account by clicking the link sent to your email.", http.StatusForbidden)
		fmt.Println("Profile not activated.")
		return
	}

	// Check the password
	err = bcrypt.CompareHashAndPassword([]byte(storedPassword), []byte(password))
	if err != nil {
		http.Error(w, "Invalid password", http.StatusBadRequest)
		return
	}

	// Generate token
	token, err := GenerateToken(email, username)
	if err != nil {
		http.Error(w, "Internal server error while generating token", http.StatusInternalServerError)
		return
	}

	http.SetCookie(w, &http.Cookie{
		Name:     "token",
		Value:    token,
		HttpOnly: true,
		Secure:   true,
		Path:     "/",
		SameSite: http.SameSiteLaxMode,
		Expires:  time.Now().Add(7 * 24 * time.Hour), // token activated for one week
	})

	fmt.Println("User is logged in")

	w.WriteHeader(http.StatusOK)
}

func IsUserLoggedIn(r *http.Request) (bool, string, string, error) {
	// Retrieve the token from the request's cookies
	cookie, err := r.Cookie("token")
	if err != nil {
		if errors.Is(err, http.ErrNoCookie) {
			// No token in the cookies means the user is not logged in
			return false, "", "", nil
		}
		// If there's another error, return it
		return false, "", "", err
	}

	// Parse the JWT token
	token, err := jwt.ParseWithClaims(cookie.Value, &Claims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(JWT_SECRET), nil
	})

	if err != nil {
		// If the token is invalid or expired, the user is not logged in
		return false, "", "", err
	}

	// Validate the token claims
	if claims, ok := token.Claims.(*Claims); ok && token.Valid {
		// The user is logged in; return the email from the claims
		return true, claims.Email, claims.Username, nil
	}

	// If the token is not valid, the user is not logged in
	return false, "", "", errors.New("invalid token")
}

func CheckAuthUser(r *http.Request) (string, string, bool, error) {
	// Check if user is logged in
	isLoggedIn, userEmail, username, err := IsUserLoggedIn(r)
	if err != nil {
		return "", "", false, errors.New("Error during IsUserLoggedIn: " + err.Error())
	}

	if !isLoggedIn {
		return "", "", false, errors.New("Unauthorized")
	}

	return userEmail, username, true, nil
}

func CheckAuth(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Access-Control-Allow-Origin", PETURL)
	w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
	w.Header().Set("Access-Control-Allow-Credentials", "true")

	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusOK)
		return
	}

	// check if user is logged in
	// Call CheckAuth function
	email, username, isLoggedIn, err := CheckAuthUser(r)
	if err != nil {
		if err.Error() == "Unauthorized" {
			http.Error(w, "Unauthorized", http.StatusUnauthorized)
		} else {
			http.Error(w, "GOLANG ERROR", http.StatusInternalServerError)
		}
		return
	}

	if !isLoggedIn {
		http.Error(w, "Unathorized", http.StatusUnauthorized)
		return
	}

	fmt.Println("USER EMAIL", email)
	fmt.Println("username", username)

	response := map[string]interface{}{
		"isLoggedIn": isLoggedIn,
		"email":      email,
		"username":   username,
	}

	w.WriteHeader(http.StatusOK)
	err = json.NewEncoder(w).Encode(response)
	if err != nil {
		http.Error(w, "Error encoding response", http.StatusInternalServerError)
	}
}

func Logout(w http.ResponseWriter, r *http.Request) {
	http.SetCookie(w, &http.Cookie{
		Name:     "token",
		Value:    "",
		HttpOnly: true,
		Secure:   true,
		Path:     "/",
		SameSite: http.SameSiteLaxMode,
		MaxAge:   -1,
	})

	fmt.Println("User is logged out ")

	w.WriteHeader(http.StatusOK)
	http.Redirect(w, r, "/login", http.StatusSeeOther)
}
