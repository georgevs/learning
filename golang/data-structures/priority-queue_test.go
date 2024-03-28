package main

import (
	"container/heap"
	"fmt"
	"testing"

	"github.com/stretchr/testify/assert"
)

type PriorityQueue []int

func (pq PriorityQueue) Len() int { return len(pq) }

func (pq PriorityQueue) Less(i, j int) bool { return pq[i] < pq[j] }

func (pq PriorityQueue) Swap(i, j int) { pq[i], pq[j] = pq[j], pq[i] }

func (pq *PriorityQueue) Push(x interface{}) {
	*pq = append(*pq, x.(int))
}

func (pq *PriorityQueue) Pop() interface{} {
	old := *pq
	n := len(old)
	x := old[n-1]
	*pq = old[0 : n-1]
	return x
}

func TestHeapSort(t *testing.T) {
	queue := &PriorityQueue{1, 3, 5, 7, 2, 4, 6, 8}
	fmt.Println(*queue)

	heap.Init(queue)

	// queue is now heapified
	fmt.Println(*queue)

	sorted := make([]int, len(*queue))
	for i := range sorted {
		sorted[i] = heap.Pop(queue).(int)
	}

	// queue is now empty

	fmt.Println(sorted)
	fmt.Println(*queue)

	assert.Equal(t, sorted, []int{1, 2, 3, 4, 5, 6, 7, 8}, "result must be sorted")
}
