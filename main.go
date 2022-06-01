package main

import (
	"fmt"
	"todo/config"
)

func init() {
	config.InitConfig()
}

func main() {
	fmt.Println("hello world")
	port := config.GetConfig().Local.Port
	fmt.Println(port)
	return
}
