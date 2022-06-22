package service

import (
	"todo/model"
	"todo/model/dto"
)

type TeamService interface {
	Create(teamDto *dto.TeamDto, userDto *dto.UserDto) (*dto.TeamDto, error)
	InquireTeamList(user *model.User) ([]string, error)
}
