package routes

import (
	"database/sql"

	"github.com/gin-gonic/gin"
	"github.com/eu-micaeu/MyCommiserate/handlers"
)

func DirRoutes(r *gin.Engine, db *sql.DB) {
	dirHandler := handlers.Dir{}

	r.GET("/pastas/:id", dirHandler.GetDirByID(db))
}
