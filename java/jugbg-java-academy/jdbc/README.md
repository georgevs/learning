# JDBC

[Dev MySQL: jdbc driver](https://dev.mysql.com/doc/connector-j/8.1/en/connector-j-usagenotes-connect-drivermanager.html)  
[Jenkov: JDBC](https://jenkov.com/tutorials/jdbc)  
[Apache: Maven download](https://maven.apache.org/download.cgi)  

### Create a dev network
```
docker network create \
  -d bridge \
  --subnet 172.20.0.0/16 \
  --gateway 172.20.0.1 \
  bridge-dev
```

### Setup MySQL
```
(read -s -p 'Password:' MYSQL_ROOT_PASSWORD </dev/tty ; \
docker container run \
  --network bridge-dev \
  --ip 172.20.0.201 \
  --env MYSQL_ROOT_PASSWORD=$MYSQL_ROOT_PASSWORD \
  --name dev-mysql \
  --rm -d mysql)

mysql_config_editor set --host 172.20.0.201 --port 3306 --user root --password </dev/tty

mysql < dbs.sql
```

### Create a dev Java image
```
DOCKER_BUILDKIT=1 \
PASSWD=$(read -s -p 'Password:' PASSWD </dev/tty ; echo "$USER:$PASSWD") \
docker image build \
  --no-cache \
  --force-rm \
  --secret id=PASSWD \
  --tag dev-java \
  - << EOF

  FROM ubuntu
  SHELL ["/bin/bash", "-c"]
  RUN --mount=type=secret,id=PASSWD \
    apt-get update && \
    apt-get install -y sudo ssh tmux vim curl less mysql-client openjdk-17-jdk-headless && \
    useradd -m -s /bin/bash -G sudo $USER && \
    cat /run/secrets/PASSWD | chpasswd && \
    curl -s https://dlcdn.apache.org/maven/maven-3/3.9.4/binaries/apache-maven-3.9.4-bin.tar.gz | tar xzv --directory /opt/
  USER $USER
  ENV M2_HOME=/opt/apache-maven-3.9.4
  ENV M2=/opt/apache-maven-3.9.4/bin
  ENV PATH="\$PATH:/opt/apache-maven-3.9.4/bin"
EOF
```

### Run a dev Java container
```
docker container run -it \
  --network bridge-dev \
  --ip 172.20.0.202 \
  --volume "/home/$USER/ws/DEV:/home/$USER/ws/DEV" \
  --volume "/home/$USER/ws/NOTES/wiki:/home/$USER/ws/NOTES/wiki" \
  --name dev-java \
  --rm -d dev-java

docker container exec -it dev-java bash -c 'sudo service ssh start'

docker container exec -it dev-java mysql_config_editor set --host dev-mysql --port 3306 --user root --password 
```
### Connect with ssh through forwarded port
```
ssh -L 54202:172.20.0.202:22 opx
ssh -p 54202 george@localhost
```
If `ssh` fails with a warning of the host identification change, cleanup the old configuration first:
```
ssh-keygen -R '[localhost]:54202'
```
### Test solution
```
cd ./hello-world
mvn test
```