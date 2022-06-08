package server

import (
	"fmt"
	"net/http"
	"todo/config"
	"todo/controller"
	"todo/repository"
	"todo/service"

	_ "todo/docs"

	"github.com/jasonlvhit/gocron"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	echoSwagger "github.com/swaggo/echo-swagger"
	"gorm.io/gorm"
)

type Server struct {
	DB     *gorm.DB
	tkRepo *repository.TokenRepositoryImpl
}

func (server Server) Init() {

	conf := config.GetConfig()

	server.tkRepo = repository.NewTokenRepositoryImpl(server.DB)

	go func() {
		gocron.Every(1).Minute().Do(func() {
			err := server.tkRepo.Expire()
			if err != nil {
				fmt.Println(err)
			}
		})
		<-gocron.Start()
	}()

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
	userService := service.NewUserServiceImpl(userRepo, server.tkRepo)
	userController := controller.NewUserController(userService)
	return userController
}
