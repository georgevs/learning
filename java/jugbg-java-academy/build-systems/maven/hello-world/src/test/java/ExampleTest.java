import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class ExampleTest {
  @Test
  public void testBasic() {
    assertEquals(42, new Example().add(40, 2));
  }
}
