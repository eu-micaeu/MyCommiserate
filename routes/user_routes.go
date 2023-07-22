package routes

import (
	"database/sql"

	"github.com/gin-gonic/gin"
	"github.com/eu-micaeu/MyCommiserate/handlers"
)

func UserRoutes(r *gin.Engine, db *sql.DB) {
	userHandler := handlers.User{}

	r.GET("/users/:id", userHandler.GetUserByID(db))
	r.GET("/users/usuario/:username", userHandler.GetUserByUsername(db))

	// Implemente outras rotas para as operações relacionadas aos usuários...
}
