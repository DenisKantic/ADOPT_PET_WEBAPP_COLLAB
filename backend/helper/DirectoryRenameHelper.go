package helper

import (
	"fmt"
	"os"
	"path/filepath"
)

// Helper function to generate a unique slug path by incrementing a number
func GenerateUniqueSlugPath(slugFolderPath string, slug string, parentFolder string) string {
	i := 1
	for {
		if _, err := os.Stat(slugFolderPath); os.IsNotExist(err) {
			break
		}
		slugFolderPath = filepath.Join(parentFolder, fmt.Sprintf("%s-%d", slug, i))
		i++
	}
	return slugFolderPath
}
