package response

import (
	"github.com/labstack/echo/v4"
)

type apiErrorResponse struct {
	Message string      `json:"message,omitempty"`
	Details interface{} `json:"details,omitempty"`
}

func ReturnApiFail(c echo.Context, httpStatus int, err error, errMessage string) error {
	return c.JSON(httpStatus, apiErrorResponse{
		Message: errMessage,
		Details: err.Error(),
	})
}

func ReturnApiSuccess(c echo.Context, httpStatus int, result interface{}) error {
	return c.JSON(httpStatus, result)
}
