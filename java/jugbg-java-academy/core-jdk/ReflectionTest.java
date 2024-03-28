/*
  Build and run:
    javac -d ./bin/ ./core-jdk/ReflectionTest.java && java -cp ./bin/ ReflectionTest
*/

import java.lang.reflect.Modifier;

public class ReflectionTest {
  public static void main(String[] args) {
    System.out.println(
        numberOfInstanceFields(new Base()));
    System.out.println(
        numberOfInstanceFields(new Derived()));
  }

  public static int numberOfInstanceFields(Object object) {
    var result = 0;
    for (var clazz = object.getClass(); clazz != null; clazz = clazz.getSuperclass()) {
      for (var field : clazz.getDeclaredFields()) {
        if (!java.lang.reflect.Modifier.isStatic(field.getModifiers())) {
          ++result;
        }
      }
    }
    return result;
  }
}

class Base {
  public String b1;
  private String b2;
  private static String b3 = "b3";

  public String toString() {
    return String.format("Base{%s %s %s}", b1, b2, b3);
  }
}

class Derived extends Base {
  public String d1;
  private String d2;
  private static String d3 = "d3";

  public String toString() {
    return String.format("Derived{%s %s %s}", d1, d2, d3);
  }
}
