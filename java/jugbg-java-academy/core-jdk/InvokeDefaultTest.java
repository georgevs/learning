/*
  Build and run:
    javac -d ./bin/ ./core-jdk/InvokeDefaultTest.java && java -cp ./bin/ InvokeDefaultTest
*/

import java.lang.reflect.Method;

public class InvokeDefaultTest {
  public static void main(String[] args) {
    invokeDefault(new Target(), "method");
    invokeDefault(new Target(), "missing");
  }

  public static void invokeDefault(Object object, String methodName) {
    var clazz = object.getClass();
    java.lang.reflect.Method method;
    try {
      method = clazz.getDeclaredMethod(methodName);
    } catch (NoSuchMethodException e) {
      if (!"defaultMethod".equals(methodName)) {
        invokeDefault(object, "defaultMethod");
      }
      return;
    }
    try {
      method.invoke(object);
    } catch (Exception e) {
      // absorb exception
    }
  }
}

class Target {
  void method() {
    System.out.println("Test::method");
  }

  void defaultMethod() {
    System.out.println("Test::defaultMethod");
  }

}