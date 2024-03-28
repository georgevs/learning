/*
	See https://go.dev/tour/concurrency/7

	Build:
		go build -o ./bin/ ./tour-of-go/exercise-equivalent-binary-trees && ./bin/exercise-equivalent-binary-trees
*/

package main

import (
	"fmt"

	"golang.org/x/tour/tree"
)

// Walk walks the tree t sending all values
// from the tree to the channel ch.
func Walk(root *tree.Tree, ch chan int) {
	var visit func(*tree.Tree)

	visit = func(t *tree.Tree) {
		if t != nil {
			visit(t.Left)
			ch <- t.Value
			visit(t.Right)
		}
	}

	visit(root)
	close(ch)
}

func doWalk() {
	ch := make(chan int)
	go Walk(tree.New(1), ch)
	for val := range ch {
		fmt.Println(val)
	}
}

// Same determines whether the trees
// t1 and t2 contain the same values.
func Same(t1, t2 *tree.Tree) bool {
	ch1 := make(chan int)
	ch2 := make(chan int)

	go Walk(t1, ch1)
	go Walk(t2, ch2)

	var ok1, ok2 = true, true
	var val1, val2 int
	for ok1 && ok2 {
		val1, ok1 = <-ch1
		val2, ok2 = <-ch2
		if ok1 != ok2 || val1 != val2 {
			return false
		}
	}
	return true
}

func doSame() {
	fmt.Println(Same(tree.New(1), tree.New(1)))
	fmt.Println(Same(tree.New(1), tree.New(2)))
}

func main() {
	fmt.Println(tree.New(1))
	doWalk()
	doSame()
}
