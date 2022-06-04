package controller

import (
	"net/http"

	"todo/model/dto"
	"todo/service"
	"todo/service/auth"

	"github.com/labstack/echo/v4"
)

type UserController struct {
	service.UserService
}

func NewUserController(userService service.UserService) *UserController {
	return &UserController{UserService: userService}
}

func (userController *UserController) InitRouter(e *echo.Group) {

	// signUp
	e.POST("/SignUp", userController.SignUp)

	// login
	e.POST("/SignIn", userController.SignIn)

	// check Token
	e.GET("/Token", userController.CheckToken)
}

func (userController *UserController) SignUp(c echo.Context) error {
	var err error
	userDto := &dto.UserDto{}

	err = c.Bind(&userDto)

	if err != nil {
		c.Logger().Error(err)
		// TODO: error 처리 json으로 자세하게 보내주기 -> 아마 에러 처리하는 로직을 하나 만들 것 같음
		return c.String(http.StatusBadRequest, "User info bind error")
	}

	user, err := userController.UserService.SignUp(userDto)
	if err != nil {
		c.Logger().Error(err)
		return c.String(http.StatusInternalServerError, "Create User Error")
	}

	c.Logger().Info(user)
	return c.JSON(http.StatusOK, user)
}

func (userController *UserController) SignIn(c echo.Context) error {
	var err error
	userDto := &dto.UserDto{}

	err = c.Bind(&userDto)

	if err != nil {
		c.Logger().Error(err)
		// TODO: error 처리 json으로 자세하게 보내주기 -> 아마 에러 처리하는 로직을 하나 만들 것 같음
		return c.String(http.StatusBadRequest, "User info bind error")
	}

	user, err := userController.UserService.SignIn(userDto)
	if err != nil {
		c.Logger().Error(err)
		return c.String(http.StatusInternalServerError, "Sign in Error")
	}

	c.Logger().Info(user)
	return c.JSON(http.StatusOK, user)
}

func (userController *UserController) CheckToken(c echo.Context) error {
	email, err := auth.TokenValid(c.Request())
	if err != nil {
		return err
	}

	userDto := &dto.UserDto{Email: email}

	user, err := userController.UserService.FindUserFromEmail(userDto)
	if err != nil {
		return err
	}
	return c.JSON(http.StatusOK, user)
}
