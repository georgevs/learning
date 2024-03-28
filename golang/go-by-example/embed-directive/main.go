/*
	Build:
		go build -o ./bin/ ./go-by-example/embed-directive && ./bin/embed-directive
*/

package main

import (
	"embed"
	"fmt"
)

// WARNING: There must be NO space in the directive comment

//go:embed data/*.txt
var folder embed.FS

func main() {
	bytes, _ := folder.ReadFile("data/hello-world.txt")
	fmt.Println(string(bytes))
}
