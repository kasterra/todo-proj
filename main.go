package main

import (
	"fmt"
	"net/http"
	"todo/config"

	"github.com/labstack/echo/v4"
)

func init() {
	config.InitConfig()
}

func main() {
	conf := config.GetConfig()

	e := echo.New()

	e.GET("/hello", func(c echo.Context) error { return c.String(http.StatusOK, "hello world!") })

	e.Logger.Fatal(e.Start(fmt.Sprintf(":%d", conf.Local.Port)))

	return
}
