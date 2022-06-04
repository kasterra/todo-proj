package service

import (
	"errors"
	"todo/model"
	"todo/model/dto"
	"todo/repository"
	"todo/service/auth"

	"github.com/labstack/echo/v4"
)

type UserServiceImpl struct {
	repository.UserRepository
}

func NewUserServiceImpl(repo repository.UserRepository) *UserServiceImpl {
	return &UserServiceImpl{UserRepository: repo}
}

func (userServiceImpl *UserServiceImpl) SignUp(userDto *dto.UserDto) (*dto.UserDto, error) {

	inquireResult, err := userServiceImpl.InquireFromEmail(userDto.ToModel())
	if inquireResult != nil || err == nil {
		return nil, errors.New("User is already exists")
	}

	hashPw, err := auth.HashPassword(userDto.Password)
	if err != nil {
		return nil, errors.New("Hash Error")
	}

	user := &model.User{Name: userDto.Name, Email: userDto.Email, Password: hashPw}

	saveResult, err := userServiceImpl.UserRepository.Save(user)
	if err != nil {
		return nil, err
	}

	return &dto.UserDto{Name: saveResult.Name, Email: saveResult.Email}, nil
}

func (userServiceImpl *UserServiceImpl) SignIn(userDto *dto.UserDto) (*dto.UserDto, error) {

	inquireResult, err := userServiceImpl.InquireFromEmail(userDto.ToModel())
	if inquireResult == nil || err != nil {
		return nil, errors.New("No such user")
	}

	checkPwRet := auth.CheckPasswordWithHash(inquireResult.Password, userDto.Password)
	if !checkPwRet {
		return nil, echo.ErrUnauthorized
	}

	authToken, err := auth.CreateJWT(userDto.Email)
	if err != nil {
		return nil, errors.New("Create JWT error")
	}

	return &dto.UserDto{Token: authToken}, nil
}

func (userServiceImpl *UserServiceImpl) FindUserFromEmail(userDto *dto.UserDto) (*dto.UserDto, error) {
	ret, err := userServiceImpl.InquireFromEmail(userDto.ToModel())
	return &dto.UserDto{Name: ret.Name, Email: ret.Email}, err
}
