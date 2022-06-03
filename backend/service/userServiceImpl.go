package service

import (
	"todo/model/dto"
	"todo/repository"
)

type UserServiceImpl struct {
	repository.UserRepository
}

func NewUserServiceImpl(repo repository.UserRepository) *UserServiceImpl {
	return &UserServiceImpl{UserRepository: repo}
}

func (userServiceImpl *UserServiceImpl) SignUp(userDto *dto.UserDto) (*dto.UserDto, error) {
	user, err := userServiceImpl.UserRepository.Save(userDto.ToModel())
	if err != nil {
		return nil, err
	}

	return &dto.UserDto{Name: user.Name, Email: user.Email}, nil
}
