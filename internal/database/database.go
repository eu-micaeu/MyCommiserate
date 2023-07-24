package database

import (
	"database/sql"
	"fmt"

	_ "github.com/go-sql-driver/mysql"
	"github.com/joho/godotenv"
)

func NewDB() (*sql.DB, error) {

	err := godotenv.Load()
    if err != nil {
        fmt.Println("Erro ao carregar o arquivo .env:", err)
        return nil, err
    }

	dbUser := "DB_USER"
	dbPassword := "DB_PASSWORD"
	dbHost := "DB_HOST"
	dbPort := "DB_PORT"
	dbName := "DB_NAME"

	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", dbUser, dbPassword, dbHost, dbPort, dbName)
	db, err := sql.Open("mysql", dsn)
	if err != nil {
		return nil, err
	}



	return db, nil
}
