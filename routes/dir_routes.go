package routes

import (
	"database/sql"

	"github.com/gin-gonic/gin"
	"github.com/eu-micaeu/MyCommiserate/handlers"
)

func DirRoutes(r *gin.Engine, db *sql.DB) {
	dirHandler := handlers.Dir{}

	r.GET("/pastas/:id", dirHandler.GetDirByID(db))
	r.POST("/criar/:id_usuario", dirHandler.PostDir(db))
	r.PUT("/pastas/:id_pasta/anotacoes/:id_anotacao", dirHandler.PutAnotacao(db))
	r.PUT("/pastas/excluir/:id_anotacao", dirHandler.PutAnotacaoDeleteByDir(db))
	r.DELETE("/excluir_pasta/:id_pasta", dirHandler.DeleteDir(db))
}


