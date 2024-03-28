# Version microservice

## Build and run server
```
go build -o ./bin/ ./server
./bin/server -port 8080 -link fake
```

## Build and run client
```
go build -o ./bin/ ./client
./bin/client -env production -endpoint http://localhost:8080
```

## Build and run for stats
```
go build -o ./bin/ ./server && go build -o ./bin/ ./client 
./bin/server > ./bin/log.txt & 
./bin/client -rate 100ms > /dev/null & 
watch -n 1 tail -n 5 ./bin/log.txt 
```

## References

[Go by example (http client, server, context)](https://gobyexample.com/http-client)  
[Go Concurrency Patterns: Context](https://go.dev/blog/context)  
