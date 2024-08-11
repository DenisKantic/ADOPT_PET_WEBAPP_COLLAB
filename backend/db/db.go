package db

import (
	"database/sql"
	"fmt"
	"github.com/joho/godotenv"
	"log"
	"os"
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
func DbConnect() (*sql.DB, error) {

	db, err := sql.Open("postgres", DB_CONNECT)
	if err != nil {
		return nil, fmt.Errorf("error oppening connection %w", err)
	}

	// Test the connection
	if err := db.Ping(); err != nil {
		return nil, fmt.Errorf("error connecting to database: %w", err)
	}
	fmt.Println("CONNECTED TO THE DATABASE")
	return db, nil
}
