public class Example {
  public int add(int a, int b) {
    return a + b;
  }
  public int addMul10(Adder adder, int a, int b) {
    return adder.add(a, b) * 10;
  }
}
