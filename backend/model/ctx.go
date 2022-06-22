package model

import "github.com/labstack/echo/v4"

type Ctx struct {
	echo.Context
	User *User
}
