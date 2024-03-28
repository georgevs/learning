import java.util.Arrays;
import java.util.stream.Stream;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.DynamicTest.dynamicTest;

import org.junit.jupiter.api.DynamicTest;
import org.junit.jupiter.api.TestFactory;


public class ExampleDynamicTest {
  @TestFactory
  Stream<DynamicTest> shouldAdd2() {
    var cases = new int[][] {
        { 42, 40, 2 },
        { 42, 44, -2 }
    };
    return Arrays.stream(cases)
      .map(it -> dynamicTest("...label...",
          () -> {
            assertEquals(it[0], new Example().add(it[1], it[2]));
          }));
  }
}
