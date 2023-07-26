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

func (u *Anot) GetAnnotationByID(db *sql.DB) gin.HandlerFunc {
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

func (u *Anot) GetAnnotationsByIdUser(db *sql.DB) gin.HandlerFunc {
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

func (u *Anot) GetAnnotationsByIdUserByDir(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		id := c.Param("id")

		var anotacoes []Anot

		rows, err := db.Query("SELECT ano.id_anotacao, pas.id_usuario, ano.titulo, ano.anotacao FROM anotacoes ano INNER JOIN pastas pas ON pas.id_pasta = ano.id_pasta WHERE pas.id_pasta = ?", id)
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

func (u *Anot) GetAllAnnotations(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var anotacoes []Anot
		rows, err := db.Query("SELECT id_anotacao, titulo, anotacao FROM anotacoes")
		if err != nil {
			c.JSON(500, gin.H{"message": "Erro ao buscar anotações"})
			return
		}
		defer rows.Close()
		for rows.Next() {
			var anot Anot
			err := rows.Scan(&anot.ID_Anot, &anot.Titulo, &anot.Anotacao)
			if err != nil {
				c.JSON(500, gin.H{"message": "Erro ao buscar anotações"})
				return
			}
			anotacoes = append(anotacoes, anot)
		}
		c.JSON(200, anotacoes)
	}
}



func (u *Anot) PostAnnotation(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		id_usuario := c.Param("id_usuario")
		var anot Anot
		if err := c.BindJSON(&anot); err != nil {
			c.JSON(400, gin.H{"message": "Erro ao criar anotação"})
			return
		}
		result, err := db.Exec("INSERT INTO anotacoes (id_usuario, anotacao, titulo, data_hora) VALUES (?, ?, ?, DATE_SUB(NOW(), INTERVAL 3 HOUR))", id_usuario, anot.Anotacao, anot.Titulo)
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

func (u *Anot) PutAnnotation(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		idAnotacao := c.Param("id_anotacao")
		var anot Anot
		if err := c.BindJSON(&anot); err != nil {
			c.JSON(400, gin.H{"message": "Erro ao atualizar anotação"})
			return
		}
		_, err := db.Exec("UPDATE anotacoes SET titulo = ?, anotacao = ? WHERE id_anotacao = ?", anot.Titulo, anot.Anotacao, idAnotacao)
		if err != nil {
			c.JSON(500, gin.H{"message": "Erro ao atualizar anotação"})
			return
		}
		c.JSON(200, gin.H{"message": "Anotação atualizada com sucesso!", "anot": anot})
	}
}

func (u *Anot) DeleteAnnotation(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		idAnotacao := c.Param("id_anotacao")

		// Realiza a operação DELETE no banco de dados usando o ID fornecido.
		_, err := db.Exec("DELETE FROM anotacoes WHERE id_anotacao = ?", idAnotacao)
		if err != nil {
			c.JSON(500, gin.H{"message": "Erro ao excluir anotação"})
			return
		}

		c.JSON(200, gin.H{"message": "Anotação excluída com sucesso!"})
	}
}



