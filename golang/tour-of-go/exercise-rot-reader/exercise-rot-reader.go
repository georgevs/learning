/*
	See https://go.dev/tour/methods/23

	Build:
		go build -o ./bin/ ./tour-of-go/exercise-rot-reader && ./bin/exercise-rot-reader
*/

package main

import (
	"io"
	"os"
	"strings"
)

type rot13Reader struct {
	r io.Reader
}

func (reader *rot13Reader) Read(obuf []byte) (n int, err error) {
	ibuf := make([]byte, len(obuf))
	n, err = reader.r.Read(ibuf)
	if err != nil {
		return n, err
	}
	for i, x := range ibuf {
		switch {
		case 'A' <= x && x <= 'Z':
			x = (x-'A'+13)%26 + 'A'
		case 'a' <= x && x <= 'z':
			x = (x-'a'+13)%26 + 'a'
		}
		obuf[i] = x
	}
	return n, nil
}

func main() {
	s := strings.NewReader("Lbh penpxrq gur pbqr!")
	r := rot13Reader{s}
	io.Copy(os.Stdout, &r)
}
