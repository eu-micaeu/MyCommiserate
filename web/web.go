package web

import (
    "net/http"
)

func server() {
    http.Handle("/", http.FileServer(http.Dir("../")))
    http.ListenAndServe(":8083", nil)
}
