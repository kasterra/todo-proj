package middleware

import (
	"net/http"
	"todo/config"
	"todo/controller/response"
	"todo/model"
	"todo/repository"
	"todo/service/auth"

	"github.com/labstack/echo/v4"
)

type AuthMiddleware struct {
	repository.TokenRepository
	repository.UserRepository
}

func NewAuthMiddleware(tkRepo repository.TokenRepository, usrRepo repository.UserRepository) *AuthMiddleware {
	return &AuthMiddleware{TokenRepository: tkRepo, UserRepository: usrRepo}
}

func (am *AuthMiddleware) AuthMiddleware(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {

		accessDetail, err := auth.TokenValid(c.Request(), config.GetConfig().Secret.TokenAccess)
		if err != nil {
			return response.ReturnApiFail(c, http.StatusUnauthorized, err, "Token was not valid")
		}

		userId, err := am.TokenRepository.Inqure(accessDetail)
		if err != nil {
			return response.ReturnApiFail(c, http.StatusUnauthorized, err, "Token was not vaild")
		}

		usr, err := am.UserRepository.InquireFromEmail(&model.User{Email: userId})
		if err != nil {
			return response.ReturnApiFail(c, http.StatusUnauthorized, err, "Not found User")
		}

		cc := &model.Ctx{Context: c, User: usr}

		return next(cc)
	}
}
