package main

import (
	"backend/AdoptPostGetDelete"
	"backend/DonationPostGetDelete"
	"backend/LostPetPostGetDelete"
	"backend/auth"
	"backend/createAdoptPost"
	"backend/createDonationPost"
	"backend/createLostPost"
	"fmt"
	"github.com/joho/godotenv"
	"log"
	"net/http"
	"os"
)

var (
	PETURL   string
	PETLOCAL string
)

func init() {
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Error loading .env file %v", err)
	}

	PETURL = os.Getenv("PETURL")
	PETLOCAL = os.Getenv("PETLOCAL")
}

func corsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", PETURL)
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

		// Handle preflight OPTIONS request
		if r.Method == http.MethodOptions {
			return
		}

		next.ServeHTTP(w, r)
	})
}

func serveStaticFiles(mux *http.ServeMux) {
	adoptImages := "adoptPostImages"
	lostPetImages := "lostPetImages"
	donationPostImages := "donationPostImages"

	fmt.Println("Serving adopt images directory")
	mux.Handle("/adoptPostImages/", http.StripPrefix("/adoptPostImages/", http.FileServer(http.Dir(adoptImages))))
	mux.Handle("/lostPetImages/", http.StripPrefix("/lostPetImages/", http.FileServer(http.Dir(lostPetImages))))
	mux.Handle("/donationPostImages/", http.StripPrefix("/donationPostImages/", http.FileServer(http.Dir(donationPostImages))))

}

func setupRoutes() {
	mux := http.NewServeMux()
	mux.HandleFunc("/createAdoptPost", createAdoptPost.CreatePost)

	// get all adoptPost with pagination
	mux.HandleFunc("/getAdoptPostHome", AdoptPostGetDelete.GetAllAdoptPost)
	// get 5 adoptPost for homepage
	mux.HandleFunc("/getFiveAdoptPost", AdoptPostGetDelete.GetFiveAdoptPost)
	// get just 3  adopt post for dashboard
	mux.HandleFunc("/getAdoptPostDashboard", AdoptPostGetDelete.GetThreeAdoptPost)
	// get one adoptPost with slug
	mux.HandleFunc("/getOneAdoptPost/", AdoptPostGetDelete.GetOneAdoptPost)

	// API FOR LOST PET CATEGORY
	mux.HandleFunc("/createLostPost", createLostPost.CreatePost)
	mux.HandleFunc("/getLostPetPostHome", LostPetPostGetDelete.GetAllLostPost)
	mux.HandleFunc("/getLostPetPostDashboard", LostPetPostGetDelete.GetThreeLostPost)
	mux.HandleFunc("/getOneLostPetPost", LostPetPostGetDelete.GetOneLostPost)
	mux.HandleFunc("/deleteLostPetPost", LostPetPostGetDelete.DeleteLostPetPost)

	// API FOR DONATION POST
	mux.HandleFunc("/createDonationPost", createDonationPost.CreatePost)
	mux.HandleFunc("/getAllDonationPost", DonationPostGetDelete.GetAllDonationPosts)
	mux.HandleFunc("/getDonationPostDashboard", DonationPostGetDelete.GetThreeDonationPost)
	//	mux.HandleFunc("/getOneDonationPost", DonationPostGetDelete.GetOneDonationPost)

	// DELETING ADOPT POST
	mux.HandleFunc("/deleteAdoptPost", AdoptPostGetDelete.DeleteAdoptPost)

	// register API
	mux.HandleFunc("/register", auth.Register)

	// ACTIVATE ACCOUNT
	mux.HandleFunc("/activateAccount", auth.ActivateAccount)
	//login API
	mux.HandleFunc("/login", auth.Login)
	// check is user logged in
	mux.HandleFunc("/checkAuth", auth.CheckAuth)
	// verify token
	mux.HandleFunc("/verifyToken", auth.VerifyToken)
	// logout
	mux.HandleFunc("/logout", auth.Logout)

	// serving static files
	serveStaticFiles(mux)
	log.Fatal(http.ListenAndServe(":8080", corsMiddleware(mux)))

}

func main() {
	fmt.Println("Server is running on 8080 port")
	setupRoutes()
}
