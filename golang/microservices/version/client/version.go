/*
	Build and run:
		go build -o ./bin/ ./client && ./bin/client -env production -endpoint http://localhost:8080

	Build and run for stats:
		go build -o ./bin/ ./client && ./bin/client -rate 100ms > /dev/null
*/

package main

import (
	"encoding/json"
	"flag"
	"fmt"
	"net/http"
	"net/url"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/georgevs/microservice/version/data"
)

func fetchVersion(env string, endpoint string) (ver string, err error) {
	var rawURL string
	if rawURL, err = url.JoinPath(endpoint, "version", env); err != nil {
		return
	}

	var resp *http.Response
	if resp, err = http.Get(rawURL); err != nil {
		return
	}

	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		err = fmt.Errorf("request failed: %v", resp.Status)
		return
	}

	var result data.Result
	if err = json.NewDecoder(resp.Body).Decode(&result); err != nil {
		return
	}

	if result.Error != "" {
		err = fmt.Errorf(result.Error)
	} else {
		ver = result.Version
	}

	return
}

func main() {
	env := flag.String("env", "production", "target environment")
	endpoint := flag.String("endpoint", "http://localhost:8080", "service endpoint")
	rate := flag.Duration("rate", 0*time.Second, "stress test rate")
	flag.Parse()

	quit := make(chan os.Signal, 1)
	signal.Notify(quit, os.Interrupt, syscall.SIGTERM)

	for {
		ver, err := fetchVersion(*env, *endpoint)
		if err != nil {
			fmt.Fprintf(os.Stderr, "error: %v\n", err)
			os.Exit(125)
		}

		if *rate == 0*time.Second {
			fmt.Fprintln(os.Stdout, ver)
			break
		}

		select {
		case <-quit:
			return
		case <-time.After(*rate):
		}
	}
}
