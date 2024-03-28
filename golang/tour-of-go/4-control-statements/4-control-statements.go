/*
  Build:
    go build -o ./bin/ ./tour-of-go/4-control-statements && ./bin/4-control-statements

  `FOR` STATEMENT
  Go has only one looping construct - the `for` statement.
  The variables declared in the init statement are only visible in the `for` statement.
  A `while` statement is emulated by omitting the init and post statements.
  An infinite loop is emulated by omitting all init, condition, and post statements.

	`FOR` WITH RANGE STATEMENT
	A `for` with range iterates over slice or map.
	The range iteration has index and value. Both index or value can be omitted.

  `IF` STATEMENT
  The variables declared in the init statement are only visible in the `if` statement.

	`SWITCH` STATEMENT
	Go only runs the selected case, not all the cases that follow.
	Cases need not be constants or numbers only.
	Cases are evaluated top to bottom, stopping when a case succeeds.
	Missing condition is considered `switch true`.

	`DEFER` STATEMENT
	Defer statment defers the execution of the statement till enclosing block leaves.
	Deferred statements are pushed onto a stack, and execute in LIFO order.
*/

package main

import (
	"fmt"
	"math"
	"runtime"
	"time"
)

func for_statement() {
	sum := 0
	for i := 0; i < 10; i++ {
		sum += i
	}
	fmt.Println(sum)
}

func for_statement_with_range() {
	var pow = []int{1, 2, 4, 8, 16, 32, 64, 128}
	for i, v := range pow {
		fmt.Printf("2**%d = %d\n", i, v)
	}
	for _, v := range pow { // skip index
		fmt.Printf("%d\n", v)
	}
	for i := range pow { // skip value
		fmt.Printf("%d\n", i)
	}
}

func while_statement() {
	sum := 1
	for sum < 1000 {
		sum += sum
	}
	fmt.Println(sum)
}

func loop_forever_statement() {
	sum := 1
	for {
		sum += sum
		if sum >= 1000 {
			break
		}
	}
	fmt.Println(sum)
}

func if_statement() {
	var sqrt func(x float64) string // function variable

	sqrt = func(x float64) string {
		if x < 0 {
			return sqrt(-x) + "i"
		}
		return fmt.Sprint(math.Sqrt(x))
	}

	fmt.Println(sqrt(2), sqrt(-4))
}

func if_statement_with_init() {
	pow := func(x, n, lim float64) float64 {
		if v := math.Pow(x, n); v < lim {
			return v
		} else {
			fmt.Printf("%g >= %g\n", v, lim) // `v` is visible here too
		}
		return lim
	}

	fmt.Println(
		pow(3, 2, 10),
		pow(3, 3, 20),
	)
}

func switch_statement() {
	fmt.Print("Go runs on ")
	switch os := runtime.GOOS; os {
	case "darwin":
		fmt.Println("OS X.")
	case "linux":
		fmt.Println("Linux.")
	default:
		fmt.Printf("%s.\n", os) // freebsd, openbsd, plan9, windows...
	}
}

func switch_statement_case_eval_order() {
	fmt.Println("When's Saturday?")
	today := time.Now().Weekday()
	switch time.Saturday {
	case today + 0:
		fmt.Println("Today.")
	case today + 1:
		fmt.Println("Tomorrow.")
	case today + 2:
		fmt.Println("In two days.")
	default:
		fmt.Println("Too far away.")
	}
}

func switch_statement_missing_condition() {
	t := time.Now()
	switch {
	case t.Hour() < 12:
		fmt.Println("Good morning!")
	case t.Hour() < 17:
		fmt.Println("Good afternoon.")
	default:
		fmt.Println("Good evening.")
	}
}

func defer_statement() {
	defer fmt.Println("world")
	fmt.Println("hello")
}

func defer_statement_execution_order() {
	fmt.Println("counting")
	for i := 0; i < 10; i++ {
		defer fmt.Println(i)
	}
	fmt.Println("done")
}

func main() {
	for_statement()
	for_statement_with_range()
	while_statement()
	loop_forever_statement()
	if_statement()
	if_statement_with_init()
	switch_statement()
	switch_statement_case_eval_order()
	switch_statement_missing_condition()
	defer_statement()
	defer_statement_execution_order()
}
