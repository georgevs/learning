/*
  Build:
    go build -o ./bin/ ./tour-of-go/2-functions && ./bin/2-functions

  FUNCTIONS
  A function can take zero or more arguments.
  Argument type comes after the variable name.
  If two consecutive arguments have the same type only the last type is sufficient.

  MULTIPLE RESULTS
  A function can return any number of results.

  NAMED RETURN VALUES
  Returned values can be named.
  A `return` statement without names returns ALL return values (aka "naked" return)

  VARIABLES
  The `var` statement declares a list of variables. Type is last.

  VARIABLES INITIALIZERS
  A var declaration can include initializers - one per variable.
  If initializer is present types can be omitted.
  If initializer is missing the variable is initialized with 0/false/..

  SHORT VARIABLE DECLARATIONS
  Only inside a function, the short `:=` assignment can be used with implicit type
*/

package main

import (
	"fmt"
	"math"
)

func add(x int, y int) int {
	return x + y
}

func add2(x, y int) int { // consecuitive arguments of the same type
	return x + y
}

func swap(x, y string) (string, string) { // the function returns multiple results
	return y, x
}

func split(sum int) (x, y int) {
	x = sum * 4 / 9
	y = sum - x
	return // "naked" return of ALL values
}

func func_variable() {
	var sqrt func(x float64) string // function variable

	sqrt = func(x float64) string {
		if x < 0 {
			return sqrt(-x) + "i"
		}
		return fmt.Sprint(math.Sqrt(x))
	}

	fmt.Println(sqrt(2), sqrt(-4))
}

// var c, python, java bool // variables at package level
var c, python, java = true, false, "no!" // variables with initializers

func main() {
	fmt.Println(add(42, 13))
	fmt.Println(add2(42, 13))

	a, b := swap("hello", "world") // destructuring assignment
	fmt.Println(a, b)

	fmt.Println(split(17))

	// var i, j int // variable at function level
	var i, j int = 1, 2 // variables with initializers
	k := 3              // short assigment with implicit type
	fmt.Println(i, j, k, c, python, java)

	func_variable()
}
