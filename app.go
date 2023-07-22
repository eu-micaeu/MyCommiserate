package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
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

	

	r := gin.Default()
	r.Use(cors.Default())

	// GET - USUARIO ATRAVÉS DO ID QUE IRÁ RETORNAR O ID, NOME DO USUARIO, SENHA
	r.GET("/users/:id", func(c *gin.Context) {
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

	// GET - USUARIO ATRAVÉS DO NOME DO USUARIO QUE IRÁ RETORNAR O ID DELE
	r.GET("/users/usuario/:username", func(c *gin.Context) {
		username := c.Param("username")
		var id int 
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

		// Crie um slice para armazenar as anotações
		var anotacoes []Anot

		// Execute a consulta ao banco de dados
		rows, err := db.Query("SELECT id_anotacao, id_usuario, titulo, anotacao FROM anotacoes WHERE id_usuario = ?", id)
		if err != nil {
			c.JSON(500, gin.H{"message": "Erro ao obter as anotações"})
			return
		}
		defer rows.Close()

		// Percorra as linhas retornadas e adicione as anotações ao slice
		for rows.Next() {
			var anot Anot
			err := rows.Scan(&anot.ID_Anot, &anot.ID_User, &anot.Titulo, &anot.Anotacao)
			if err != nil {
				c.JSON(500, gin.H{"message": "Erro ao ler as anotações"})
				return
			}
			anotacoes = append(anotacoes, anot)
		}

		// Verifique se houve algum erro durante o loop ou se não foram encontradas anotações
		if err := rows.Err(); err != nil {
			c.JSON(404, gin.H{"message": "Anotações não encontradas"})
			return
		}

		c.JSON(200, anotacoes)
	})

	// GET - ANOTACAO ATRAVÉS DO ID QUE IRÁ RETORNAR O ID, TITULO, CONTEUDO DA ANOTACAO
	r.GET("/anotacao/:id", func(c *gin.Context) {
		id := c.Param("id")
		var anot Anot
		row := db.QueryRow("SELECT id_anotacao, id_usuario, titulo, anotacao FROM anotacoes WHERE id_anotacao = ?", id)
		err := row.Scan(&anot.ID_Anot, &anot.ID_User, &anot.Titulo, &anot.Anotacao)
		if err != nil {
			c.JSON(404, gin.H{"message": "Anotação não encontrado"})
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
		c.JSON(200, gin.H{"message": "Anotação criada com sucesso!", "anot": anot})
	})

	r.POST("/atualizar/:id_anotacao", func(c *gin.Context) {
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
	})

	r.DELETE("/excluir/:id_anotacao", func(c *gin.Context) {
		idAnotacao := c.Param("id_anotacao")

		// Realiza a operação DELETE no banco de dados usando o ID fornecido.
		_, err := db.Exec("DELETE FROM anotacoes WHERE id_anotacao = ?", idAnotacao)
		if err != nil {
			c.JSON(500, gin.H{"message": "Erro ao excluir anotação"})
			return
		}

		c.JSON(200, gin.H{"message": "Anotação excluída com sucesso!"})
	})
	

	

	r.LoadHTMLGlob("views/*.html") 

	
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

	r.GET("/editar.html", func(c *gin.Context) {
		c.HTML(http.StatusOK, "editar.html", nil)
	})

	// Rota estática para servir os arquivos CSS, JS e imagens
	r.Static("/static", "./static")

	r.Run()

	fmt.Println("Caminho absoluto para o diretório de arquivos estáticos:", filepath.Join(".", "views"))

}
