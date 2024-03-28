/*
	Build:
		go build -o ./bin/ ./tour-of-go/12-readers && ./bin/12-readers

	READERS
	A reader represents the reading end of a stream.
	Go std lib has many reader implementations - files, network, compressors, ciphers, etc.

		func (T) Read(b []byte) (n int, err error)

	`Read()` populates the slice bytes, and returns the bytes read count or `io.EOF` at stream end.

*/

package main

import (
	"fmt"
	"io"
	"strings"
)

func readers() {
	r := strings.NewReader("Hello, Reader!")

	b := make([]byte, 8) // 8-bytes buffer
	for {
		n, err := r.Read(b)
		fmt.Printf("n = %v err = %v b = %v\n", n, err, b)
		fmt.Printf("b[:n] = %q\n", b[:n]) // NOTICE: convert to string in the format string
		if err == io.EOF {
			break
		}
	}
}

func main() {
	readers()
}
