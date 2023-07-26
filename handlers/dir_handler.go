package handlers

import (
	"database/sql"
	"github.com/gin-gonic/gin"
)

type Dir struct {
	ID_Dir  int    `json:"id_pasta"`
	ID_User int    `json:"id_usuario"`
	Nome    string `json:"nome"`
}

func (u *Dir) GetDirByID(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		id := c.Param("id")
		var dir Dir
		row := db.QueryRow("SELECT id_pasta ,id_usuario, nome FROM pastas WHERE id_usuario = ?", id)
		err := row.Scan(&dir.ID_Dir, &dir.ID_User, &dir.Nome)
		if err != nil {
			c.JSON(404, gin.H{"message": "Pasta não encontrada"})
			return
		}
		c.JSON(200, dir)
	}
}
