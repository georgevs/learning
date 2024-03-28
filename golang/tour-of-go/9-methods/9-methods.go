/*
  Build:
    go build -o ./bin/ ./tour-of-go/9-methods && ./bin/9-methods

  METHODS
  Go does not have classes.
  Methods are defined on types through a special `receiver` argument.
	Methods with VALUE receivers operate on a copy of the argument.
	Methods with POINTER receivers mutate the argument.
  Methods can be declared on any struct or type defined in the SAME package.

*/

package main

import (
	"fmt"
	"math"
)

type Vertex struct {
	X, Y float64
}

func (v Vertex) Abs() float64 { // `v` is a receiver argument
	return math.Sqrt(v.X*v.X + v.Y*v.Y)
}

func methods_on_struct() {
	v := Vertex{3, 4}
	fmt.Println(v.Abs())
}

type MyFloat float64

func (f MyFloat) Abs() float64 {
	if f < 0 {
		return float64(-f)
	}
	return float64(f)
}

func methods_on_type() {
	f := MyFloat(-math.Sqrt2)
	fmt.Println(f.Abs())
}

func (v *Vertex) Scale(f float64) { // method on receiver pointer
	v.X = v.X * f
	v.Y = v.Y * f
}

func (v Vertex) ScaleCopy(f float64) { // method on receiver copy
	v.X = v.X * f
	v.Y = v.Y * f
}

func methods_on_value_vs_pointer() {
	v := Vertex{3, 4}
	fmt.Println(v.Abs())
	v.ScaleCopy(10) // operates on a copy of the argument `v`
	fmt.Println(v.Abs())
	v.Scale(10) // operates on the argument `v`
	fmt.Println(v.Abs())
}

func main() {
	methods_on_struct()
	methods_on_type()
	methods_on_value_vs_pointer()
}
