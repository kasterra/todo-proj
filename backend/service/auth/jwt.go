// TODO: jwt 생성 및 체크만 구현 했음 refresh 및 로그인 구현 까지 완성하기
package auth

import (
	"errors"
	"fmt"
	"net/http"
	"strings"
	"time"
	"todo/config"
	"todo/model"
	"todo/repository"

	"github.com/dgrijalva/jwt-go"
	"github.com/gofrs/uuid"
)

func CreateJWT(email string) (tk *model.TokenDetails, err error) {
	conf := config.GetConfig()

	td := &model.TokenDetails{}
	td.AtExpires = uint64(time.Now().Add(time.Minute * 15).Unix())

	ran, err := uuid.NewV4()
	if err != nil {
		return nil, err
	}
	td.AccessUuid = ran.String()

	td.RtExpires = uint64(time.Now().Add(time.Hour * 24 * 7).Unix())
	ran, err = uuid.NewV4()
	if err != nil {
		return nil, err
	}
	td.RefreshUuid = ran.String()

	// create Access Token
	claims := jwt.MapClaims{}
	claims["authorized"] = true
	claims["AccessUuid"] = td.AccessUuid
	claims["userId"] = email
	claims["exp"] = td.AtExpires
	t := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	td.AccessToken, err = t.SignedString([]byte(conf.Secret.TokenAccess))
	if err != nil {
		return nil, err
	}

	// create Refresh Token
	claims = jwt.MapClaims{}
	claims["RefreshUuid"] = td.RefreshUuid
	claims["userId"] = email
	claims["exp"] = td.RtExpires
	t = jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	td.RefreshToken, err = t.SignedString([]byte(conf.Secret.TokenRefresh))
	if err != nil {
		return nil, err
	}

	return td, nil
}

func CreateAuth(userid string, td *model.TokenDetails, tokenRepository repository.TokenRepository) error {
	errAccess := tokenRepository.Save(&model.TokenInfo{Uuid: td.AccessUuid, UserId: userid, ExpDate: td.AtExpires})
	if errAccess != nil {
		return errAccess
	}
	errRefresh := tokenRepository.Save(&model.TokenInfo{Uuid: td.RefreshUuid, UserId: userid, ExpDate: td.RtExpires})
	if errRefresh != nil {
		return errRefresh
	}
	return nil
}

func ExtractToken(r *http.Request) string {
	bearToken := r.Header.Get("Authorization")
	//normally Authorization the_token_xxx
	strArr := strings.Split(bearToken, " ")
	if len(strArr) == 2 {
		return strArr[1]
	}
	return ""
}

func VerifyToken(r *http.Request, key string) (*jwt.Token, error) {
	tokenString := ExtractToken(r)
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return []byte(key), nil
	})
	if err != nil {
		return nil, err
	}
	return token, nil
}

func TokenValid(r *http.Request, key string) (*model.AccessDetail, error) {
	token, err := VerifyToken(r, key)
	if err != nil {
		return nil, err
	}
	claims, ok := token.Claims.(jwt.MapClaims)
	if ok && !token.Valid {
		return nil, errors.New("jwt claims to map claims")
	}

	if key == config.GetConfig().Secret.TokenAccess {
		accessUuid, ok2 := claims["AccessUuid"].(string)
		if !ok2 {
			return nil, errors.New("jwt claims access user id")
		}

		userId, ok2 := claims["userId"].(string)
		if !ok2 {
			return nil, errors.New("jwt claims userId")
		}
		return &model.AccessDetail{AccessUuid: accessUuid, UserId: userId}, nil
	} else {
		accessUuid, ok2 := claims["RefreshUuid"].(string)
		if !ok2 {
			return nil, errors.New("jwt claims access user id")
		}

		userId, ok2 := claims["userId"].(string)
		if !ok2 {
			return nil, errors.New("jwt claims userId")
		}
		return &model.AccessDetail{AccessUuid: accessUuid, UserId: userId}, nil
	}
}
