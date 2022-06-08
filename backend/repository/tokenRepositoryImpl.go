package repository

import (
	"fmt"
	"time"
	"todo/model"

	"gorm.io/gorm"
)

type TokenRepositoryImpl struct {
	db *gorm.DB
}

func NewTokenRepositoryImpl(db *gorm.DB) *TokenRepositoryImpl {
	return &TokenRepositoryImpl{db: db}
}

func (tokenRepositoryImpl *TokenRepositoryImpl) Save(tk *model.TokenInfo) error {
	err := tokenRepositoryImpl.db.Create(tk).Error
	if err != nil {
		fmt.Println(err)
		return err
	}
	return nil
}

func (tokenRepositoryImpl *TokenRepositoryImpl) Expire() error {
	err := tokenRepositoryImpl.db.Where("expdate < ?", time.Now().Unix()).Delete(&model.TokenInfo{}).Error
	if err != nil {
		return err
	}

	return nil
}

func (tokenRepositoryImpl *TokenRepositoryImpl) Inqure(ad *model.AccessDetail) (string, error) {
	var tk model.TokenInfo
	err := tokenRepositoryImpl.db.First(&tk, "uuid = ?", ad.AccessUuid).Error

	if err != nil {
		return "", err
	}

	return tk.UserId, nil
}

func (tokenRepositoryImpl *TokenRepositoryImpl) Delete(ad *model.AccessDetail) error {
	err := tokenRepositoryImpl.db.Where("uuid = ?", ad.AccessUuid).Delete(&model.TokenInfo{}).Error

	if err != nil {
		return err
	}

	return nil
}
