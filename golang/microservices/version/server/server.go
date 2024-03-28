/*
	Build and run:
		go build -o ./bin/ ./server && ./bin/server -port 8080 -link fake

	Build and run for stats:
		go build -o ./bin/ ./server && ./bin/server > ./bin/log.txt &
		watch -n 1 tail -n 5 ./bin/log.txt

	Test:
		curl http://localhost:8080/version/production
*/

package main

import (
	"flag"
	"fmt"
	"net/http"
	"os"

	"github.com/georgevs/microservice/version/dbs"
	"github.com/georgevs/microservice/version/fakes"
	"github.com/georgevs/microservice/version/handlers"
	"github.com/georgevs/microservice/version/stats"
)

func dbForLink(link string) (db dbs.Db, err error) {
	switch link {
	case "fake":
		db = fakes.NewFakeDb()
	default:
		err = fmt.Errorf("unsupported database: %v", link)
	}
	return
}

func main() {
	port := flag.Uint("port", 8080, "port")
	link := flag.String("link", "fake", "database link")
	flag.Parse()

	db, err := dbForLink(*link)
	if err != nil {
		fmt.Fprintf(os.Stderr, "error: %v\n", err)
		os.Exit(125)
	}

	info := make(chan stats.Stats, 1)
	sa := stats.NewStatsAggregator()
	go sa.Run(info)

	http.Handle("/version/", handlers.NewVersion(db, info))
	http.ListenAndServe(fmt.Sprintf(":%d", *port), nil)
}
