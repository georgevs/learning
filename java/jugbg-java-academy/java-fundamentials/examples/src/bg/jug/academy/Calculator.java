package bg.jug.academy;

import java.util.Arrays;
import java.util.function.BinaryOperator;
import java.util.Map;

class Calculator {
  public static void main(String[] args) {
    if (args.length < 2) { throw new RuntimeException("Not enough arguments"); }

    var op = args[0];
    var xs = Arrays.copyOfRange(args, 1, args.length);
    System.out.println(Calculator.sum(op, xs));
  }

  private static Map<String, BinaryOperator<Integer> > OPS = Map.of(
    "+", Integer::sum,
    "*", (acc, x) -> acc * x
  );

  public static int sum(String op, String[] xs) {
    var fn = OPS.get(op);
    if (fn == null) { throw new RuntimeException("Unsuported operation"); }

    return Arrays.asList(xs)
      .stream()
      .map(Integer::parseInt)
      .reduce(fn)
      .orElseThrow();
  }
}
