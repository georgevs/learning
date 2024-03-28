
import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;

import static org.mockito.Mockito.spy;
import static org.mockito.Mockito.doReturn;


public class ExampleSpyTest {
  @Test
  public void shouldAdd() {
    Adder adderSpy = spy(new PlusOneAdder());
    doReturn(42).when(adderSpy).add(40, 2);
    assertEquals(420, new Example().addMul10(adderSpy, 40, 2));
  }
}
