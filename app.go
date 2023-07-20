package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"os"
	"path/filepath"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"
)

type User struct {
	ID_User  int    `json:"id_usuario"`
	Username string `json:"username"`
	Password string `json:"password"`
}

type Anot struct {
	ID_Anot  int    `json:"id_anotacao"`
	ID_User  int    `json:"id_usuario"`
	Titulo   string `json:"titulo"`
	Anotacao string `json:"anotacao"`
}

func main() {

	server()
}


func server() {
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

	port := os.Getenv("PORT")
	if port == "" {
		port = "3000"
	}

	r := gin.Default()
	r.Use(cors.Default())


	r.GET("/users/id/:id", func(c *gin.Context) {
		id := c.Param("id")
		var user User
		row := db.QueryRow("SELECT id_usuario, usuario, senha FROM usuarios WHERE id_usuario = ?", id)
		err := row.Scan(&user.ID_User, &user.Username, &user.Password)
		if err != nil {
			c.JSON(404, gin.H{"message": "Usuário não encontrado"})
			return
		}
		c.JSON(200, user)
	})

	r.GET("/users/usuario/:username", func(c *gin.Context) {
		username := c.Param("username")
		var id int // Change the type to match your ID_User type (e.g., int)
		row := db.QueryRow("SELECT id_usuario FROM usuarios WHERE usuario = ?", username)
		err := row.Scan(&id)
		if err != nil {
			c.JSON(404, gin.H{"message": "Usuário não encontrado"})
			return
		}
		c.JSON(200, gin.H{"id": id})
	})

	r.GET("/anotacoes/:id", func(c *gin.Context) {
		id := c.Param("id")
		var anot Anot
		row := db.QueryRow("SELECT id_anotacao, titulo, anotacao FROM anotacoes WHERE id_usuario = ?", id)
		err := row.Scan(&anot.ID_Anot, &anot.Titulo, &anot.Anotacao)
		if err != nil {
			c.JSON(404, gin.H{"message": "Anotação não encontrada"})
			return
		}
		c.JSON(200, anot)
	})

	r.GET("/users", func(c *gin.Context) {
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
	})

	r.GET("/anotacoes", func(c *gin.Context) {
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
		newUser.ID_User = int(id)
		c.JSON(200, gin.H{"message": "Usuário criado com sucesso!", "user": newUser})
	})

	r.POST("/login", func(c *gin.Context) {
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

	})

	r.POST("/salvar/:id_usuario", func(c *gin.Context) {
		id_usuario := c.Param("id_usuario")
		var anot Anot
		if err := c.BindJSON(&anot); err != nil {
			c.JSON(400, gin.H{"message": "Erro ao criar anotação"})
			return
		}
		result, err := db.Exec("INSERT INTO anotacoes (id_usuario, anotacao, titulo) VALUES (?, ?, ?)", id_usuario, anot.Anotacao, anot.Titulo)
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
		c.JSON(200, gin.H{"message": "Anotação criado com sucesso!", "anot": anot})
	})
	r.LoadHTMLGlob("views/*.html") // Carregar todos os arquivos HTML dentro da pasta views

    // Rota para servir a página inicial (index.html)
    r.GET("/", func(c *gin.Context) {
        c.HTML(http.StatusOK, "index.html", nil)
    })

    r.GET("/home.html", func(c *gin.Context) {
        c.HTML(http.StatusOK, "home.html", nil)
    })

    r.GET("/cadastro.html", func(c *gin.Context) {
        c.HTML(http.StatusOK, "cadastro.html", nil)
    })

    r.GET("/anotacoes.html", func(c *gin.Context) {
        c.HTML(http.StatusOK, "anotacoes.html", nil)
    })

    // Rota estática para servir os arquivos CSS, JS e imagens
    r.Static("/static", "./static")

    r.Run()

	// Antes de r.Run()
fmt.Println("Caminho absoluto para o diretório de arquivos estáticos:", filepath.Join(".", "views"))

}
