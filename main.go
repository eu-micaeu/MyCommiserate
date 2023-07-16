package main

import (
	"database/sql"
	"fmt"
	"log"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"
)

type User struct {
	ID       int    `json:"id_usuario"`
	Username string `json:"username"`
	Password string `json:"password"`
}

type Anot struct {
	ID       int    `json:"id_anot"`
	Titulo   string `json:"titulo"`
	Anotacao string `json:"anotacao"`
}

func main() {

	dbUser := "root"
	dbPassword := "ajCPqarJKpcy6cdvrAHF"
	dbHost := "containers-us-west-83.railway.app"
	dbPort := "7416"
	dbName := "mycommiserate"

	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", dbUser, dbPassword, dbHost, dbPort, dbName)
	db, err := sql.Open("mysql", dsn)
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	r := gin.Default()
	r.Use(cors.Default())

	r.GET("/users/:id", func(c *gin.Context) {
		id := c.Param("id")
		var user User
		row := db.QueryRow("SELECT id_usuario, usuario, senha FROM usuarios WHERE id_usuario = ?", id)
		err := row.Scan(&user.ID, &user.Username, &user.Password)
		if err != nil {
			c.JSON(404, gin.H{"message": "Usuário não encontrado"})
			return
		}
		c.JSON(200, user)
	})

	r.POST("/users", func(c *gin.Context) {
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
		newUser.ID = int(id)
		c.JSON(200, gin.H{"message": "Usuário criado com sucesso!", "user": newUser})
	})

	r.POST("/login", func(c *gin.Context) {
		var user User
		if err := c.BindJSON(&user); err != nil {
			c.JSON(400, gin.H{"message": "Erro ao fazer login"})
			return
		}
		row := db.QueryRow("SELECT id_usuario, usuario, senha FROM usuarios WHERE usuario = ? AND senha = ?", user.Username, user.Password)
		err := row.Scan(&user.ID, &user.Username, &user.Password)
		if err != nil {
			c.JSON(404, gin.H{"message": "Usuário ou senha incorretos"})
			return
		}
		c.JSON(200, gin.H{"message": "Login efetuado com sucesso!", "user": user})
	})

	r.POST("/salvar", func(c *gin.Context) {
		var anot Anot
		if err := c.BindJSON(&anot); err != nil {
			c.JSON(400, gin.H{"message": "Erro ao criar anotação"})
			return
		}
		result, err := db.Exec("INSERT INTO anotacoes (anotacao, titulo) VALUES (?, ?)", anot.Anotacao, anot.Titulo)
		if err != nil {
			c.JSON(500, gin.H{"message": "Erro ao criar anotação"})
			return
		}
		id, err := result.LastInsertId()
		if err != nil {
			c.JSON(500, gin.H{"message": "Erro ao criar anotação"})
			return
		}
		anot.ID = int(id)
		c.JSON(200, gin.H{"message": "Anotação criado com sucesso!", "anot": anot})
	})

	r.Run(":8085")
}
