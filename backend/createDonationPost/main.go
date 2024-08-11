package createDonationPost

import (
	"fmt"
)


// global variable used for connecting to the database
var (
	DB_CONNECT string
)

func init(){
	DB_CONNECT = os.Getenv("DB_CONNECT")
}

func connectDB()(*sql.DB, error){
	db, err := sql.Open("postgres", DB_CONNECT)
	if err != nil {
		http.Errorf("Error connecting to the database")
	}

	return db,nil;
}
func init(){
	return null;
}