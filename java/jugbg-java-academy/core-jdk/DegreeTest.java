/*
  Build and run:
    javac -d ./bin/ ./core-jdk/DegreeTest.java && java -cp ./bin/ DegreeTest
*/


public class DegreeTest {
  public static void main(String[] args) {

    System.out.println(degree(2).apply(1));
    System.out.println(degree(2).apply(2));
    System.out.println(degree(2).apply(3));
  }

  public static java.util.function.Function<Integer, java.math.BigInteger> degree(int n) {
    return x -> java.math.BigInteger.valueOf(x).pow(n);
  }
}
