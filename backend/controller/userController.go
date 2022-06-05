package controller

import (
	"net/http"

	"todo/controller/response"
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
		return response.ReturnApiFail(c, http.StatusBadRequest, err, "User info bind error")
	}

	user, err := userController.UserService.SignUp(userDto)
	if err != nil {
		c.Logger().Error(err)
		return response.ReturnApiFail(c, http.StatusInternalServerError, err, "User Sign up Error")
	}

	c.Logger().Info(user)
	return response.ReturnApiSuccess(c, http.StatusOK, user)
}

func (userController *UserController) SignIn(c echo.Context) error {
	var err error
	userDto := &dto.UserDto{}

	err = c.Bind(&userDto)

	if err != nil {
		c.Logger().Error(err)
		return response.ReturnApiFail(c, http.StatusBadRequest, err, "User info bind error")
	}

	user, err := userController.UserService.SignIn(userDto)
	if err != nil {
		c.Logger().Error(err)
		return response.ReturnApiFail(c, http.StatusInternalServerError, err, "User Sign in Error")
	}

	c.Logger().Info(user)
	return response.ReturnApiSuccess(c, http.StatusOK, user)
}

func (userController *UserController) CheckToken(c echo.Context) error {
	email, err := auth.TokenValid(c.Request())
	if err != nil {
		return response.ReturnApiFail(c, http.StatusUnauthorized, err, "Token was not valid")
	}

	userDto := &dto.UserDto{Email: email}

	user, err := userController.UserService.FindUserFromEmail(userDto)
	if err != nil {
		return response.ReturnApiFail(c, http.StatusUnauthorized, err, "Wrong Token")
	}
	return response.ReturnApiSuccess(c, http.StatusOK, user)
}
