import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;

public class Test {
  public static void main(String[] args) {
    // new Test().testRemoveNegatives();
    // new Test().testFindSum();
    // new Test().testHashMap();
    new Test().testHashSet();
  }

  void testHashMap() {
    // var map = new HashMap<String, Integer>();
    System.out.println(
      new HashMap<>(Map.of(
        "one", 1,
        "two", 2,
        "three", 3
      )).values().stream().reduce(0, Integer::sum)
    );
  }

  void testHashSet() {
    var alice = new Person("Alice", "Henderson");
    var alice2 = new Person("Alice", "Henderson");
    var bob = new Person("Bob", "Sanders");
    // System.out.println(
    //   new HashSet<>(Arrays.asList(
    //     alice, alice2, bob
    //   ))
    // );

    var set = new HashSet<Person>();
    Arrays.asList(alice, alice2, bob).forEach(value -> {
      System.out.println(set.add(value));
    });
  }

  void testFindSum() {
    System.out.println(
      findSum(new int[] { 1, 2, 3, 4 }, 4)
    );
  }

  public int[] findSum(int[] numbers, int n) {
    for (int i = 0; i < numbers.length - 1; ++i) {
      for (int j = i + 1; j < numbers.length; ++j) {
        if (numbers[i] + numbers[j] == n) { return new int[] { numbers[i], numbers[j] }; }
      }
    }
    return new int[] {};
  }

  void testRemoveNegatives() {
    System.out.println(
      removeNegatives(Arrays.asList(new Integer[] { 1, 2, 3, 4 }))
    );
    System.out.println(
      removeNegatives(Arrays.asList(new Integer[] { 1, -10, 2, -20, 3, 4 }))
    );
    System.out.println(
      removeNegatives(Arrays.asList(new Integer[] { -1, -2, -3 }))
    );
  }

  public java.util.List<Integer> removeNegatives(java.util.List<Integer> numbers) {
    return numbers.stream()
      .filter(x -> x >= 0)
      // .toList();
      .collect(java.util.stream.Collectors.toList());
  }
}

class Person implements Comparable<Person> {
  String firstName, lastName;

  Person(String firstName, String lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
  public int compareTo(Person other) {
    int result;
    if ((result = this.firstName.compareTo(other.firstName)) == 0)
    if ((result = this.lastName.compareTo(other.lastName)) == 0);
    return result;
  }
  public int hashCode() {
    return 17*firstName.hashCode() + lastName.hashCode();
  }
  public boolean equals(Object other) {
    return (other instanceof Person) &&
           ((Person)other).firstName.equals(this.firstName) &&
           ((Person)other).lastName.equals(this.lastName);

  }
  public String toString() { return String.format("Person(%s %s)", firstName, lastName); }
}
