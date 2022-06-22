package model

import "gorm.io/gorm"

type Team struct {
	gorm.Model
	Name string `gorm:"column:name;not null;unique"`
}
