package main

import (
    "net/http"
)

func main() {
	http.HandleFunc("/", mainHandler)
	http.HandleFunc("/master/", masterHandler)
	http.HandleFunc("/slave/", slaveHandler)
	http.HandleFunc("/ajax/playlist/get/", playlistGetHandler)
	http.ListenAndServe("127.0.0.1:3001", nil)
}
