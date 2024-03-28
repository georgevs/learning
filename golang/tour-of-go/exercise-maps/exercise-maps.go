/*
	See https://go.dev/tour/moretypes/23
	See https://pkg.go.dev/strings#Fields

	Build:
		go build -o ./bin/ ./tour-of-go/exercise-maps && ./bin/exercise-maps
*/

package main

import (
	"fmt"
	"strings"
	// "golang.org/x/tour/wc"
)

func WordCount(s string) map[string]int {
	words := strings.Fields(s)
	result := make(map[string]int)
	for _, w := range words {
		result[w]++
	}
	return result
}

func main() {
	fmt.Println(WordCount("I ate a donut. Then I ate another donut."))
	// wc.Test(WordCount)
}
