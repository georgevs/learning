/*
  Build:
    go build -o ./bin/ ./tour-of-go/1-packages && ./bin/1-packages

  PACKAGES
  Every Go program is made up of packages.
  Programs start running in package main.
  Import packages with `import` listing the package path.
  The package name is the last name of the package path.

  IMPORTS
  The import statement may be one per line, or preferably "factored".

  EXPORTED NAMES
  Names begining with a capital letter are exported and visible outside the package.
*/

package main

import ( // factored import statement
	"fmt"
	"math"
	"math/rand"
)

func main() {
	fmt.Println("My favorite number is", rand.Intn(10))
	fmt.Printf("Now you have %g problems.\n", math.Sqrt(7))
	fmt.Println(math.Pi) // Pi is exported
}
