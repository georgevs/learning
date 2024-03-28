public class CollectionUtilsTest {
  @org.junit.jupiter.api.Test
  public void shouldReturnFalseIfNotPresent() {
    org.junit.jupiter.api.Assertions.assertFalse(
      CollectionUtils.search(java.util.List.of(1,2,3), 10)
    );
  }

  @org.junit.jupiter.api.Test
  public void shouldReturnTrueIfPresent() {
    org.junit.jupiter.api.Assertions.assertTrue(
      CollectionUtils.search(java.util.List.of(1,2,3), 1)
    );
  }

  @org.junit.jupiter.api.Test
  public void shouldThrowRuntimeExceptionIfListIsNull() {
    org.junit.jupiter.api.Assertions.assertThrows(
      RuntimeException.class,
      () -> { CollectionUtils.search(null, 1); }
    );
  }

  @org.junit.jupiter.api.Test
  public void shouldThrowRuntimeExceptionIfNumberIsNull() {
    org.junit.jupiter.api.Assertions.assertThrows(
      RuntimeException.class,
      () -> { CollectionUtils.search(java.util.List.of(1,2,3), null); }
    );
  }
}
