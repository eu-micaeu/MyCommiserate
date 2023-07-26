package handlers

import (
	"database/sql"
	"strconv"

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

		var pastas []Dir

		rows, err := db.Query("SELECT id_pasta, id_usuario, nome FROM pastas WHERE id_usuario = ?", id)
		if err != nil {
			c.JSON(500, gin.H{"message": "Erro ao obter as pastas"})
			return
		}
		defer rows.Close()

		for rows.Next() {
			var dir Dir
			err := rows.Scan(&dir.ID_Dir, &dir.ID_User, &dir.Nome)
			if err != nil {
				c.JSON(500, gin.H{"message": "Erro ao ler as pastas"})
				return
			}
			pastas = append(pastas, dir)
		}

		if err := rows.Err(); err != nil {
			c.JSON(404, gin.H{"message": "Pastas não encontradas"})
			return
		}

		// Retorne um erro 404 se a lista de pastas estiver vazia
		if len(pastas) == 0 {
			c.JSON(404, gin.H{"message": "Nenhum retorno"})
			return
		}

		c.JSON(200, pastas)
	}
}

func (u *Dir) PostDir(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		id_usuario := c.Param("id_usuario")
		var dir Dir
		if err := c.BindJSON(&dir); err != nil {
			c.JSON(400, gin.H{"message": "Erro ao criar a pasta"})
			return
		}
		result, err := db.Exec("INSERT INTO pastas (id_usuario, nome, data_hora) VALUES (?, ?, DATE_SUB(NOW(), INTERVAL 3 HOUR))", id_usuario, dir.Nome)
		if err != nil {
			c.JSON(500, gin.H{"message": "Erro ao criar a pasta"})
			return
		}
		id, err := result.LastInsertId()
		if err != nil {
			c.JSON(500, gin.H{"message": "Erro ao criar a pasta"})
			return
		}
		num, err := strconv.Atoi(id_usuario)
		if err != nil {
			return
		}
		dir.ID_Dir = int(id)
		dir.ID_User = num
		c.JSON(200, gin.H{"message": "Pasta criada com sucesso!", "dir": dir})
	}
}
