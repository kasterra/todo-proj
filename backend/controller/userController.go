package controller

import (
	"net/http"

	"todo/model/dto"
	"todo/service"

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
	e.GET("/SignIn", userController.SignIn)
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

	return c.NoContent(http.StatusNoContent)
}
