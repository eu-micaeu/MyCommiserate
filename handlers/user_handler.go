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

func (u *User) GetAllUsers(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var usuarios []User
		rows, err := db.Query("SELECT id_usuario, usuario, senha FROM usuarios")
		if err != nil {
			c.JSON(500, gin.H{"message": "Erro ao buscar usuarios"})
			return
		}
		defer rows.Close()
		for rows.Next() {
			var user User
			err := rows.Scan(&user.ID_User, &user.Username, &user.Password)
			if err != nil {
				c.JSON(500, gin.H{"message": "Erro ao buscar usuarios"})
				return
			}
			usuarios = append(usuarios, user)
		}
		c.JSON(200, usuarios)
	}
}

func (u *User) PostUser(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var newUser User
		if err := c.BindJSON(&newUser); err != nil {
			c.JSON(400, gin.H{"message": "Erro ao criar usuário"})
			return
		}
		result, err := db.Exec("INSERT INTO usuarios (usuario, senha) VALUES (?, ?)", newUser.Username, newUser.Password)
		if err != nil {
			c.JSON(500, gin.H{"message": "Erro ao criar usuário"})
			return
		}
		id, err := result.LastInsertId()
		if err != nil {
			c.JSON(500, gin.H{"message": "Erro ao criar usuário"})
			return
		}
		newUser.ID_User = int(id)
		c.JSON(200, gin.H{"message": "Usuário criado com sucesso!", "user": newUser})
	}
}

func (u *User) PostLogin(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var user User
		if err := c.BindJSON(&user); err != nil {
			c.JSON(400, gin.H{"message": "Erro ao fazer login"})
			return
		}
		row := db.QueryRow("SELECT id_usuario, usuario, senha FROM usuarios WHERE usuario = ? AND senha = ?", user.Username, user.Password)
		err := row.Scan(&user.ID_User, &user.Username, &user.Password)
		if err != nil {
			c.JSON(404, gin.H{"message": "Usuário ou senha incorretos"})
			return
		}
		c.JSON(200, gin.H{"message": "Login efetuado com sucesso!", "user": user})

	}
}
