package server

import (
	"fmt"
	"net/http"
	"todo/config"
	"todo/controller"
	customMiddleware "todo/middleware"
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
	DB *gorm.DB

	// repository
	tkRepo   *repository.TokenRepositoryImpl
	userRepo *repository.UserRepositoryImpl
	teamRepo *repository.TeamRepositoryImpl
	tmRepo   *repository.TeammateRepositoryImpl

	// middleware
	authMiddleware *customMiddleware.AuthMiddleware

	// service
	userService *service.UserServiceImpl
	teamService *service.TeamServiceImpl

	// controller
	userController *controller.UserController
	teamController *controller.TeamController
}

func (server Server) Init() {

	conf := config.GetConfig()

	// repository init
	server.tkRepo = repository.NewTokenRepositoryImpl(server.DB)
	server.userRepo = repository.NewUserRepositoryImpl(server.DB)
	server.teamRepo = repository.NewTeamRepositoryImpl(server.DB)
	server.teamRepo = repository.NewTeamRepositoryImpl(server.DB)
	server.tmRepo = repository.NewTeammateRepositoryImpl(server.DB)

	// middleware init
	server.authMiddleware = customMiddleware.NewAuthMiddleware(server.tkRepo, server.userRepo)

	// service init
	server.userService = service.NewUserServiceImpl(server.userRepo, server.tkRepo)
	server.teamService = service.NewTeamServiceImpl(server.teamRepo, server.userRepo, server.tmRepo)

	// controller init
	server.userController = controller.NewUserController(server.userService)
	server.teamController = controller.NewTeamController(server.teamService)

	// token expire
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

	server.userController.InitRouter(e.Group("/user"))
	server.teamController.InitRouter(e.Group("/team", server.authMiddleware.AuthMiddleware))

	e.GET("/swagger/*", echoSwagger.WrapHandler)

	e.Logger.Fatal(e.Start(fmt.Sprintf(":%d", conf.Local.Port)))
}
