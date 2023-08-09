 package main

import (
	"net/http"

	"github.com/eu-micaeu/MyCommiserate/internal/database"
	"github.com/eu-micaeu/MyCommiserate/middlewares"
	"github.com/eu-micaeu/MyCommiserate/routes"
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	r.Use(middlewares.CorsMiddleware())

	db, err := database.NewDB()
	if err != nil {
		panic(err)
	}

	routes.UserRoutes(r, db)
	routes.AnotRoutes(r, db)

	r.LoadHTMLGlob("views/*.html") 

	r.GET("/login", func(c *gin.Context) {
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

	r.GET("/", func(c *gin.Context) {
		c.HTML(http.StatusOK, "carregar.html", nil)
	})

	r.GET("/erro", func(c *gin.Context) {
		c.HTML(http.StatusOK, "error.html", nil)
	})

	r.Static("/static", "./static")
	
	r.Run()
}

