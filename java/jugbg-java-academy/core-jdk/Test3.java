/*
  Build and run:
    javac -d ./bin/ ./core-jdk/Test3.java && java -cp ./bin/ Test3
*/

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

public class Test3 {

  public static void main(String[] args) throws IOException {
    testNumbers();
  }
  
  public static void testNumbers() {
    System.out.println(
      numbers(List.of("1", "-1", "", "nan"))
      .boxed()
      .collect(Collectors.toList()));
  }

  public static java.util.stream.IntStream numbers(java.util.List<String> items) {
    return items.stream()
        .flatMapToInt((s) -> {
          try {
            return java.util.stream.IntStream.of(Integer.parseInt(s));
          } catch (RuntimeException e) {
            return java.util.stream.IntStream.empty();
          }
        });
  }
}
