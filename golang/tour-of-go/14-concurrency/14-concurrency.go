/*
	Build:
		go build -o ./bin/ ./tour-of-go/14-concurrency && ./bin/14-concurrency

	GOROUTINES
	A goroutine is a lightweight thread managed by the Go runtime.
	Access to shared memory must be synchronized. See https://go.dev/pkg/sync/ package

	CHANNELS
	Channels are a typed pipe to send/receive values.

		ch <- v   	// send
		v := <-ch 	// receive

	By default, channel send/receive are blocking operations.
	Blocking send/receive are used as a synchronization without explicit locks.

	Channels can be fuffered if capacity is specified at `make()`.
	Buffered channels block on SEND when FULL.
	Buffered channels block on RECEIVE when EMPTY.

	RANGE AND CLOSE
	Senders close the channel when no more values. ONLY senders close the channel.
	Receivers can test if the channel is closed.
	Use for-range statement to receive values until closed.

	SELECT STATEMENT
	Use `select` statement to wait on multiple channels.
	Use `select` default case to avoid blocking.

	MUTEX
	Go std lib `sync.Mutex` provides mutual exlusion synchronization.
	Aquire the mutex with `m.Lock()`
	Use `defer m.Unlock()` to ensure mutex release on block leave.
*/

package main

import (
	"fmt"
	"sync"
	"time"
)

func say(s string) {
	for i := 0; i < 5; i++ {
		time.Sleep(100 * time.Millisecond)
		fmt.Println(s)
	}
}

func goroutines() {
	go say("world")
	say("hello")
}

func sum(s []int, c chan int) {
	sum := 0
	for _, v := range s {
		sum += v
	}
	c <- sum // send sum to c
}

func channels_send_receive() {
	s := []int{7, 2, 8, -9, 4, 0}

	c := make(chan int)
	go sum(s[:len(s)/2], c)
	go sum(s[len(s)/2:], c)
	x, y := <-c, <-c // receive from c

	fmt.Println(x, y, x+y)
}

func channels_buffered() {
	ch := make(chan int, 2)
	ch <- 1
	ch <- 2 // sender won't block until full
	fmt.Println(<-ch)
	fmt.Println(<-ch) // receiver won't block until empty
}

func fibonacci(n int, c chan int) {
	x, y := 0, 1
	for i := 0; i < n; i++ {
		c <- x
		x, y = y, x+y
	}
	close(c) // signal receiver the sender is done
}

func channels_drain() {
	c := make(chan int, 10)
	go fibonacci(cap(c), c)
	for i := range c { // drain channel until sender is done
		fmt.Println(i)
	}
}

func channels_select() {
	data := make(chan int)  // channel to send `data`
	quit := make(chan bool) // channel to send `quit`

	produce := func() {
		x, y := 0, 1
		for {
			select {
			case data <- x: // data requested
				x, y = y, x+y
			case b := <-quit: // quit requested
				if b {
					fmt.Println("quit")
					return
				}
			}
		}
	}

	consume := func() {
		for i := 0; i < 10; i++ {
			fmt.Println(<-data) // request next data
		}
		quit <- true // request quit
	}

	go produce()
	consume()

	go consume()
	produce()
}

func channels_select_default() {
	tick := time.Tick(1000 * time.Millisecond)
	boom := time.After(5000 * time.Millisecond)
	for {
		select {
		case <-tick:
			fmt.Println("tick.")
		case <-boom:
			fmt.Println("BOOM!")
			return
		default:
			fmt.Println("    .")
			time.Sleep(300 * time.Millisecond)
		}
	}
}

func channels_consumer_producers() {
	chs := make([]chan int, 10)
	for i := range chs {
		chs[i] = make(chan int)
		go func(i int, ch chan int) {
			fmt.Printf("job %v...\n", i)
			time.Sleep(1 * time.Second)
			ch <- i
		}(i, chs[i])
	}
	for _, ch := range chs {
		fmt.Printf("job %v done.\n", <-ch)
	}
	fmt.Println("ALL done")
}

// ----------------------------------------------------------------------------------------
// SafeCounter is safe to use concurrently.
type SafeCounter struct {
	mu sync.Mutex
	v  map[string]int
}

// Inc increments the counter for the given key.
func (c *SafeCounter) Inc(key string) {
	c.mu.Lock()
	// Lock so only one goroutine at a time can access the map c.v.
	c.v[key]++
	c.mu.Unlock()
}

// Value returns the current value of the counter for the given key.
func (c *SafeCounter) Value(key string) int {
	c.mu.Lock()
	// Lock so only one goroutine at a time can access the map c.v.
	defer c.mu.Unlock()
	return c.v[key]
}

func mutexes() {
	c := SafeCounter{v: make(map[string]int)}
	for i := 0; i < 1000; i++ {
		go c.Inc("somekey")
	}

	time.Sleep(time.Second)
	fmt.Println(c.Value("somekey"))
}

// ----------------------------------------------------------------------------------------
func main() {
	goroutines()
	channels_send_receive()
	channels_buffered()
	channels_drain()
	channels_select()
	channels_select_default()
	channels_consumer_producers()
	mutexes()
}
