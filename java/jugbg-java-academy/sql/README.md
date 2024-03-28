# Sql

## Run the database:
```
docker network create \
  -d bridge \
  --subnet 172.20.0.0/16 \
  --gateway 172.20.0.1 \
  bridge-dev
  
(read -s -p 'Password:' MYSQL_ROOT_PASSWORD ; \
docker container run --rm -d \
  --name dev-mysql \
  --network bridge-dev \
  --ip 172.20.0.201 \
  --volume "$PWD/__mysql:/var/lib/mysql" \
  --env MYSQL_ROOT_PASSWORD=$MYSQL_ROOT_PASSWORD \
  mysql)

mysql_config_editor set --host=172.20.0.201 --port=3306 --user=root --password
```

## Execute a solution:
```
cat exam.sql | mysql --table
```
