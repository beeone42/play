package main

import (
	"encoding/json"
    "html/template"
    "net/http"
	"log"
	"regexp"
	"fmt"
//	"os"
//	"io"
	"io/ioutil"
	"bytes"
//	"path"
//	"strings"
//	"strconv"
)

type Video struct {
	Id string
}

type Playlist struct {
	Id string
	Items []Video
}

var ajaxPlaylistPath = regexp.MustCompile("^/ajax/playlist/(get|set)/([a-zA-Z0-9]+)$")

func renderTemplate(w http.ResponseWriter, tmpl string) {
    t, err := template.ParseFiles("views/" + tmpl + ".html")
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }
    err = t.Execute(w, nil)
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
    }
}

func mainHandler(w http.ResponseWriter, r *http.Request) {
	renderTemplate(w, "index")
}

func masterHandler(w http.ResponseWriter, r *http.Request) {
	renderTemplate(w, "master")
}

func slaveHandler(w http.ResponseWriter, r *http.Request) {
	renderTemplate(w, "slave")
}

func playlistGetHandler(w http.ResponseWriter, r *http.Request) {
	
	var res Playlist
	res.Id = "TEST"
	res.Items = append(res.Items, Video{Id: "kdemFfbS5H0"})
	res.Items = append(res.Items, Video{Id: "ebXbLfLACGM"})

	b, err := json.Marshal(res)
	if err != nil {
		log.Println(err.Error())
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.Write(b)
}

func jsonQuery(url string, jsonStr []byte) ([]byte, error) {
    fmt.Println("request JSON:", string(jsonStr))
    req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonStr))
    req.Header.Set("Content-Type", "application/json")
    client := &http.Client{}
    resp, err := client.Do(req)
    if err != nil {
    	log.Println(err.Error())
    	return nil, err
    }
    defer resp.Body.Close()
    body, err := ioutil.ReadAll(resp.Body)
    fmt.Println("response Body:", string(body))
    return body, nil
}
