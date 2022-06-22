package repository

import "todo/model"

type TeamRepository interface {
	Create(team *model.Team) (*model.Team, error)
}
