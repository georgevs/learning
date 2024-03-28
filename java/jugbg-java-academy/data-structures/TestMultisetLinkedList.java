import java.util.Arrays;

public class TestMultisetLinkedList {
  public static void main(String[] args) {
    new TestMultisetLinkedList().testMultiset();
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

  private java.util.LinkedList<E> list;

  public Multiset() { this.list = new java.util.LinkedList<E>(); }
  public Multiset(java.util.Collection<E> values) {
    this();
    values.forEach(value -> add(value));
  }
  
  public int size() { return new java.util.HashSet<>(list).size(); }
  public boolean isEmpty() { return list.isEmpty(); }
  public boolean contains(java.lang.Object value) { return list.indexOf(value) != -1; }
  public boolean add(E value) {
    var pos = list.indexOf(value);
    list.add(pos + 1, value);
    return true;  // multiset was altered
  }

  public java.util.Iterator<E> iterator() { return list.iterator(); }
  
  public boolean equals(java.lang.Object other) { 
    return (other instanceof Multiset<?>) &&
            ((Multiset<?>)other).list.equals(list);
  }
  public int hashCode() { return list.hashCode(); }
  
  // new methods
  public long count(E value) { return list.stream().filter(x -> x.equals(value)).count(); }

  // not implemented
  public java.lang.Object[] toArray() { throw new java.lang.UnsupportedOperationException(); }
  public <T> T[] toArray(T[] arg0) { throw new java.lang.UnsupportedOperationException(); }
  public boolean remove(java.lang.Object arg0) { throw new java.lang.UnsupportedOperationException(); }
  public boolean containsAll(java.util.Collection<?> arg0) { throw new java.lang.UnsupportedOperationException(); }
  public boolean addAll(java.util.Collection<? extends E> arg0) { throw new java.lang.UnsupportedOperationException(); }
  public boolean retainAll(java.util.Collection<?> arg0) { throw new java.lang.UnsupportedOperationException(); }
  public boolean removeAll(java.util.Collection<?> arg0) { throw new java.lang.UnsupportedOperationException(); }
  public void clear() { throw new java.lang.UnsupportedOperationException(); }

  public String toString() { return String.format("Multiset(%s)", list); }
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
    return result;
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
