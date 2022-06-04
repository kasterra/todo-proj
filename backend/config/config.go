package config

import (
	"fmt"

	"github.com/fsnotify/fsnotify"
	"github.com/spf13/viper"
)

var conf = Config{}

type Config struct {
	Local  Local  `yaml:"Local"`
	JWTKey string `yaml:"JWTKey"`
	DB     DB     `yaml:"DB"`
}

type Local struct {
	Port int `yaml:"Port"`
}

type DB struct {
	Host     string `yaml:"Host"`
	Port     string `yaml:"Port"`
	User     string `yaml:"User"`
	Password string `yaml:"Password"`
	Database string `yaml:"Database"`
	Ssl      string `yaml:"Ssl"`
	Timezone string `yaml:"Timezone"`
}

func InitConfig() {
	var err error

	viper.SetConfigName("config")
	viper.SetConfigType("yaml")
	viper.AddConfigPath("./config/")

	if err = viper.ReadInConfig(); err != nil {
		if _, ok := err.(viper.ConfigFileNotFoundError); ok {
			panic(fmt.Errorf("No such config file: %s \n", "config.yaml"))
		} else {
			panic(fmt.Errorf("Fatal error config file: %w \n", err))
		}
	}

	err = viper.Unmarshal(&conf)
	if err != nil {
		panic(fmt.Errorf("Can not read yaml file \n"))
	}

	viper.WatchConfig()
	viper.OnConfigChange(func(e fsnotify.Event) {
		fmt.Println("Config file changed:", e.Name)

		if err = viper.ReadInConfig(); err != nil {
			if _, ok := err.(viper.ConfigFileNotFoundError); ok {
				panic(fmt.Errorf("No such config file: %s \n", "config.yaml"))
			} else {
				panic(fmt.Errorf("Fatal error config file: %w \n", err))
			}
		}

		err = viper.Unmarshal(&conf)
		if err != nil {
			panic(fmt.Errorf("Can not read yaml file \n"))
		}
	})
}

func GetConfig() Config {
	return conf
}
