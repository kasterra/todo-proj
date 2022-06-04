// TODO: jwt 생성 및 체크만 구현 했음 refresh 및 로그인 구현 까지 완성하기
package auth

import (
	"errors"
	"fmt"
	"net/http"
	"strings"
	"time"
	"todo/config"

	"github.com/dgrijalva/jwt-go"
)

func CreateJWT(email string) (token string, err error) {
	conf := config.GetConfig()
	claims := jwt.MapClaims{}
	claims["authorized"] = true
	claims["userId"] = email
	claims["exp"] = time.Now().Add(time.Minute * 5).Unix()

	t := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	token, err = t.SignedString([]byte(conf.JWTKey))
	if err != nil {
		return "", err
	}
	return token, nil
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

func VerifyToken(r *http.Request) (*jwt.Token, error) {
	conf := config.GetConfig()
	tokenString := ExtractToken(r)
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return []byte(conf.JWTKey), nil
	})
	if err != nil {
		return nil, err
	}
	return token, nil
}

func TokenValid(r *http.Request) (string, error) {
	token, err := VerifyToken(r)
	if err != nil {
		return "", err
	}
	claims, ok := token.Claims.(jwt.MapClaims)
	if ok && !token.Valid {
		return "", errors.New("jwt claims")
	}

	userId, ok2 := claims["userId"].(string)
	if !ok2 {
		return "", errors.New("jwt claims")
	}

	return userId, nil
}
