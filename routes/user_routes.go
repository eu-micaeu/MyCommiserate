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
	r.GET("/users", userHandler.GetAllUsers(db))
	r.POST("/user", userHandler.PostUser(db))
	r.POST("/login", userHandler.PostLogin(db))

}
