package service

import (
	"todo/model/dto"
)

type UserService interface {
	SignUp(userDto *dto.UserDto) (*dto.UserDto, error)
}
