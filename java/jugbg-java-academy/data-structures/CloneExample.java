import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

public class CloneExample {
  public static void main(String[] args) {
    System.out.println(
      people()
    );
    System.out.println(
      people().getClass()
    );

    System.out.println(
      people()
      .stream()
      .collect(Collectors.toList())
    );

    System.out.println(
      people()
      .stream()
      .map(Person::getFullName)
      .collect(Collectors.toList())
    );

    System.out.println(
      people()
      .stream()
      .collect(
        Collectors.mapping(
          Person::getFullName, 
          Collectors.toList()))
    );

    System.out.println(
      people()
      .stream()
      .map(Person::clone)
      .collect(Collectors.toList())
    );

    System.out.println(
      new ArrayList<>(people()).clone()  // still a shallow copy
    );
  }

  static List<Person> people() {
    return Arrays.asList(
      new Person("Alice Henderson"),
      new Person("Bob Dow"),
      new Person("Carol Lingren"),
      new Person("Dave Cox")
    );
  }
}

class Person implements Cloneable {
  private final String firstName, lastName;
  public Person(String fullName) {
    var names = fullName.split(" ");
    this.firstName = names[0];
    this.lastName = names[1];
  }
  String getFirstName() { return firstName; }
  String getLastName() { return lastName; }
  String getFullName() { return String.format("%s %s", firstName, lastName); }
  
  public String toString() {
    return String.format("Person(%s)", getFullName());
  }
  public Object clone() {
    // System.out.println(String.format("copying %s...", this));
    return new Person(getFullName());
  }
}