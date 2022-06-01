package main

import (
	"todo/config"
	"todo/infra/database"
	"todo/infra/server"
)

func init() {
	config.InitConfig()
}

func main() {
	maindb := database.DB{}.GetDB()
	server.Server{DB: maindb}.Init()
	return
}
