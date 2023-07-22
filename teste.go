package main

import (

	"github.com/gin-gonic/gin"
	"github.com/eu-micaeu/MyCommiserate/routes"
	"github.com/eu-micaeu/MyCommiserate/middlewares"
	"github.com/eu-micaeu/MyCommiserate/internal/database"
)

func main() {
	r := gin.Default()
	r.Use(middlewares.CorsMiddleware())

	db, err := database.NewDB()
	if err != nil {
		panic(err)
	}

	// Rotas para os usuários
	routes.UserRoutes(r, db)

	// Rotas para as anotações
	routes.AnotRoutes(r, db)

	// Resto do seu código para servir arquivos estáticos e iniciar o servidor...
	r.Run()
}

// Função para servir os arquivos estáticos e iniciar o servidor...
