package handlers

import (
	"database/sql"

	"github.com/gin-gonic/gin"
)

type User struct {
	ID_User  int    `json:"id_usuario"`
	Username string `json:"username"`
	Password string `json:"password"`
}

// Handlers para as operações relacionadas aos usuários
func (u *User) GetUserByID(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		id := c.Param("id")
		var user User
		row := db.QueryRow("SELECT id_usuario, usuario, senha FROM usuarios WHERE id_usuario = ?", id)
		err := row.Scan(&user.ID_User, &user.Username, &user.Password)
		if err != nil {
			c.JSON(404, gin.H{"message": "Usuário não encontrado"})
			return
		}
		c.JSON(200, user)
	}
}

func (u *User) GetUserByUsername(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		username := c.Param("username")
		var id int 
		row := db.QueryRow("SELECT id_usuario FROM usuarios WHERE usuario = ?", username)
		err := row.Scan(&id)
		if err != nil {
			c.JSON(404, gin.H{"message": "Usuário não encontrado"})
			return
		}
		c.JSON(200, gin.H{"id": id})
	}
}



// Implemente outros handlers para operações relacionadas aos usuários...
