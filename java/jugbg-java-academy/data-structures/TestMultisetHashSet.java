import java.util.Arrays;
import java.util.Collections;
import java.util.Iterator;

public class TestMultisetHashSet {
  public static void main(String[] args) {
    new TestMultisetHashSet().testMultiset();
  }

  void testMultiset() {
    System.out.println(
      new Multiset<Integer>(Arrays.asList(1, 2, 3, 2, 4))
    );
    System.out.println(
      new Multiset<Integer>(Arrays.asList(1, 2, 3, 2, 4))
        .size()
    );
    System.out.println(
      new Multiset<Integer>(Arrays.asList(1, 2, 3, 2, 4))
        .contains(1)
    );
    System.out.println(
      new Multiset<Integer>(Arrays.asList(1, 2, 3, 2, 4))
        .contains(2)
    );
    System.out.println(
      new Multiset<Integer>(Arrays.asList(1, 2, 3, 2, 4))
        .contains(5)
    );
    System.out.println(
      new Multiset<Integer>(Arrays.asList(1, 2, 3, 2, 4))
        .equals(new Multiset<Integer>(Arrays.asList(1, 2, 3, 2, 4)))
    );
    System.out.println(
      new Multiset<Integer>(Arrays.asList(1, 2, 3, 2, 4))
        .equals(new Multiset<Integer>(Arrays.asList(1, 2, 3, 2, 4, 5)))
    );
    System.out.println(
      new Multiset<Integer>(Arrays.asList(1, 2, 3, 2, 4))
        .count(1)
    );
    System.out.println(
      new Multiset<Integer>(Arrays.asList(1, 2, 3, 2, 4))
        .count(2)
    );
    System.out.println(
      new Multiset<Integer>(Arrays.asList(1, 2, 3, 2, 4))
        .count(5)
    );
    System.out.println(
      MultisetUtils.toList(
        new Multiset<Integer>(Arrays.asList(1, 2, 3, 2, 4))
      )
    );
    System.out.println(
      MultisetUtils.min(
        new Multiset<Integer>(Arrays.asList(1, 2, 3, 2, 4))
      )
    );
    System.out.println(
      MultisetUtils.minWeighted(
        new Multiset<Integer>(Arrays.asList(1, 2, 3, 4, 1, 2, 3, 4, 1))
      )
    );
    System.out.println(
      MultisetUtils.sum(
        new Multiset<Integer>(Arrays.asList(1, 1, 2, 2, 3, 3))
      )
    );
    System.out.println(
      MultisetUtils.sumWeighted(
        new Multiset<Integer>(Arrays.asList(1, 1, 2, 2, 3, 3))
      )
    );
  }
}


class Multiset<E> implements java.util.Set<E> {

  private java.util.HashMap<E, Integer> map;

  public Multiset() { this.map = new java.util.HashMap<>(); }
  public Multiset(java.util.Collection<E> values) {
    this();
    values.forEach(value -> add(value));
  }
  
  public int size() { return map.size(); }
  public boolean isEmpty() { return map.isEmpty(); }
  public boolean contains(java.lang.Object value) { return map.containsKey(value); }
  public boolean add(E value) {
    map.put(value, map.getOrDefault(value, 0) + 1);
    return true; // always modified
  }

  public java.util.Iterator<E> iterator() { 
    return new java.util.LinkedList<E>() {{
      map.entrySet().forEach(e -> addAll(java.util.Collections.nCopies(e.getValue(), e.getKey())));
    }}.iterator();
  }
  
  public boolean equals(java.lang.Object other) { 
    return (other instanceof Multiset<?>) &&
            ((Multiset<?>)other).map.equals(map);
  }
  public int hashCode() { return map.hashCode(); }
  
  // new methods
  public long count(E value) { return map.getOrDefault(value, 0); }

  // not implemented
  public java.lang.Object[] toArray() { throw new java.lang.UnsupportedOperationException(); }
  public <T> T[] toArray(T[] arg0) { throw new java.lang.UnsupportedOperationException(); }
  public boolean remove(java.lang.Object arg0) { throw new java.lang.UnsupportedOperationException(); }
  public boolean containsAll(java.util.Collection<?> arg0) { throw new java.lang.UnsupportedOperationException(); }
  public boolean addAll(java.util.Collection<? extends E> arg0) { throw new java.lang.UnsupportedOperationException(); }
  public boolean retainAll(java.util.Collection<?> arg0) { throw new java.lang.UnsupportedOperationException(); }
  public boolean removeAll(java.util.Collection<?> arg0) { throw new java.lang.UnsupportedOperationException(); }
  public void clear() { throw new java.lang.UnsupportedOperationException(); }

  public String toString() { return String.format("Multiset(%s)", map); }
}

class MultisetUtils {
  public static int min(Multiset<Integer> values) {
    var result = Integer.MAX_VALUE;
    for (var value : values) {
      result = Math.min(result, value);
    }
    return result;
  }
  public static int minWeighted(Multiset<Integer> values) {
    var map = new java.util.HashMap<Integer, Integer>() {{
      values.forEach(value -> put(value, getOrDefault(value, 0) + 1));
    }};
    var minWeight = Integer.MAX_VALUE;
    Integer result = null;
    for (var e : map.entrySet()) {
      var weigth = e.getKey() * e.getValue();
      if (weigth < minWeight) {
        minWeight = weigth;
        result = e.getKey();
      }
    }
    return minWeight;
  }
  public static int sum(Multiset<Integer> values) {
    var map = new java.util.HashMap<Integer, Integer>() {{
      values.forEach(value -> put(value, getOrDefault(value, 0) + 1));
    }};
    var acc = 0;
    for (var value : map.keySet()) {
      acc += value;
    }
    return acc;
  }
  public static int sumWeighted(Multiset<Integer> values) {
    var map = new java.util.HashMap<Integer, Integer>() {{
      values.forEach(value -> put(value, getOrDefault(value, 0) + 1));
    }};
    var acc = 0;
    for (var e : map.entrySet()) {
      acc += e.getKey() * e.getValue();
    }
    return acc;
  }
  public static java.util.List<Integer> toList(Multiset<Integer> values) {
    return new java.util.ArrayList<>() {{
      values.forEach(value -> add(value));
      java.util.Collections.sort(this);
    }}; 
  }
}
