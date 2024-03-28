package main

type Request struct {
	fn       func() *Response
	response chan *Response
}

type Response struct {
	data string
}
