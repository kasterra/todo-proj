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
	repository.TokenRepository
}

func NewUserServiceImpl(userRepo repository.UserRepository, tokenRepo repository.TokenRepository) *UserServiceImpl {
	return &UserServiceImpl{UserRepository: userRepo, TokenRepository: tokenRepo}
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

	tkSaveErr := auth.CreateAuth(userDto.Email, authToken, userServiceImpl.TokenRepository)
	if tkSaveErr != nil {
		return nil, errors.New("JWT Save Error")
	}

	return &dto.UserDto{AccessToken: authToken.AccessToken, RefreshToken: authToken.RefreshToken}, nil
}

func (userServiceImpl *UserServiceImpl) InquireUserInfoFromToken(accessDetail *model.AccessDetail) (*dto.UserDto, error) {
	userId, err := userServiceImpl.TokenRepository.Inqure(accessDetail)
	if err != nil {
		return nil, err
	}

	usr, err := userServiceImpl.UserRepository.InquireFromEmail(&model.User{Email: userId})
	if err != nil {
		return nil, err
	}

	return &dto.UserDto{Name: usr.Name, Email: usr.Email}, nil
}

func (userServiceImpl *UserServiceImpl) Logout(accessDetail *model.AccessDetail) error {
	err := userServiceImpl.TokenRepository.Delete(accessDetail)
	if err != nil {
		return err
	}
	return nil
}

func (userServiceImpl *UserServiceImpl) NewToken(userDto *dto.UserDto) (*dto.UserDto, error) {
	authToken, err := auth.CreateJWT(userDto.Email)
	if err != nil {
		return nil, errors.New("Create JWT error")
	}

	tkSaveErr := auth.CreateAuth(userDto.Email, authToken, userServiceImpl.TokenRepository)
	if tkSaveErr != nil {
		return nil, errors.New("JWT Save Error")
	}

	return &dto.UserDto{AccessToken: authToken.AccessToken, RefreshToken: authToken.RefreshToken}, nil
}
