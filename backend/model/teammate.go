package model

import "gorm.io/gorm"

type Teammate struct {
	gorm.Model

	Owner bool `gorm:"column:owner"`

	User      User `gorm:"foreignkey:UserRefer"`
	UserRefer uint

	Team      Team `gorm:"foreignkey:TeamRefer"`
	TeamRefer uint
}
