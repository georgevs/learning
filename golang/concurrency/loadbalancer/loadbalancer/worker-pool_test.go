package main

import (
	"container/heap"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestWorkerPoolOrder(t *testing.T) {
	var pool WorkerPool
	heap.Init(&pool)

	worker1 := NewWorker()
	worker1.requests = 1
	heap.Push(&pool, worker1)

	worker2 := NewWorker()
	worker2.requests = 2
	heap.Push(&pool, worker2)

	assert.Less(t, worker1.index, worker2.index)

	worker1.requests = 3
	heap.Fix(&pool, worker1.index)

	assert.Less(t, worker2.index, worker1.index)
}
