package model

import "gorm.io/gorm"

type User struct {
	gorm.Model
	Name     string `gorm:"column:name;not null"`
	Email    string `gorm:"column:email;not null;unique"`
	Password string `gorm:"column:password;not null;unique"`
}
