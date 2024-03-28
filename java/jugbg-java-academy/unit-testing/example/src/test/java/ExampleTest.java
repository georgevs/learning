
import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;


public class ExampleTest {

  @BeforeAll
  public static void beforeAll() {
    
  }

  @BeforeEach
  public void beforeEach() {
    
  }

  @AfterEach
  public void afterEach() {

  }

  @AfterAll
  public static void afterAll() {

  }

  // @Disabled("reason")
  @Test
  public void shouldAdd() {
    assertEquals(42, new Example().add(40, 2));
  }
}
