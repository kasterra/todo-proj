package service

import (
	"todo/model/dto"
)

type UserService interface {
	SignUp(userDto *dto.UserDto) (*dto.UserDto, error)
	SignIn(userDto *dto.UserDto) (*dto.UserDto, error)
	FindUserFromEmail(userDto *dto.UserDto) (*dto.UserDto, error)
}
