package model

// for service
type TokenDetails struct {
	AccessToken  string
	RefreshToken string
	AccessUuid   string
	RefreshUuid  string
	AtExpires    uint64
	RtExpires    uint64
}

// for repo
type TokenInfo struct {
	Uuid    string `gorm:"column:uuid;not null;unique"`
	UserId  string `gorm:"column:userid;not null;"`
	ExpDate uint64 `gorm:"column:expdate;not null;unique"`
}

type AccessDetail struct {
	AccessUuid string
	UserId     string
}
