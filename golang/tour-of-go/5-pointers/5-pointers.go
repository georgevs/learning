/*
  Build:
    go build -o ./bin/ ./tour-of-go/5-pointers && ./bin/5-pointers

	POINTERS
	A pointer holds the memory address of a value.
	The type `*T` is a pointer to a `T` value.
	Pointer zero value is `nil`.
	The `&` operator generates a pointer to its operand.
	The `*` operator denotes the pointer's underlying value.
	Go has NO pointer arithmetic.
*/

package main

import "fmt"

func main() {
	i, j := 42, 2701

	p := &i         // point to i
	fmt.Println(*p) // read i through the pointer
	*p = 21         // set i through the pointer
	fmt.Println(i)  // see the new value of i

	p = &j         // point to j
	*p = *p / 37   // divide j through the pointer
	fmt.Println(j) // see the new value of j
}
