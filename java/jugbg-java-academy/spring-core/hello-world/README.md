# Hello world Spring

### Dependencies discovery
Search [Spring framework](https://docs.spring.io/spring-framework/docs/current/javadoc-api) documentation for the target class.  Google the target class package related to `mvncentral`.  The versioned links in the [Maven repository](https://mvnrepository.com/artifact/org.springframework) will have code snippet to use with Maven, Gradle, etc.

### Build and run
```bash
mvn clean package assembly:single
java -jar target/hello-world-1.0.0-jar-with-dependencies.jar
```
