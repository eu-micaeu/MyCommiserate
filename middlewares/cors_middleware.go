package middlewares

import (
    "github.com/gin-contrib/cors" // Importa o pacote "cors" para lidar com as configurações de Compartilhamento de Recursos de Origem Cruzada (CORS).
    "github.com/gin-gonic/gin"   // Importa o pacote "gin", que é o framework web utilizado nesta aplicação.
)

// CorsMiddleware é uma função de middleware que configura as definições do CORS (Compartilhamento de Recursos de Origem Cruzada) para a aplicação Gin.
func CorsMiddleware() gin.HandlerFunc {
    config := cors.DefaultConfig() // Cria uma nova configuração de CORS com as definições padrão.

    config.AllowOrigins = []string{"*"} // Permite requisições de qualquer origem (todas as origens) com o asterisco (*).

    return cors.New(config) // Cria e retorna um novo handler de middleware do CORS com a configuração especificada.
}
