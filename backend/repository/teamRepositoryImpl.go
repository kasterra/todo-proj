package repository

import (
	"errors"
	"todo/model"

	"gorm.io/gorm"
)

type TeamRepositoryImpl struct {
	db *gorm.DB
}

func NewTeamRepositoryImpl(db *gorm.DB) *TeamRepositoryImpl {
	return &TeamRepositoryImpl{db: db}
}

func (teamRepositoryImpl *TeamRepositoryImpl) Create(team *model.Team) (*model.Team, error) {
	err := teamRepositoryImpl.db.Create(team).Error
	if err != nil {
		return nil, errors.New("Team Create Error")
	}
	return team, nil
}
