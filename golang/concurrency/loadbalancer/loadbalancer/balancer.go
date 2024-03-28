package main

import (
	"container/heap"
	"fmt"
	"time"
)

type Balancer struct {
	done chan *Worker
	pool WorkerPool
}

func NewBalancer(workersCount int) *Balancer {
	done := make(chan *Worker, workersCount)
	var pool WorkerPool
	heap.Init(&pool)
	for i := 0; i < workersCount; i++ {
		worker := NewWorker()
		go func() { worker.Run(done) }()
		heap.Push(&pool, worker)
	}
	return &Balancer{done: done, pool: pool}
}

func (balancer *Balancer) Run(requests <-chan *Request) {
	quantStart := time.Now()
	logDeadline := quantStart.Add(1 * time.Second)
	quantRequests, totalRequests := 0, 0
	for {
		select {
		case request := <-requests:
			balancer.accept(request)
			quantRequests++
		case worker := <-balancer.done:
			balancer.update(worker)
		}
		if logDeadline.Before(time.Now()) {
			totalRequests = totalRequests + quantRequests
			fmt.Printf("Balancer/Run: N=%v (%.1f/s), L=%v, T=%v \n",
				totalRequests, float64(quantRequests)/time.Since(quantStart).Seconds(),
				balancer, time.Now().Unix())
			quantStart = time.Now()
			logDeadline = quantStart.Add(1 * time.Second)
			quantRequests = 0
		}
	}
}

func (balancer *Balancer) accept(request *Request) {
	for {
		worker := heap.Pop(&balancer.pool).(*Worker)
		select {
		case worker.requests <- request:
			worker.load++
			heap.Push(&balancer.pool, worker)
			return

		default:
			heap.Push(&balancer.pool, worker)
			balancer.update(<-balancer.done)
		}
	}
}

func (balancer *Balancer) update(worker *Worker) {
	worker.load--
	heap.Fix(&balancer.pool, worker.index)
}

func (balancer *Balancer) String() string {
	return fmt.Sprintf("%v", balancer.pool)
}
