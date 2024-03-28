/*
  Build and run:
    javac -d ./bin/ ./core-jdk/MatrixSum.java && java -cp ./bin/ MatrixSum
*/

public class MatrixSum {
  public static void main(String[] args) {
    System.out.println(matrixSum());
  }

  public static long matrixSum() {
    try (var scanner = new java.util.Scanner(System.in)) {
      var result = 0l;
      for (int y = 0; y < 4; ++y) {
        for (int x = 0; x < 4; ++x) {
          result += scanner.nextInt();
        }
      }
      return result;
    }
  }
}
