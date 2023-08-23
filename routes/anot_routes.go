package routes

import (
	"database/sql"

	"github.com/gin-gonic/gin"
	"github.com/eu-micaeu/MyCommiserate/handlers"
)

func AnotRoutes(r *gin.Engine, db *sql.DB) {
	
	anotHandler := handlers.Annotation{}

	r.GET("/anotacoes/:id_usuario", anotHandler.GetAnnotationsByIdUser(db))
	r.GET("/anotacao/:id_anotacao", anotHandler.GetAnnotationByIdAnnotation(db))
	r.POST("/salvar/:id_usuario", anotHandler.PostAnnotation(db))
	r.PUT("/atualizar/:id_anotacao", anotHandler.PutAnnotation(db))
	r.DELETE("/excluir/:id_anotacao", anotHandler.DeleteAnnotation(db))
}
