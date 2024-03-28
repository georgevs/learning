import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.MethodSource;
import org.junit.jupiter.params.provider.ValueSource;


public class ExampleParameterizedTest {

  @BeforeEach
  public void beforeEach() {
    
  }

  @AfterEach
  public void afterEach() {

  }

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
}
