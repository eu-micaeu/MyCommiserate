package database

import (
	"database/sql"
	"fmt"
	//"os"

	_ "github.com/go-sql-driver/mysql"
)

func NewDB() (*sql.DB, error) {

	dbUser := "root"
dbPassword := "ajCPqarJKpcy6cdvrAHF"
dbHost := "containers-us-west-83.railway.app"
dbPort := "7416"
dbName := "mycommiserate"

	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", dbUser, dbPassword, dbHost, dbPort, dbName)
	db, err := sql.Open("mysql", dsn)
	if err != nil {
		return nil, err
	}

	return db, nil
}
