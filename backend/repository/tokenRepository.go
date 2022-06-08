package repository

import "todo/model"

type TokenRepository interface {
	Save(*model.TokenInfo) error
	Expire() error
	Inqure(*model.AccessDetail) (string, error)
	Delete(*model.AccessDetail) error
}
