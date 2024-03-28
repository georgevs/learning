/*
	Build:
		go build -o ./bin/ ./tour-of-go/13-generics && ./bin/13-generics

	TYPE PARAMETERS
	Type parameters allows functions to work with MULTIPLE parameters.
	Type parameters can be constraned.

	GENERIC TYPES
	Generic types are structures parameterized with type parameters.

*/

package main

import (
	"fmt"
)

func Index[T comparable](s []T, x T) int { // type parameter MUST be `comparable`
	for i, v := range s {
		if v == x { // `v` and `x` are `comparable`
			return i
		}
	}
	return -1
}

func type_parameters() {
	si := []int{10, 20, 15, -10}
	fmt.Println(Index(si, 15)) // Index works on a slice of ints
	ss := []string{"foo", "bar", "baz"}
	fmt.Println(Index(ss, "hello")) // Index also works on a slice of strings
}

type List[T any] struct { // generic list type
	next *List[T]
	val  T
}

func (self *List[T]) append(val T) *List[T] {
	return &List[T]{self, val}
}
func (self *List[T]) String() string {
	if self == nil {
		return "nil"
	}
	return fmt.Sprintf("%v -> %v", self.val, self.next)
}

func generic_types() {
	var root *List[int]
	root = root.append(42)
	root = root.append(43)
	fmt.Printf("%T %v\n", root, root)
}

func main() {
	type_parameters()
	generic_types()
}
