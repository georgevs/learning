package fakes

import (
	"fmt"
)

type FakeDb map[string]string

func NewFakeDb() FakeDb {
	return map[string]string{
		"production":  "1.2.3",
		"stage":       "1.2.10",
		"development": "2.0.1",
	}
}

func (db FakeDb) Get(env string) (ver string, err error) {
	ver, ok := db[env]
	if !ok {
		err = fmt.Errorf("unknown environment: %v", env)
	}
	return
}
