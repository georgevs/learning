
import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;

import static org.mockito.Mockito.when;
import static org.mockito.Mockito.mock;
import static org.mockito.ArgumentMatchers.anyInt;


public class ExampleMockTest {
  @Test
  public void shouldAdd() {
    Adder adderMock = mock(Adder.class);
    when(adderMock.add(40, 2)).thenReturn(42);
    assertEquals(420, new Example().addMul10(adderMock, 40, 2));
  }

  @Test
  public void shouldAddPlusOne() {
    PlusOneAdder adderMock = mock(PlusOneAdder.class);
    when(adderMock.add(40, 2)).thenReturn(43);
    assertEquals(430, new Example().addMul10(adderMock, 40, 2));
  }

  @Test
  public void shouldAddAnswer() {
    Adder adderMock = mock(Adder.class);
    when(adderMock.add(anyInt(), anyInt())).thenAnswer(invocation -> {
      return (int)invocation.getArgument(0) + (int)invocation.getArgument(1) + 100;
    });
    assertEquals(1420, new Example().addMul10(adderMock, 40, 2));
  }
}
