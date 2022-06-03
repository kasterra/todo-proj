package repository

import (
	"errors"
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
	var userCheck = new(model.User)
	err1 := userRepositoryImpl.db.Where("name = ?", user.Name).First(&userCheck).Error
	if err1 != nil {
		if errors.Is(err1, gorm.ErrRecordNotFound) {
			err2 := userRepositoryImpl.db.Create(user).Error
			if err2 != nil {
				return nil, err2
			}
			return user, nil
		}
	}
	return nil, errors.New("중복된 유저입니다.")
}
