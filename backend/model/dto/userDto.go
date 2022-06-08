package dto

import "todo/model"

type UserDto struct {
	Name         string `form:"Name,omitempty"`
	Email        string `form:"ID,omitempty"`
	Password     string `form:"Password,omitempty"`
	AccessToken  string `fomr:"AccessToken,omitempty"`
	RefreshToken string `fomr:"RefreshToken,omitempty"`
}

// only provisional
func (UserDto *UserDto) ToModel() *model.User {
	return &model.User{
		Name:     UserDto.Name,
		Email:    UserDto.Email,
		Password: UserDto.Password,
	}
}
