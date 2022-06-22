package repository

import (
	"errors"
	"fmt"
	"todo/model"

	"gorm.io/gorm"
)

type TeammateRepositoryImpl struct {
	db *gorm.DB
}

func NewTeammateRepositoryImpl(db *gorm.DB) *TeammateRepositoryImpl {
	return &TeammateRepositoryImpl{db: db}
}

func (teammateRepositoryImpl *TeammateRepositoryImpl) Create(teammate *model.Teammate) (*model.Teammate, error) {
	err := teammateRepositoryImpl.db.Create(teammate).Error
	if err != nil {
		fmt.Println("Error:", err)
		return nil, errors.New("Teammate Create Error")
	}
	return teammate, nil
}

func (teammateRepositoryImpl *TeammateRepositoryImpl) InquireTeamList(user *model.User) ([]model.Team, error) {
	var teams []model.Team
	err := teammateRepositoryImpl.db.Where(&model.Teammate{User: *user}).Find(&teams).Error
	if err != nil {
		fmt.Println("Error:", err)
		return nil, errors.New("Teamlist Inquire Error")
	}
	return teams, nil
}
