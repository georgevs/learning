/*
	See https://go.dev/tour/concurrency/10

	Build:
		go build -o ./bin/ ./tour-of-go/exercise-web-crawler && ./bin/exercise-web-crawler
*/

package main

import (
	"fmt"
	"math/rand"
	"sync"
	"time"
)

type Fetcher interface {
	// Fetch returns the body of URL and
	// a slice of URLs found on that page.
	Fetch(url string) (body string, urls []string, err error)
}

type void struct{}

var (
	mx      sync.Mutex
	visited = make(map[string]void)
)

// Crawl uses fetcher to recursively crawl
// pages starting with url, to a maximum of depth.
func Crawl(url string, depth int, fetcher Fetcher) {
	if depth <= 0 {
		return
	}

	mx.Lock()
	defer mx.Unlock()

	if _, ok := visited[url]; ok {
		return
	}

	visited[url] = void{} // mark as visited

	mx.Unlock()
	body, urls, err := fetcher.Fetch(url) // blocking I/O
	mx.Lock()

	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Printf("found: %s %q\n", url, body)

	chs := make([]chan void, len(urls))
	for i, u := range urls {
		chs[i] = make(chan void)
		go func(url string, ch chan void) {
			Crawl(url, depth-1, fetcher)
			ch <- void{} // signal completion
		}(u, chs[i])
	}

	mx.Unlock()
	for _, ch := range chs {
		<-ch // wait for completion
	}
	mx.Lock()

	return
}

func main() {
	Crawl("https://golang.org/", 4, fetcher)
	fmt.Println("ALL done")
}

// fakeFetcher is Fetcher that returns canned results.
type fakeFetcher map[string]*fakeResult

type fakeResult struct {
	body string
	urls []string
}

func (f fakeFetcher) Fetch(url string) (string, []string, error) {
	if res, ok := f[url]; ok {
		time.Sleep(time.Duration(rand.Intn(1000)) * time.Millisecond) // simulate network delay
		return res.body, res.urls, nil
	}
	return "", nil, fmt.Errorf("not found: %s", url)
}

// fetcher is a populated fakeFetcher.
var fetcher = fakeFetcher{
	"https://golang.org/": &fakeResult{
		"The Go Programming Language",
		[]string{
			"https://golang.org/pkg/",
			"https://golang.org/cmd/",
		},
	},
	"https://golang.org/pkg/": &fakeResult{
		"Packages",
		[]string{
			"https://golang.org/",
			"https://golang.org/cmd/",
			"https://golang.org/pkg/fmt/",
			"https://golang.org/pkg/os/",
		},
	},
	"https://golang.org/pkg/fmt/": &fakeResult{
		"Package fmt",
		[]string{
			"https://golang.org/",
			"https://golang.org/pkg/",
		},
	},
	"https://golang.org/pkg/os/": &fakeResult{
		"Package os",
		[]string{
			"https://golang.org/",
			"https://golang.org/pkg/",
		},
	},
}
