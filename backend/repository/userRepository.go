package repository

import "todo/model"

type UserRepository interface {
	Save(user *model.User) (*model.User, error)
}
