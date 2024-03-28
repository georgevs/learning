/*
  Build and run:
    javac -d ./bin/ ./core-jdk/UserTest.java && java -cp ./bin/ UserTest
*/

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.util.Base64;
import java.util.List;
import java.util.Map;

public class UserTest {
  public static void main(String[] args) throws Exception {
    System.out.println(new User());
    System.out.println(new User("Alice", 42).clone());
    System.out.println(new User("Alice", 42, new User("Bob", 43)).clone());
    System.out.println(new User("Alice", 42, List.of(1, 2, 3)));
    System.out.println(new User("Alice", 42, Map.of("key1", 1, "key2", 2)));

    System.out.println(Base64.getEncoder().encodeToString(serialize(new User("Alice", 42))));
    System.out.println(
        deserialize(serialize(new User("Alice", 42, Map.of("key1", 1, "key2", 2)))));
  }

  private static byte[] serialize(Object x) throws IOException {
    var bos = new ByteArrayOutputStream();
    var oos = new ObjectOutputStream(bos);
    oos.writeObject(x);
    oos.flush();
    return bos.toByteArray();
  }

  private static Object deserialize(byte[] bytes) throws IOException, ClassNotFoundException {
    var ois = new ObjectInputStream(new ByteArrayInputStream(bytes));
    return ois.readObject();
  }
}

class User implements Cloneable, java.io.Serializable {
  private String name;
  private int age;
  private transient Object details;

  public User() {
    this(null, 0, null);
  }

  public User(String name, int age) {
    this(name, age, null);
  }

  public User(String name, int age, Object details) {
    this.name = name;
    this.age = age;
    this.details = details;
  }

  public String getName() {
    return name;
  }

  public void setName(String value) {
    name = value;
  }

  public int getAge() {
    return age;
  }

  public void setAge(int value) {
    age = value;
  }

  public Object getDetails() {
    return details;
  }

  public void setDetails(Object value) {
    details = value;
  }

  public String toString() {
    return String.format("User{%s %d %s}", name, age, details);
  }

  public Object clone() throws CloneNotSupportedException {
    var details = this.details;
    if (details != null) {
      try {
        details = details.getClass().getMethod("clone").invoke(details);
      } catch (NoSuchMethodException | IllegalAccessException | java.lang.reflect.InvocationTargetException e) {
        throw new CloneNotSupportedException();
      }
    }
    return new User(this.name, this.age, details);
  }
}
