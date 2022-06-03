package database

import (
	"fmt"
	"todo/config"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"

	model "todo/model"
)

type DB struct {
}

func (DB) GetDB() *gorm.DB {
	conf := config.GetConfig()

	dsn := "host=" + conf.DB.Host +
		" user=" + conf.DB.User +
		" password=" + conf.DB.Password +
		" dbname=" + conf.DB.Database +
		" port=" + conf.DB.Port +
		" sslmode=" + conf.DB.Ssl +
		" Timezone=" + conf.DB.Timezone

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Info),
	})

	if err != nil {
		panic(fmt.Errorf("DB Connection Error: %w \n", err))
	}

	db.AutoMigrate(&model.User{})

	return db
}
