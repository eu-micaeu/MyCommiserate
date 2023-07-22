package routes

import (
	"database/sql"

	"github.com/gin-gonic/gin"
	"github.com/eu-micaeu/MyCommiserate/handlers"
)

func AnotRoutes(r *gin.Engine, db *sql.DB) {
	anotHandler := handlers.Anot{}

	r.GET("/anotacoes/:id", anotHandler.GetAnnotationsByIdUser(db))
	r.GET("/anotacao/:id", anotHandler.GetAnnotationByID(db))

	// Implemente outras rotas para as operações relacionadas às anotações...
}
