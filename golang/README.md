# Golang

Basic...  
[Go playground](https://go.dev/play/)  
[A tour of Go](https://go.dev/tour/list)  

Going deeper...  
[Installing Go](https://go.dev/doc/install/)  
[How to write Go code](https://go.dev/doc/code)  
[Effective Go](https://go.dev/doc/effective_go)  
[Go by example](https://gobyexample.com)  

Going even more deeper...  
[Go Standard library](https://go.dev/pkg/)  
[Go Concurrency Patterns](https://go.dev/talks/2012/concurrency.slide)  
[Advanced Go Concurrency Patterns](https://go.dev/talks/2012/concurrency.slide)  
[A simple programming environment](https://go.dev/talks/2012/simple.slide)  
[Writing Web Applications](https://go.dev/doc/articles/wiki/)  

Java to Golang converter...  
[CodeConvert](https://www.codeconvert.ai/java-to-golang-converter)  

## Setup Golang environment with Docker

### Create a dev network
```
docker network create \
  -d bridge \
  --subnet 172.20.0.0/16 \
  --gateway 172.20.0.1 \
  bridge-dev
```

### Create a dev Golang image
```
DOCKER_BUILDKIT=1 \
PASSWD=$(read -s -p 'Password:' PASSWD ; echo "$USER:$PASSWD") \
docker image build \
  --no-cache \
  --force-rm \
  --secret id=PASSWD \
  --tag dev-golang \
  - << EOF

  FROM ubuntu
  SHELL ["/bin/bash", "-c"]
  RUN --mount=type=secret,id=PASSWD \
    apt-get update && \
    apt-get install -y sudo ssh tmux vim curl less zip unzip && \
    useradd -m -s /bin/bash -G sudo $USER && \
    cat /run/secrets/PASSWD | chpasswd && \
    curl -sL https://go.dev/dl/go1.20.4.linux-amd64.tar.gz | tar xz --directory /usr/local
  ENV PATH="$PATH:/usr/local/go/bin"
  USER $USER
EOF
```

### Run a dev Golang container
Run a new dev Golang container instance each start.
```
docker container run -it \
  --name dev-golang \
  --network bridge-dev \
  --ip 172.20.0.200 \
  --volume "$PWD:$PWD" \
  --rm -d dev-golang
```

Alternatively run a new dev Golang container once, and start/stop it each time.
This is useful to instantiate a reusable Golang container to work with VScode directly.
```
docker container run -it \
  --name dev-golang \
  --network bridge-dev \
  --ip 172.20.0.200 \
  --volume "$PWD:$PWD" \
  -d dev-golang

docker contrainer start dev-golang
docker contrainer stop dev-golang
``` 

## Connect VScode directly to the dev Golang container
VScode can be remote connected to the docker dev Golang container directly for more immersive coding and debugging experience.

This requires a SSH server to be launched inside the dev Golang container.
```
docker container exec -it dev-golang bash -c 'sudo service ssh start'
```

The docker dev Golang container can then be remote connected from VScode with the `Remote ssh connect to host` command, and the `ssh 172.20.0.200` connect string. 

WARNING: Each distinct Golang container instance will have its unique ssh fingerprint which will fail the ssh connection if a mismatched fingerprint exists in the host `~/.ssh/known_hosts`. One way to troubleshoot is to delete the container's fingerprint line from `~/.ssh/known_hosts`, and let VScode ask again.


## Compile and run a Golang program within a running dev Golang container
[hello-world.go](./hello-world/hello-world.go)
```golang
package main
import "fmt"
func main() {
	fmt.Println("hello world")
}
```

Build and run
```
go build -o ./bin/ ./hello-world 
./bin/hello-world
```
