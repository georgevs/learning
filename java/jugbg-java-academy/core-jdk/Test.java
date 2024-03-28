/*
  Build and run:
    javac -d ./bin/ ./core-jdk/Test.java && java -cp ./bin/ Test
*/

import java.util.stream.Stream;

public class Test {

  static int x;
  static {
    x = 10;
    int result = Stream.of(10, 20, 30, 40).map((y) -> {
      x += y;
      return x;
    }).reduce(x, (a, b) -> {
      return a + b;
    });
    System.out.println(result);
  }

  public static void main(String[] args) {

  }
}
