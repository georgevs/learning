/*
	Build:
		go build -o ./bin/ ./tour-of-go/11-errors && ./bin/11-errors

	ERRORS
	The error type is a built-in interface

		type error interface {
				Error() string
		}
*/

package main

import (
	"fmt"
	"time"
)

type MyError struct {
	When time.Time
	What string
}

func (e *MyError) Error() string {
	return fmt.Sprintf("at %v, %s",
		e.When, e.What)
}

func run() error {
	return &MyError{
		time.Now(),
		"it didn't work",
	}
}

func errors() {
	if err := run(); err != nil {
		fmt.Println(err)
	}
}

func main() {
	errors()
}
