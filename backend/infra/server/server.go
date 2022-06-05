package server

import (
	"fmt"
	"net/http"
	"todo/config"
	"todo/controller"
	"todo/repository"
	"todo/service"

	_ "todo/docs"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	echoSwagger "github.com/swaggo/echo-swagger"
	"gorm.io/gorm"
)

type Server struct {
	DB *gorm.DB
}

func (server Server) Init() {

	conf := config.GetConfig()

	e := echo.New()

	e.Use(middleware.Logger())

	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
		// AllowHeaders: []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept},
		AllowMethods: []string{"*"},
	}))

	e.GET("/hello", func(c echo.Context) error { return c.String(http.StatusOK, "hello world!") })

	userController := server.GetInjectedUserController()
	userController.InitRouter(e.Group("/user"))

	e.GET("/swagger/*", echoSwagger.WrapHandler)

	e.Logger.Fatal(e.Start(fmt.Sprintf(":%d", conf.Local.Port)))
}

func (server *Server) GetInjectedUserController() *controller.UserController {
	userRepo := repository.NewUserRepositoryImpl(server.DB)
	userService := service.NewUserServiceImpl(userRepo)
	userController := controller.NewUserController(userService)
	return userController
}
