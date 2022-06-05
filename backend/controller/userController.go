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

// @Summary Sign up
// @Description Save user's info
// @Accept json
// @Produce json
// @Param Name body string true "User's name"
// @Param Email body string true "User's email"
// @Param Password body string true "User password"
// @Success 200 {object} dto.UserDto "password, token are empty"
// @Failure 400 {object} response.apiErrorResponse "when user binding fail -> body data was not vaild"
// @Failure 500 {object} response.apiErrorResponse "when user save fail-> user is already exists"
// @Router /user/SignUp [post]
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

// @Summary Sign in
// @Description Get JWT token
// @Accept json
// @Produce json
// @Param Email body string true "User's email"
// @Param Password body string true "User's password"
// @Success 200 {object} dto.UserDto "Only Jwt"
// @Failure 400 {object} response.apiErrorResponse "when user binding fail -> body data was not vaild"
// @Failure 500 {object} response.apiErrorResponse "when user sign in error -> wrong data"
// @Router /user/SignIn [post]
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

// @Summary Check Token
// @Description Get User info using token
// @Produce json
// @Param Token header string true "Authorization"
// @Success 200 {object} dto.UserDto "User's info"
// @Failure 401 {object} response.apiErrorResponse "when token was not vaild"
// @Router /user/Token [get]
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
