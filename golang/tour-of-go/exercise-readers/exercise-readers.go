/*
	See https://go.dev/tour/methods/22

	Build:
		go build -o ./bin/ ./tour-of-go/exercise-readers && ./bin/exercise-readers
*/

package main

import (
	"fmt"
	// "golang.org/x/tour/reader"
)

type MyReader struct{}

func (MyReader) Read(buf []byte) (int, error) {
	for i := range buf {
		buf[i] = byte('A')
	}
	return len(buf), nil
}

func main() {
	buf := make([]byte, 10)
	reader := MyReader{}
	fmt.Println(reader.Read(buf))
	fmt.Printf("%T; %v; %q\n", buf, buf, buf)
	// reader.Validate(MyReader{})
}
