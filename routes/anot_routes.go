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
	r.GET("/anotacoes", anotHandler.GetAllAnnotations(db))
	r.POST("/salvar/:id_usuario", anotHandler.PostAnnotation(db))
	r.PUT("/atualizar/:id_anotacao", anotHandler.PutAnnotation(db))
	r.DELETE("/excluir/:id_anotacao", anotHandler.DeleteAnnotation(db))
}
