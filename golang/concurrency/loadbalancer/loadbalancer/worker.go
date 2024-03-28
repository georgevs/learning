package main

import "fmt"

type Worker struct {
	requests chan *Request
	load     int
	index    int
}

func NewWorker() *Worker {
	requests := make(chan *Request)
	return &Worker{requests: requests, index: -1}
}

func (worker *Worker) Run(done chan<- *Worker) {
	for {
		request := <-worker.requests
		request.response <- request.fn()
		done <- worker
	}
}

func (worker Worker) String() string {
	return fmt.Sprintf("%d", worker.load)
}
