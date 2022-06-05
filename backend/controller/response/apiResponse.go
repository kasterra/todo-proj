package response

import (
	"github.com/labstack/echo/v4"
)

type apiResponse struct {
	Message string      `json:"message,omitempty"`
	Details interface{} `json:"details,omitempty"`
}

func ReturnApiSuccess(c echo.Context, httpStatus int, err error, errMessage string) error {
	return c.JSON(httpStatus, apiResponse{
		Message: errMessage,
		Details: err.Error(),
	})
}

func ReturnApiFail(c echo.Context, httpStatus int, result interface{}) error {
	return c.JSON(httpStatus, apiResponse{
		Details: result,
	})
}
