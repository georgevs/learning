/*
	Build:
		go build -o ./bin/ ./tour-of-go/3-types && ./bin/3-types

  BASIC TYPES
  bool
  string
  int  int8  int16  int32  int64
  uint uint8 uint16 uint32 uint64
  uintptr
  byte -- alias for uint8
  rune -- alias for int32, represents a Unicode code point
  float32 float64
  complex64 complex128

  ZERO VALUES
  If initializer is missing the variable is initialized with "zero" values
  0 for numeric types
  `false` for bool
  "" for string

  TYPE CONVERSIONS
  T(v) converts the variable `v` to the type `T`

  TYPE INFERENCE
  Type is infered when declaring a variable without explicit type.

  CONSTANTS
  `const` declares a constant. Can be char, string, boolean or numeric values.
  Numeric constants are high-precision values.

	FUNCTION VALUES
	Functions values can be passed as an argument or returned from other functions.
	A function CLOSURE is a function value which references a value from outside its body.
*/

package main

import (
	"fmt"
	"math"
	"math/cmplx"
)

func basic_types() {
	var (
		ToBe   bool       = false
		MaxInt uint64     = 1<<64 - 1
		z      complex128 = cmplx.Sqrt(-5 + 12i)
	)

	fmt.Printf("Type: %T Value: %v\n", ToBe, ToBe)
	fmt.Printf("Type: %T Value: %v\n", MaxInt, MaxInt)
	fmt.Printf("Type: %T Value: %v\n", z, z)
}

func type_conversions() {
	var x, y int = 3, 4
	var f float64 = math.Sqrt(float64(x*x + y*y))
	var z uint = uint(f)
	fmt.Println(x, y, z)
}

func type_inference() {
	i := 42           // int
	f := 3.142        // float64
	g := 0.867 + 0.5i // complex128
	fmt.Printf("i is of type %T\n", i)
	fmt.Printf("f is of type %T\n", f)
	fmt.Printf("g is of type %T\n", g)
}

func constants() {
	const Pi = 3.14
	fmt.Println("Happy", Pi, "Day")
	const Truth = true
	fmt.Println("Go rules?", Truth)

	const (
		// Create a huge number by shifting a 1 bit left 100 places.
		// In other words, the binary number that is 1 followed by 100 zeroes.
		Big = 1 << 100
		// Shift it right again 99 places, so we end up with 1<<1, or 2.
		Small = Big >> 99
	)
	fmt.Println(needInt(Small))
	// needInt(Big)  // Big can't fit in int
	fmt.Println(needFloat(Small))
	fmt.Println(needFloat(Big))
}

func needInt(x int) int { return x*10 + 1 }
func needFloat(x float64) float64 {
	return x * 0.1
}

func compute(fn func(float64, float64) float64) float64 {
	return fn(3, 4)
}

func funcs_values() {
	hypot := func(x, y float64) float64 {
		return math.Sqrt(x*x + y*y)
	}
	fmt.Println(hypot(5, 12))
	fmt.Println(compute(hypot))
	fmt.Println(compute(math.Pow))
}

func adder() func(int) int {
	sum := 0
	return func(x int) int {
		sum += x
		return sum
	}
}

func funcs_closures() {
	pos, neg := adder(), adder()
	for i := 0; i < 10; i++ {
		fmt.Println(
			pos(i),
			neg(-2*i),
		)
	}
}

func main() {
	basic_types()
	type_conversions()
	type_inference()
	constants()
	funcs_values()
	funcs_closures()
}
