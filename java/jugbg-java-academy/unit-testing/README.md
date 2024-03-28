# Unit testing 

[Vogella: JUnit 5 tutorial](https://www.vogella.com/tutorials/JUnit/article.html)  
[Vogella: Mockito Tutorial](https://www.vogella.com/tutorials/Mockito/article.html)  

[Javadoc: JUnit 5](https://javadoc.io/doc/org.junit.jupiter/junit-jupiter-api/5.7.2/index.html)
[Javadoc: Mockito](https://javadoc.io/doc/org.mockito/mockito-core/latest/org/mockito/Mockito.html)

## JUnit 5

### Install Gradle
Download Gradle from https://gradle.org/install/
```
mkdir /opt/gradle
tar xvf ./gradle-8.2.tar.gz --directory /opt/gradle
export PATH=$PATH:/opt/gradle/gradle-8.2/bin
```

### Create Gradle project
```
mkdir -p ./example
cd ./example

cat << EOF > ./.gitignore
.gradle/
build/
EOF

cat << EOF > ./build.gradle
plugins { 
  id 'java'
}
repositories {
  mavenCentral()
}
dependencies {
  testImplementation 'org.junit.jupiter:junit-jupiter-api:5.7.2'
  testRuntimeOnly 'org.junit.jupiter:junit-jupiter-engine:5.7.2'
}
test {
  useJUnitPlatform()
}
java {
  toolchain {
    languageVersion = JavaLanguageVersion.of(17)
  }
}
EOF

mkdir -p ./src/main/java && cat << EOF > ./src/main/java/Example.java
public class Example {
  public int add(int a, int b) {
    return a + b;
  }
}
EOF

mkdir -p ./src/test/java && cat << EOF > ./src/test/java/ExampleTest.java
import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.Test;
public class ExampleTest {
  @Test
  public void shouldAdd() {
    assertEquals(42, new Example().add(40, 2));
  }
}
EOF
```

### Test
```
gradle test
```

### Assertions
Basic:
```
import static org.junit.jupiter.api.Assertions.*;

assertEquals(e,fn(x))

assertTrue(fn(x))
assertFalse(fn(x))

assertNotNull(fn(x))
assertNull(fn(x))

assertAll("...label...",
  () -> assertEquals(e1, fn(x)),
  () -> assertEquals(e2, gn(y)))
```

Exceptions:
```
Throwable ex = assertThrows(IllegalArgumentException.class, () -> fn(x))
assertEqual("...", ex.getMessage())
```

Timeouts:
```
import static org.junit.jupiter.api.Assertions.assertTimeout;
import static java.time.Duration.ofSeconds;

assertTimeout(ofSeconds(15), () -> fn(x));
```

### Disable tests
```
import org.junit.jupiter.api.Test;

@Disabled("...reason...")     <--- disable
@Test void shouldXYZ() { ... }

import org.junit.jupiter.api.Assumptions;

@Test void shouldXYZ() {
  // disbale on Linux
  Assumptions.assumeFalse(System.getProperty("os.name").contains("Linux"));
  ...
}
```

### Parameterized tests
```
implementation 'org.junit.jupiter:junit-jupiter-params:5.7.2'

public static int[][] data() {
  return new int[][] {
    { 42, 40, 2 },
    { 42, 44, -2 }
  };
}

@ParameterizedTest
@MethodSource(value =  "data")
public void shouldAdd(int[] it) {
  assertEquals(it[0], new Example().add(it[1], it[2]));
}
```

### Dynamic tests
```
import static org.junit.jupiter.api.DynamicTest.dynamicTest;
import org.junit.jupiter.api.DynamicTest;
import org.junit.jupiter.api.TestFactory;

@TestFactory
Stream<DynamicTest> shouldAdd() {
  return Arrays
    .stream({           <--- test vector
      {42, 40, 2},
      {42, 44, -2}
    })
    .map(
      it -> dynamicTest(
        "...label...",
        () -> { assertEquals(it[0], new Example().add(it[1], it[2])) }
      )
    );
}
```

## Mockito

### Add dependencies
Add Mockito dependencies in `build.gradle`:
```
dependencies {
  testImplementation 'org.mockito:mockito-inline:4.0.0'
  testImplementation 'org.mockito:mockito-junit-jupiter:4.0.0'
}
```

### Mocks
Returns:
```
when(obj.fn(x)).thenReturn(y)
```

Exceptions:
```
when(obj.fn(x)).thenThrow(new Exception("...message..."))
```

Matcher:
```
import static org.mockito.ArgumentMatchers.anyInt;
when(obj.fn(anyint()))
  .thenAnswer(invocation -> {
    return (int)invocation.getArgument(0) * 100;
  });
```

### Spys
```
import static org.mockito.Mockito.spy;
import static org.mockito.Mockito.doReturn;

var list = new ArrayList<String>();
var listSpy = spy(list);
doReturn("abc").when(listSpy).get(42);
assertEquals("abc", listSpy.get(42));
```

### Verify mocks
```
import static org.mockito.Mockito.atLeast;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoMoreInteractions;

import org.mockito.ArgumentMatchers;

verify(obj).fn(ArgumentMatchers.eq(x));

verify(obj, never()).fn(ArgumentMatchers.eq(x));
verify(obj, atLeast(2)).fn(ArgumentMatchers.eq(x));
verify(obj, times(2)).fn(ArgumentMatchers.eq(x));

verifyNoMoreInteractions(obj);
```

### Example
```
import static org.mockito.Mockito.when;
import static org.mockito.Mockito.mock;

@Test
public void shouldAdd() {
  Adder adderMock = mock(Adder.class);
  when(adderMock.add(40, 2)).thenReturn(42);
  assertEquals(420, new Example().add(adderMock, 40, 2));
}
```
