package repository

import (
	"errors"
	"fmt"
	"todo/model"

	"gorm.io/gorm"
)

type UserRepositoryImpl struct {
	db *gorm.DB
}

func NewUserRepositoryImpl(db *gorm.DB) *UserRepositoryImpl {
	return &UserRepositoryImpl{db: db}
}

func (userRepositoryImpl *UserRepositoryImpl) Save(user *model.User) (*model.User, error) {
	err := userRepositoryImpl.db.Create(user).Error
	if err != nil {
		return nil, errors.New("User Create Error")
	}
	return user, nil
}

func (userRepositoryImpl *UserRepositoryImpl) InquireFromEmail(user *model.User) (*model.User, error) {
	var userCheck = new(model.User)
	err := userRepositoryImpl.db.Where("email = ?", user.Email).First(&userCheck).Error
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, errors.New(fmt.Sprintf("No user that have %s email", user.Email))
		}
		return nil, err
	}
	return userCheck, nil
}
