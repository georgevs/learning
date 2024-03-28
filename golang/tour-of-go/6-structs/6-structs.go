/*
  Build:
    go build -o ./bin/ ./tour-of-go/6-structs && ./bin/6-structs

	STRUCTS
	A struct is a collection of fields.
	Struct literals allocate and initialize a new instance.
	Struct fields are accessed using a dot.
	Struct fields can be accessed through a struct pointer.
	Either `(*p).X` and `p.X` are acceptable.
*/

package main

import "fmt"

type Vertex struct {
	X int
	Y int
}

func struct_instantiation() {
	fmt.Println(Vertex{1, 2}) // struct literal
	var (
		v1 = Vertex{1, 2}  // has type Vertex
		v2 = Vertex{X: 1}  // Y:0 is implicit
		v3 = Vertex{}      // X:0 and Y:0
		p  = &Vertex{3, 4} // has type *Vertex
	)
	fmt.Println(v1, v2, v3, p)
}

func struct_fields() {
	v := Vertex{1, 2}
	v.X = 4
	fmt.Println(v.X)
}

func struct_pointer() {
	v := Vertex{1, 2}
	p := &v
	p.X = 3
	fmt.Println(v)
	(*p).X = 4
	fmt.Println(v)
}

func main() {
	struct_instantiation()
	struct_fields()
	struct_pointer()
}
