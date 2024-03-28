/*
	See https://go.dev/tour/moretypes/18

	Build:
		go build -o ./bin/ ./tour-of-go/exercise-slices && ./bin/exercise-slices
*/

package main

import (
	"fmt"
	// "golang.org/x/tour/pic"
)

func Pic(dx, dy int) [][]uint8 {
	data := make([]uint8, dx*dy)
	pixels := make([][]uint8, dy)
	for y := 0; y < dy; y++ {
		pixels[y] = data[y*dx : (y+1)*dx]
		for x := 0; x < dx; x++ {
			// data[y*dx+x] = uint8(x * y)
			// data[y*dx+x] = uint8((x+y)/2)
			data[y*dx+x] = uint8(x ^ y)
			pixels[y][x] = uint8(x ^ y)
		}
	}
	return pixels
}

func main() {
	fmt.Println(Pic(3, 3))
	// pic.Show(Pic)
}
