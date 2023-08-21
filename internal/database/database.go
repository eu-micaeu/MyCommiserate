package database

import (
	"database/sql"
	"fmt"
	"log"
	//"os"

	_ "github.com/lib/pq"
)

func NewDB() (*sql.DB, error) {

	dbUser := "root"
	dbPassword := "exh4Ozgg43FQCyfTk9Frn4F3bdDll3ud"
	dbHost := "dpg-cjb8pi840sqc73b7uhng-a.oregon-postgres.render.com"
	dbPort := "5432"
	dbName := "mycommiserate"

	dsn := fmt.Sprintf("postgres://%s:%s@%s:%s/%s?sslmode=require", dbUser, dbPassword, dbHost, dbPort, dbName)
	db, err := sql.Open("postgres", dsn)
	if err != nil {
		log.Println("Erro ao conectar ao banco de dados:", err)
		return nil, err
	}

	log.Println("Conexão com o banco de dados estabelecida com sucesso")
	return db, nil
}
