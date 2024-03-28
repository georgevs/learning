/*
	go test -v -test.bench=Index ./tests-benchmark
*/

package main

import (
	"strings"
	"testing"
)

func BenchmarkIndex(b *testing.B) {
	const s = "some_text=some☺value"
	for i := 0; i < b.N; i++ {
		strings.Index(s, "v")
	}
}
