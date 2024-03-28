# Examples

### Run a dev Java container
```
docker container run -it \
  --name dev-java \
  --network bridge-dev \
  --ip 172.20.0.100 \
  --volume "$PWD:/home/$USER/java-academy" \
  --rm dev-java
```

### Build and run examples from the dev Java container
```
cd ~/java-academy/java-fundamentials/examples
shopt -s globstar
javac -d bin src/**/*.java
java -cp bin bg.jug.academy.Application
```
