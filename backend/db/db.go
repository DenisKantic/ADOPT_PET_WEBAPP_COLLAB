package db

import (
	"database/sql"
	"fmt"
)

const DB_CONNECT = "postgresql://petuser:wild12life48@postgres:5434/petdatabase?sslmode=disable"

// DB_CONNECT variable for reading from .env file
//var (
//	DB_CONNECT = postgresql://postgres:wild12life48@postgres:5432/testing
//)

// function for reading the .env variables
//func init() {
//
//	err := godotenv.Load()
//	if err != nil {
//		fmt.Println("Error loading .env file")
//		log.Fatal("Error loading .env file")
//	}
//
//	DB_CONNECT = os.Getenv("DATABASE_URL")
//
//}

// function for connecting to the database
func DbConnect() (*sql.DB, error) {

	db, err := sql.Open("postgres", DB_CONNECT)
	if err != nil {
		return nil, fmt.Errorf("error oppening connection %w", err)
	}

	// Test the connection
	if err := db.Ping(); err != nil {
		fmt.Println("Erorr connecting to database")
		return nil, fmt.Errorf("error connecting to database: %w", err)
	}
	fmt.Println("CONNECTED TO THE DATABASE")
	return db, nil
}
