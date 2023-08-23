package handlers

import (
	"database/sql"
	"github.com/gin-gonic/gin"
)

type User struct {
	ID_User  int    `json:"id_user"`
	Username string `json:"username"`
	Password string `json:"password"`
	Date     string `json:"date"`
}

func (u *User) GetUserByID(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		id := c.Param("id")
		var user User
		row := db.QueryRow("SELECT id_user, nickname_user, password_user FROM users WHERE id_user = $1", id)
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
		row := db.QueryRow("SELECT id_user FROM users WHERE nickname_user = $1", username)
		err := row.Scan(&id)
		if err != nil {
			c.JSON(404, gin.H{"message": "Usuário não encontrado"})
			return
		}
		c.JSON(200, gin.H{"id": id})
	}
}

func (u *User) PostUser(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var newUser User
		if err := c.BindJSON(&newUser); err != nil {
			c.JSON(400, gin.H{"message": "Erro ao criar usuário"})
			return
		}
		_, err := db.Exec("INSERT INTO users (nickname_user, pasword_user, create_user) VALUES ($1, $2, NOW())", newUser.Username, newUser.Password)
		if err != nil {
			c.JSON(500, gin.H{"message": "Erro ao criar usuário"})
			return
		}

		c.JSON(200, gin.H{"message": "Usuário criado com sucesso!"})
	}
}

func (u *User) PostLogin(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var user User
		if err := c.BindJSON(&user); err != nil {
			c.JSON(400, gin.H{"message": "Erro ao fazer login"})
			return
		}
		row := db.QueryRow("SELECT id_user, nickname_user, password_user, create_user FROM users WHERE nickname_user = $1 AND password_user = $2", user.Username, user.Password)
		err := row.Scan(&user.ID_User, &user.Username, &user.Password, &user.Date)
		if err != nil {
			c.JSON(404, gin.H{"message": "Usuário ou senha incorretos"})
			return
		}
		c.JSON(200, gin.H{"message": "Login efetuado com sucesso!", "user": user})

	}
}
