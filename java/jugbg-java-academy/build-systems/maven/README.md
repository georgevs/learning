# Maven

https://maven.apache.org/  
https://jenkov.com/tutorials/maven/maven-tutorial.html  
https://www.baeldung.com/maven  

### Install Maven
```
curl https://dlcdn.apache.org/maven/maven-3/3.9.3/binaries/apache-maven-3.9.3-bin.tar.gz -o apache-maven-3.9.3-bin.tar.gz

cat apache-maven-3.9.3-bin.tar.gz | ssh george@172.20.0.202 tar xzv --directory ~/

sudo mv ~/apache-maven-3.9.3 /opt/
export M2_HOME=/opt/apache-maven-3.9.3
export M2=$M2_HOME/bin
export PATH="$PATH:$M2"
```

### Minimal pom.xml
```
<project xmlns="http://maven.apache.org/POM/4.0.0"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>

  <groupId>com.acme</groupId>
  <artifactId>example</artifactId>
  <version>1.0.0</version>

  <dependencies>
    <dependency>
      <groupId>org.junit.jupiter</groupId>
      <artifactId>junit-jupiter</artifactId>
      <version>5.8.2</version>
      <scope>test</scope>
    </dependency>
  </dependencies>
</project>
```

### Running Maven
```
mvn install
mvn clean install
```

### Maven directory structure
```
- src
  - main
    - java
    - resources
    - webapp
  - test
    - java
    - resources

- target
```

### Maven repositories
Maven has three types of repositories (listed by search order):
- local
- central
- remote

### Maven Build Life Cycles, Phases and Goals
Maven has 3 built-in build life cycles: `default`, `clean`, and `site`.  
Each build life cycle is divided into a sequence of build phases.  
The build phases are again subdivided into goals.  

Most commonly used build phases are:
- validate
- compile
- test
- package
- install
- deploy

### Maven Build Profiles

Maven build profiles enable you to build your project using different configurations under the same `pom.xml` file (for example: `development` and `production`).
The elements inside the `profile` element will override the values of the elements with the same name further up in the `pom.xml`.
Target profile can be passed on the `mvn` cli.
```
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
   http://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>

  <groupId>com.jenkov.crawler</groupId>
  <artifactId>java-web-crawler</artifactId>
  <version>1.0.0</version>

  <profiles>
      <profile>
          <id>development</id>
          <activation>...</activation>
          <build>...</build>
          <modules>...</modules>
          <repositories>...</repositories>
          <pluginRepositories>...</pluginRepositories>
          <dependencies>...</dependencies>
          <reporting>...</reporting>
          <dependencyManagement>...</dependencyManagement>
          <distributionManagement>...</distributionManagement>
      </profile>
  </profiles>

</project>
```