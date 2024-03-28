/*
	Build:
		go build -o ./bin/ ./loadbalancer && ./bin/loadbalancer
*/

package main

import (
	"flag"
	"time"
)

func main() {
	workersCount := flag.Int("workers", 1, "workers count")
	requestersCount := flag.Int("requesters", 50, "requesters count")
	flag.Parse()

	requests := make(chan *Request)

	balancer := NewBalancer(*workersCount)
	go func() { balancer.Run(requests) }()

	for i := 0; i < *requestersCount; i++ {
		requester := NewRequester()
		go func() { requester.Run(requests) }()
	}

	time.Sleep(10 * time.Second)
}
