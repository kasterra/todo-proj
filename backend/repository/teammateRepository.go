package repository

import "todo/model"

type TeammateRepository interface {
	Create(teammate *model.Teammate) (*model.Teammate, error)
	InquireTeamList(user *model.User) ([]model.Team, error)
}
