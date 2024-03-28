package test;

import java.util.*;

public class MaxElement {
  static <T extends Comparable<T> > T findMax(Comparator<T> cmp, T... xs) {
    if (xs == null || xs.length == 0) { return null; }
    T r = xs[0];
    for (var i = 1; i < xs.length; ++i) {
      if (cmp.compare(r, xs[i]) < 0) r = xs[i];
    }
    return r;
  }

  static <T extends Comparable<T> > T findMax(T... xs) {
    return Collections.max(Arrays.asList(xs));
  }

  public static void main(String[] args) {
    System.out.println(findMax(1, 2, 3));
    System.out.println(findMax("ab", "ac", "abcd"));

    System.out.println(findMax(Comparator.naturalOrder(), 1, 2, 3));
    System.out.println(findMax(Comparator.reverseOrder(), "ab", "ac", "abcd"));
  }
}
