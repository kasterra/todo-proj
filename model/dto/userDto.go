package dto

import "todo/model"

type UserDto struct {
	Name     string `form:"Name"`
	Email    string `form:"ID"`
	Password string `form:"Password"`
}

// only provisional
func (UserDto *UserDto) ToModel() *model.User {
	return &model.User{
		Name:     UserDto.Name,
		Email:    UserDto.Email,
		Password: UserDto.Password,
	}
}
