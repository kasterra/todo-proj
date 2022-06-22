package controller

import (
	"net/http"
	"todo/controller/response"
	"todo/model"
	"todo/model/dto"
	"todo/service"

	"github.com/labstack/echo/v4"
)

type TeamController struct {
	service.TeamService
}

func NewTeamController(teamService service.TeamService) *TeamController {
	return &TeamController{TeamService: teamService}
}

func (TeamController *TeamController) InitRouter(e *echo.Group) {

	// Team Create
	e.POST("/", TeamController.Open)

	// Get Team List
	e.GET("/", TeamController.InquireTeamList)

}

// @Summary Team Create
// @Description Open new team
// @Accept json
// @Produce json
// @Param Name body string true "Team name"
// @Success 200 {object} dto.TeamDto "Name"
// @Failure 500 {object} response.apiErrorResponse "Fail Create New Team"
// @Router /team/ [post]
func (teamController *TeamController) Open(c echo.Context) error {
	cc := c.(*model.Ctx)

	teamDto := &dto.TeamDto{}
	cc.Bind(teamDto)

	teamDto, err := teamController.TeamService.Create(teamDto, &dto.UserDto{Email: cc.User.Email})
	if err != nil {
		return response.ReturnApiFail(cc, http.StatusInternalServerError, err, "Team Save Fail")
	}

	return response.ReturnApiSuccess(cc, http.StatusOK, teamDto)
}

// @Summary Inquire Team List
// @Description Get team list
// @Produce json
// @Success 200 {object} []string "Names"
// @Failure 500 {object} response.apiErrorResponse "Fail Get Team"
// @Router /team/ [get]
func (teamController *TeamController) InquireTeamList(c echo.Context) error {
	cc := c.(*model.Ctx)

	list, err := teamController.TeamService.InquireTeamList(cc.User)
	if err != nil {
		return response.ReturnApiFail(cc, http.StatusInternalServerError, err, "Get Teams Fail")
	}

	return response.ReturnApiSuccess(cc, http.StatusOK, list)
}
