package handlers

import (
	"database/sql"
	"github.com/gin-gonic/gin"
)

type Anot struct {
	ID_Anot  int    `json:"id_anotacao"`
	ID_User  int    `json:"id_usuario"`
	Titulo   string `json:"titulo"`
	Anotacao string `json:"anotacao"`
}

// Handlers para as operações relacionadas às anotações
func (u *User) GetAnnotationByID(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		id := c.Param("id")
		var anot Anot
		row := db.QueryRow("SELECT id_anotacao, id_usuario, titulo, anotacao FROM anotacoes WHERE id_anotacao = ?", id)
		err := row.Scan(&anot.ID_Anot, &anot.ID_User, &anot.Titulo, &anot.Anotacao)
		if err != nil {
			c.JSON(404, gin.H{"message": "Anotação não encontrado"})
			return
		}
		c.JSON(200, anot)
	}
}

func (u *User) GetAnnotationsByIdUser(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		id := c.Param("id")

		var anotacoes []Anot

		rows, err := db.Query("SELECT id_anotacao, id_usuario, titulo, anotacao FROM anotacoes WHERE id_usuario = ?", id)
		if err != nil {
			c.JSON(500, gin.H{"message": "Erro ao obter as anotações"})
			return
		}
		defer rows.Close()

		for rows.Next() {
			var anot Anot
			err := rows.Scan(&anot.ID_Anot, &anot.ID_User, &anot.Titulo, &anot.Anotacao)
			if err != nil {
				c.JSON(500, gin.H{"message": "Erro ao ler as anotações"})
				return
			}
			anotacoes = append(anotacoes, anot)
		}

		if err := rows.Err(); err != nil {
			c.JSON(404, gin.H{"message": "Anotações não encontradas"})
			return
		}

		c.JSON(200, anotacoes)
	}
}

