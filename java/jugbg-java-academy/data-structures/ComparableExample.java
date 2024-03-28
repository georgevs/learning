import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;

public class ComparableExample {
  public static void main(String[] args) {
    new ComparableExample().test();
  }

  void test() {
    var names = Arrays.asList(names());
    Collections.sort(names, Name.LAST_NAME);
    System.out.println(names);
    Collections.sort(names, Name.FIRST_NAME);
    System.out.println(names);
  }

  Name[] names() {
    return new Name[] {
      new Name("Alice", "Henderson"),
      new Name("Bob", "Dow"),
      new Name("Carol", "Luis"),
      new Name("Dave", "Cox"),
    };
  }
}

class Name implements Comparable<Name> {
  private final String firstName, lastName;

  public Name(String firstName, String lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  public String toString() { return String.format("Name(%s,%s)", firstName, lastName); }

  public int hashCode() { return 31*firstName.hashCode() + lastName.hashCode(); }

  public boolean equals(Object other) { 
    if (!(other instanceof Name)) return false;
    return ((Name)other).firstName.equals(firstName) && 
           ((Name)other).lastName.equals(lastName);
  }

  public int compareTo(Name other) {
    return FIRST_NAME.compare(this, other);
  }

  static final Comparator<Name> FIRST_NAME = new Comparator<Name>() {
    public int compare(Name lhs, Name rhs) {
        int result;
        if ((result = lhs.firstName.compareTo(rhs.firstName)) == 0)
             result = lhs.lastName.compareTo(rhs.lastName);
        return result;
    }
  };

  static final Comparator<Name> LAST_NAME = new Comparator<Name>() {
    public int compare(Name lhs, Name rhs) {
        int result;
        if ((result = lhs.lastName.compareTo(rhs.lastName)) == 0)
             result = lhs.firstName.compareTo(rhs.firstName);
        return result;
    }
  };
}

