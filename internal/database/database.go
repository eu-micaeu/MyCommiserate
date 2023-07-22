package database

import (
	"database/sql"
	"fmt"
	"log"
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

func database() {
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

}
