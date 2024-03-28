/*
	See https://go.dev/tour/methods/25

	Build:
		go build -o ./bin/ ./tour-of-go/exercise-images && ./bin/exercise-images

	See https://pkg.go.dev/image#Image

	type Image interface {
			// ColorModel returns the Image's color model.
			ColorModel() color.Model
			// Bounds returns the domain for which At can return non-zero color.
			// The bounds do not necessarily contain the point (0, 0).
			Bounds() Rectangle
			// At returns the color of the pixel at (x, y).
			// At(Bounds().Min.X, Bounds().Min.Y) returns the upper-left pixel of the grid.
			// At(Bounds().Max.X-1, Bounds().Max.Y-1) returns the lower-right one.
			At(x, y int) color.Color
	}
*/

package main

import (
	"fmt"
	"image"
	"image/color"

	"golang.org/x/tour/pic"
)

type Image struct{}

func (Image) ColorModel() color.Model { return color.RGBAModel }
func (Image) Bounds() image.Rectangle { return image.Rect(0, 0, 100, 100) }
func (Image) At(x, y int) color.Color {
	v := uint8(x ^ y)
	return color.RGBA{v, v, 255, 255}
}

func main() {
	m := Image{}
	fmt.Printf("%T %v\n", m, m)
	pic.ShowImage(m)
}
