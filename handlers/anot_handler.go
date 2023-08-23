package handlers

import (
	"database/sql"
	"github.com/gin-gonic/gin"
)

type Annotation struct {
	ID_Anot  int    `json:"id_anotacao"`
	ID_User  int    `json:"id_usuario"`
	Titulo   string `json:"titulo"`
	Anotacao string `json:"anotacao"`
	Data     string `json:"data"`
}

func (u *Annotation) GetAnnotationByIdAnnotation(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		id := c.Param("id_anotacao")
		var anot Annotation
		row := db.QueryRow("SELECT id_annotation, id_user, title, annotation, date FROM annotations WHERE id_annotation = $1", id)
		err := row.Scan(&anot.ID_Anot, &anot.ID_User, &anot.Titulo, &anot.Anotacao, &anot.Data)
		if err != nil {
			c.JSON(404, gin.H{"message": "Anotação não encontrada"})
			return
		}
		c.JSON(200, anot)
	}
}

func (u *Annotation) GetAnnotationsByIdUser(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		id := c.Param("id_usuario")

		var anotacoes []Annotation

		rows, err := db.Query("SELECT id_annotation, id_user, title, annotation, date FROM annotations WHERE id_user = $1 ORDER BY date DESC", id)
		if err != nil {
			c.JSON(500, gin.H{"message": "Erro ao obter as anotações"})
			return
		}
		defer rows.Close()

		for rows.Next() {
			var anot Annotation
			err := rows.Scan(&anot.ID_Anot, &anot.ID_User, &anot.Titulo, &anot.Anotacao, &anot.Data)
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

func (u *Annotation) PostAnnotation(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		id_usuario := c.Param("id_usuario")
		var anot Annotation
		if err := c.BindJSON(&anot); err != nil {
			c.JSON(400, gin.H{"message": "Erro ao criar anotação"})
			return
		}
		result, err := db.Exec("INSERT INTO annotations (id_user, annotation, title, date) VALUES ($1, $2, $3, NOW() - INTERVAL '3 hours')", id_usuario, anot.Anotacao, anot.Titulo)
		if err != nil {
			c.JSON(500, gin.H{"message": "Erro ao criar anotação"})
			return
		}
		id, err := result.LastInsertId()
		if err != nil {
			c.JSON(500, gin.H{"message": "Erro ao criar anotação"})
			return
		}
		anot.ID_Anot = int(id)
		c.JSON(200, gin.H{"message": "Anotação criada com sucesso!", "anot": anot})
	}
}

func (u *Annotation) PutAnnotation(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		idAnotacao := c.Param("id_anotacao")
		var anot Annotation
		if err := c.BindJSON(&anot); err != nil {
			c.JSON(400, gin.H{"message": "Erro ao atualizar anotação"})
			return
		}
		_, err := db.Exec("UPDATE annotations SET title = $1, annotation = $2 WHERE id_annotation = $3", anot.Titulo, anot.Anotacao, idAnotacao)
		if err != nil {
			c.JSON(500, gin.H{"message": "Erro ao atualizar anotação"})
			return
		}
		c.JSON(200, gin.H{"message": "Anotação atualizada com sucesso!", "anot": anot})
	}
}

func (u *Annotation) DeleteAnnotation(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		idAnotacao := c.Param("id_anotacao")

		_, err := db.Exec("DELETE FROM annotations WHERE id_annotation = $1", idAnotacao)
		if err != nil {
			c.JSON(500, gin.H{"message": "Erro ao excluir anotação"})
			return
		}

		c.JSON(200, gin.H{"message": "Anotação excluída com sucesso!"})
	}
}
