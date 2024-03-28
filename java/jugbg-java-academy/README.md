# Java academy

## Course channels

[Moodle](https://moodle.jug.bg)  
[Slack](https://app.slack.com/client/T04UKPJS1L5/C04U863VBHD)  
[YouTube](https://www.youtube.com/@bgjug)  

## Setup Java environment with Docker

### Create a dev network
```
docker network create \
  -d bridge \
  --subnet 172.20.0.0/16 \
  --gateway 172.20.0.1 \
  bridge-dev
```

### Create a dev Java image
```
DOCKER_BUILDKIT=1 \
PASSWD=$(read -s -p 'Password:' PASSWD ; echo "$USER:$PASSWD") \
docker image build \
  --no-cache \
  --force-rm \
  --secret id=PASSWD \
  --tag dev-java \
  - << EOF

  FROM ubuntu
  RUN --mount=type=secret,id=PASSWD \
    apt-get update && \
    apt-get install -y sudo ssh tmux vim curl less openjdk-17-jdk-headless && \
    useradd -m -s /bin/bash -G sudo $USER && \
    cat /run/secrets/PASSWD | chpasswd
  USER $USER
EOF
```

### Run a dev Java container
```
docker container run -it \
  --name dev-java \
  --network bridge-dev \
  --ip 172.20.0.100 \
  --volume "$PWD:$PWD" \
  --rm dev-java
```

## Compile and run a Java program within a running dev Java container

[HelloWorld.java](./java-fundamentials/HelloWorld.java)
```
class HelloWorld {
  public static void main(String[] args) {
    System.out.println("Hello world!");
  }
}
```

Compile and run
```
cd ~/java-academy/java-fundamentials
javac HelloWorld.java
java HelloWorld
```

## Connect VScode directly to the dev Java container
Optionally, VScode can be remote connected to the docker dev Java container directly, and the `Java Extension Pack` by Microsoft can be loaded for more immersive coding and debugging experience.

This requires a SSH server to be launched inside the dev Java container.
```
docker container exec -it dev-java bash -c 'sudo service ssh start'
```

The docker dev Java container can then be remote connected from VScode with the `Remote ssh connect to host` command, and the `ssh 172.20.0.100` connect string. 
