/*
	See https://go.dev/tour/moretypes/26

	Build:
		go build -o ./bin/ ./tour-of-go/exercise-fibonacci-closure && ./bin/exercise-fibonacci-closure
*/

package main

import (
	"fmt"
)

func fibonacci() func(int) int {
	m := map[int]int{0: 0, 1: 1}
	var fib func(int) int
	fib = func(i int) int {
		r, ok := m[i]
		if ok {
			return r
		}
		r = fib(i-1) + fib(i-2)
		m[i] = r
		return r
	}
	return fib
}

func main() {
	f := fibonacci()
	for i := 0; i < 10; i++ {
		fmt.Println(f(i))
	}
}
