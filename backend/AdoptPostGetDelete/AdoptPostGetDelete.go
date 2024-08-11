package AdoptPostGetDelete

import (
	"backend/db"
	"encoding/json"
	"net/http"
)

func GetAllAdoptPost(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	w.Header().Set("Access-Control-Allow-Methods", "GET")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	if r.Method == http.MethodOptions {
		return
	}

	database, err := db.DbConnect()
	if err != nil {
		http.Error(w, "Error connecting to the database", http.StatusInternalServerError)
		return
	}

	defer database.Close()

	query := "SELECT id, image_paths, category, petname, spol, location, slug, created_at FROM adoptPost"
	rows, err := database.Query(query)
	if err != nil {
		http.Error(w, "Error querying the database", http.StatusInternalServerError)
		return
	}

	defer rows.Close()

	var adoptPost []map[string]interface{}

	for rows.Next() {
		var id int
		var image_paths, category, petname, location, spol string
		var created_at string
		var slug string

		err := rows.Scan(&id, &image_paths, &category, &petname, &spol, &location, &slug, &created_at)
		if err != nil {
			http.Error(w, "Error scanning the row", http.StatusInternalServerError)
			return
		}

		post := map[string]interface{}{
			"id":           id,
			"image_paths":  image_paths,
			"category":     category,
			"petname":      petname,
			"petname_slug": slug,
			"location":     location,
			"created_at":   created_at,
			"slug":         slug,
		}

		adoptPost = append(adoptPost, post)
	}

	if err := rows.Err(); err != nil {
		http.Error(w, "Error with rows", http.StatusInternalServerError)
		return
	}

	response := map[string]interface{}{
		"adopt_post": adoptPost,
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response)

}
