/*
	Build:
		go build -o ./bin/ ./tour-of-go/10-interfaces && ./bin/10-interfaces

	INTERFACES
	Interface type is a set of method signatures.
	A value of an interface type can hold any value which implements the interface methods.
	Internally interfaces are like tuple of value and a concrete type.
	The interface with no methods is called the EMPTY interface.
	All types implement the EMPTY interface.
	Functions that accept empty interface argument can handle values of unknown type.

	TYPE ASSERTION
	Type assertion provides access to the underlying concrete value.
	Type assertion can test or panic (throw error) on type mismatch depending on the syntax used.

	TYPE SWITCHES
	Type switch permits a series of type assertions

	STRINGERS
	The built-in Stringer interface allow an implementing type do describe itself as a string.
	Receiver value MUST be passed as value type, NOT pointer type.

		type Stringer interface {
				String() string
		}
*/

package main

import (
	"fmt"
	"math"
)

type Abser interface {
	Abs() float64
}

func interfaces() {
	f := MyFloat(-math.Sqrt2)
	v := Vertex{3, 4}

	var a Abser

	a = f // a MyFloat implements Abser
	fmt.Println(a.Abs(), f.Abs())

	a = &v // a *Vertex implements Abser
	fmt.Println(a.Abs(), v.Abs())

	// a = v   // err: v is a Vertex (not *Vertex), and does NOT implement Abser.
}

type MyFloat float64

func (f MyFloat) Abs() float64 {
	if f < 0 {
		return float64(-f)
	}
	return float64(f)
}

type Vertex struct {
	X, Y float64
}

func (v *Vertex) Abs() float64 {
	if v == nil {
		fmt.Println("nil")
		return 0
	}
	return math.Sqrt(v.X*v.X + v.Y*v.Y)
}

func interfaces_describe() {
	var a Abser

	a = &Vertex{1, 2}
	describe(a) // outputs `(&{1 2}, *main.Vertex)`
	fmt.Println(a.Abs())

	a = MyFloat(math.Pi)
	describe(a) // outputs `(3.141592653589793, main.MyFloat)`
	fmt.Println(a.Abs())
}

func describe(a Abser) {
	fmt.Printf("(%v, %T)\n", a, a)
}

func interfaces_with_nil_receiver() {
	var v *Vertex
	var a Abser

	describe(a) // outputs (<nil>, <nil>)
	// fmt.Println(a.Abs()) // call will crash if `a` itself is nil

	a = v
	describe(a)          // outputs (<nil>, *main.Vertex)
	fmt.Println(a.Abs()) // call won't crash here if `v` is nil

	a = &Vertex{1, 2}
	describe(a) // outputs (&{1 2}, *main.Vertex)
	fmt.Println(a.Abs())
}

func interfaces_empty() {
	var i interface{}
	describeEmpty(i)

	i = 42
	describeEmpty(i)

	i = "hello"
	describeEmpty(i)
}

func describeEmpty(i interface{}) { // can handle values of unknown type
	fmt.Printf("(%v, %T)\n", i, i)
}

func interfaces_typ_assertion() {
	var i interface{} = "hello"

	s := i.(string) // ok: types match
	fmt.Println(s)

	s, ok := i.(string) // ok: test matching types
	fmt.Println(s, ok)

	f, ok := i.(float64) // ok: test type mismatch
	fmt.Println(f, ok)

	// f = i.(float64) // err: panic
	// fmt.Println(f)
}

func do(i interface{}) {
	switch v := i.(type) { // notice the keyword `type` as type selector
	case int:
		fmt.Printf("Twice %v is %v\n", v, v*2)
	case string:
		fmt.Printf("%q is %v bytes long\n", v, len(v))
	default:
		fmt.Printf("I don't know about type %T!\n", v)
	}
}

func interfaces_type_switches() {
	do(21)
	do("hello")
	do(true)
}

type Person struct {
	Name string
	Age  int
}

func (p Person) String() string { // for stringers, receiver MUST be a value type
	return fmt.Sprintf("%v (%v years)", p.Name, p.Age)
}

func interfaces_stringer() {
	a := Person{"Arthur Dent", 42}
	z := Person{"Zaphod Beeblebrox", 9001}
	fmt.Println(a, z)
}

func main() {
	interfaces()
	interfaces_describe()
	interfaces_with_nil_receiver()
	interfaces_empty()
	interfaces_typ_assertion()
	interfaces_type_switches()
	interfaces_stringer()
}
