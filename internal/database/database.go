package database

import (
	"database/sql"
	"fmt"

	_ "github.com/go-sql-driver/mysql"
)

func NewDB() (*sql.DB, error) {
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
