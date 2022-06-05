package main

import (
	"todo/config"
	"todo/infra/database"
	"todo/infra/server"
)

func init() {
	config.InitConfig()
}

// @title Todo Swagger
// @version 1.0
// @host {host}:8080
// @BasePath /
func main() {
	maindb := database.DB{}.GetDB()
	server.Server{DB: maindb}.Init()
	return
}
