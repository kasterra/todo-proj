package service

import (
	"todo/model"
	"todo/model/dto"
)

type UserService interface {
	SignUp(userDto *dto.UserDto) (*dto.UserDto, error)
	SignIn(userDto *dto.UserDto) (*dto.UserDto, error)
	InquireUserInfoFromToken(accessDetail *model.AccessDetail) (*dto.UserDto, error)
	Logout(accessDetail *model.AccessDetail) error
	NewToken(userDto *dto.UserDto) (*dto.UserDto, error)
}
