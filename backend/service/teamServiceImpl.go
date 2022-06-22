package service

import (
	"todo/model"
	"todo/model/dto"
	"todo/repository"
)

type TeamServiceImpl struct {
	repository.TeammateRepository
	repository.TeamRepository
	repository.UserRepository
}

func NewTeamServiceImpl(teamRepo repository.TeamRepository, userRepo repository.UserRepository, tmRepo repository.TeammateRepository) *TeamServiceImpl {
	return &TeamServiceImpl{TeamRepository: teamRepo, UserRepository: userRepo, TeammateRepository: tmRepo}
}

func (teamServiceImpl *TeamServiceImpl) Create(teamDto *dto.TeamDto, userDto *dto.UserDto) (*dto.TeamDto, error) {

	// Get User
	user, err := teamServiceImpl.UserRepository.InquireFromEmail(userDto.ToModel())
	if err != nil {
		return nil, err
	}

	// save team
	team, err := teamServiceImpl.TeamRepository.Create(&model.Team{Name: teamDto.Name})
	if err != nil {
		return nil, err
	}

	teammate := &model.Teammate{User: *user, Team: *team, Owner: true}
	teammate, err = teamServiceImpl.TeammateRepository.Create(teammate)
	if err != nil {
		return nil, err
	}

	return &dto.TeamDto{Name: team.Name}, nil
}

func (teamServiceImpl *TeamServiceImpl) InquireTeamList(user *model.User) ([]string, error) {
	teams, err := teamServiceImpl.TeammateRepository.InquireTeamList(user)
	if err != nil {
		return nil, err
	}

	strList := make([]string, 0)

	for _, team := range teams {
		strList = append(strList, team.Name)
	}

	return strList, nil
}
