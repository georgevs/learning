/*
  Build and run:
    javac -d ./bin/ ./core-jdk/Test2.java && java -cp ./bin/ Test2
*/

import java.io.IOException;
import java.util.function.BiFunction;
import java.lang.RuntimeException;

public class Test2 {

  static int sum(int x, int y) throws IOException {
    // validations on x and y ...
    return x + y;
  }

  public static void main(String[] args) throws IOException {
    BiFunction<Integer, Integer, Integer> f = (t, u) -> {
      try {
        return sum(t, u);
      } catch (IOException e) {
        throw new RuntimeException(e);
      } finally {
        throw new RuntimeException();
      }
    };
    System.out.println(f.apply(10, 20));
  }
}
