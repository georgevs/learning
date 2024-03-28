package main

import (
	"fmt"
	"math/rand"
	"time"
)

type Requester struct{}

func NewRequester() *Requester {
	return &Requester{}
}

func (requester *Requester) Run(requests chan<- *Request) {
	response := make(chan *Response)
	fn := func() *Response {
		d := time.Duration(rand.Intn(1000)) * time.Millisecond
		time.Sleep(d)
		data := fmt.Sprintf("It took %v to complete this request", d)
		return &Response{data: data}
	}
	for {
		requests <- &Request{fn: fn, response: response}
		<-response
	}
}
