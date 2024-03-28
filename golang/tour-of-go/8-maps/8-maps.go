/*
  Build:
    go build -o ./bin/ ./tour-of-go/8-maps && ./bin/8-maps

	MAPS
	A map maps keys to values.
	Map zero value is `nil`. Map zero value appears empty and cannot be modified.
	Map literals initializes a map at compile time.
	`make()` function allocates and initializes a map at run time.
	Map elements can be inserted, updated, and deleted.
	Test for element presence with destructuring asignment.
*/

package main

import "fmt"

type Vertex struct {
	Lat, Long float64
}

func maps_literal() {
	m := make(map[string]Vertex)
	m["Bell Labs"] = Vertex{
		40.68433, -74.39967,
	}
	fmt.Println(m)
	fmt.Println(m["Bell Labs"])
}

func maps_make() {
	var m = map[string]Vertex{
		"Bell Labs": {
			40.68433, -74.39967,
		},
		"Google": {
			37.42202, -122.08408,
		},
	}
	fmt.Println(m)
	fmt.Println(m["Bell Labs"])
}

func maps_mutate_and_test() {
	m := make(map[string]int)
	m["Answer"] = 42 // insert element
	fmt.Println("The value:", m["Answer"])
	m["Answer"] = 48 // update element
	fmt.Println("The value:", m["Answer"])
	delete(m, "Answer") // delete element
	fmt.Println("The value:", m["Answer"])

	v, ok := m["Answer"] // test if exists
	fmt.Println("The value:", v, "Present?", ok)

	v2, ok := m["Missing"]
	fmt.Println("The value:", v2, "Present?", ok)
	v2 = m["Missing"]
	fmt.Println("The value:", v2, "Present?", ok) // still missing
	v2 = m["Missing"]
	fmt.Println("The value:", v2, "Present?", ok) // still missing
}

func main() {
	maps_literal()
	maps_make()
	maps_mutate_and_test()
}
