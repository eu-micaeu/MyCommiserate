package database

import (
	"database/sql"
	"fmt"
	// "os"

	_ "github.com/go-sql-driver/mysql"
	// "github.com/joho/godotenv"
)

func NewDB() (*sql.DB, error) {

	/*err := godotenv.Load()
    if err != nil {
        fmt.Println("Erro ao carregar o arquivo .env:", err)
        return nil, err
    }

	dbUser := os.Getenv("DB_USER")
	dbPassword := os.Getenv("DB_PASSWORD")
	dbHost := os.Getenv("DB_HOST")
	dbPort := os.Getenv("DB_PORT")
	dbName := os.Getenv("DB_NAME")

	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", dbUser, dbPassword, dbHost, dbPort, dbName)
	db, err := sql.Open("mysql", dsn)
	if err != nil {
		return nil, err
	}*/ //Config. determinada para rodar na própria máquina.

	dbUser := "DB_USER"
	dbPassword := "DB_PASSWORD"
	dbHost := "DB_HOST"
	dbPort := "DB_PORT"
	dbName := "DB_NAME"

	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", dbUser, dbPassword, dbHost, dbPort, dbName)
	db, err := sql.Open("mysql", dsn)
	if err != nil {
		return nil, err
	} //Config. determinada para rodar na deploy.

	return db, nil
}
