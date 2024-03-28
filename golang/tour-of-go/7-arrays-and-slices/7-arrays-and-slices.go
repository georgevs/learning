/*
  Build:
    go build -o ./bin/ ./tour-of-go/7-arrays-and-slices && ./bin/7-arrays-and-slices

	ARRAYS
	The type [n]T is an array of n values of type T.
	Arrays cannot be resized. Size is part of the type.

	SLICES
	The type []T is a slice with elements of type T. Slice of slice is allowed.
	Slice zero value is `nil`. nil slice appears empty, and has zero length and capacity.
	A slice is dynamically sized flexible VIEW into array's elements.
	Slice literals create and hold a reference to the underlying array.

	A slice is formed specifying a half open range [ LOW, HIGH ) bounds into the underlying array.
	Both low and high bounds may be omitted, and a default is assumed.
	Defaults are 0 for low, and length for high bounds.

	Slices have length `len()` and capacity `cap()`.
	Length is count of elements between the slice high and low bounds.
	Capacity is count of elements between the array length and the slice low bound.

	DYNAMIC ARRAYS
	Built-in `make(type, len, [cap]s)` function creates dynamically-sized arrays as slices.

	APPENDING TO SLICE
	Appending elements expands the slice length.
	If capacity is not sufficient, a NEW array is allocated and returned.
*/

package main

import (
	"fmt"
	"strings"
)

func arrays() {
	var a [2]string
	a[0] = "Hello"
	a[1] = "World"
	fmt.Println(a[0], a[1])
	fmt.Println(a)
	primes := [6]int{2, 3, 5, 7, 11, 13}
	fmt.Println(primes)
}

func slices() {
	primes := [6]int{2, 3, 5, 7, 11, 13}
	var s []int = primes[1:4] // slice of 3 elements a1 through a3
	fmt.Println(s)
}

func slices_are_views() {
	names := [4]string{
		"John",
		"Paul",
		"George",
		"Ringo",
	}
	fmt.Println(names)

	a := names[0:2]
	b := names[1:3]
	fmt.Println(a, b)

	b[0] = "XXX"
	fmt.Println(a, b)
	fmt.Println(names)
}

func slices_literals() {
	q := []int{2, 3, 5, 7, 11, 13} // slice literal of numbers.. notice NO size
	fmt.Println(q)

	r := []bool{true, false, true, true, false, true} // slice literal of booleans
	fmt.Println(r)

	s := []struct { //sliceliteral of structs
		i int
		b bool
	}{
		{2, true},
		{3, false},
		{5, true},
		{7, true},
		{11, false},
		{13, true},
	}
	fmt.Println(s)
}

func slices_default_bounds() {
	s := []int{2, 3, 5, 7, 11, 13}
	s = s[1:4]
	fmt.Println(s)
	s = s[:2]
	fmt.Println(s)
	s = s[1:]
	fmt.Println(s)
}

func slices_length_and_capacity() {
	s := []int{2, 3, 5, 7, 11, 13}
	printSlice(s)
	s = s[:0]
	printSlice(s) // zero length slice
	s = s[:4]
	printSlice(s) // expand length
	s = s[2:]
	printSlice(s) // drop 2 head values
}

func printSlice(s []int) {
	fmt.Printf("len=%d cap=%d %v\n", len(s), cap(s), s)
}

func slices_zero_value() {
	var s []int
	printSlice(s) // len=0 cap=0 []
	if s == nil { // slice zero value is `nil`
		fmt.Println("nil!")
	}
}

func slices_of_slices() {
	board := [][]string{ // tic-tac-toe board
		{"_", "_", "_"},
		{"_", "_", "_"},
		{"_", "_", "_"},
	}

	// The players take turns.
	board[0][0] = "X"
	board[2][2] = "O"
	board[1][2] = "X"
	board[1][0] = "O"
	board[0][2] = "X"

	for i := 0; i < len(board); i++ {
		fmt.Printf("%s\n", strings.Join(board[i], " "))
	}
}

func slices_dynamic_arrays() {
	a := make([]int, 5)
	printSlice(a) // len=5 cap=5 [0 0 0 0 0]
	b := make([]int, 0, 5)
	printSlice(b) // len=0 cap=5 []
	c := b[:2]
	printSlice(c) // len=2 cap=5 [0 0]
	d := c[2:5]
	printSlice(d) // len=3 cap=3 [0 0 0]
}

func slices_append() {
	var s []int // nil slice
	printSlice(s)
	s = append(s, 0) // append works on nil slices.
	printSlice(s)
	s = append(s, 1) // The slice grows as needed.
	printSlice(s)
	s = append(s, 2, 3, 4) // We can add more than one element at a time.
	printSlice(s)
}

func main() {
	arrays()
	slices()
	slices_are_views()
	slices_literals()
	slices_default_bounds()
	slices_length_and_capacity()
	slices_zero_value()
	slices_dynamic_arrays()
	slices_of_slices()
	slices_append()
}
