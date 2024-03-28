/*
  Build and run:
    javac -d ./bin/ ./core-jdk/FibTest.java && java -cp ./bin/ FibTest
*/

import java.math.BigInteger;
import java.util.function.Supplier;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class FibTest {
  public static void main(String[] args) {
    System.out.println(
        fib().limit(10)
            .mapToInt(n -> n.getCurrent().intValue())
            .boxed()
            .collect(Collectors.toList()));

    System.out.println(
        fib().findFirst().get().getCurrent());

    System.out.println(
        fib().iterator().next().getCurrent());
  }

  public static java.util.stream.Stream<FibNumber> fib() {
    return java.util.stream.Stream.generate(new java.util.function.Supplier<FibNumber>() {
      FibNumber next = new FibNumber(
          java.math.BigInteger.valueOf(0),
          java.math.BigInteger.valueOf(1));

      @Override
      public FibNumber get() {
        FibNumber result = next;
        next = new FibNumber(
            result.getCurrent(),
            result.getPrevious().add(result.getCurrent()));
        return result;
      }
    });
  }

  static class FibNumber {
    public FibNumber(java.math.BigInteger previous, java.math.BigInteger current) {
      this.previous = previous;
      this.current = current;
    }

    private java.math.BigInteger previous;
    private java.math.BigInteger current;

    public java.math.BigInteger getPrevious() {
      return previous;
    }

    public java.math.BigInteger getCurrent() {
      return current;
    }
  }
}
