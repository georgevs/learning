import java.util.*;

public class UtilExample {
  public static void main(String[] args) {
    sets();
  }

  static void sets() {
    var s1 = new HashSet<Integer>();
    s1.add(1);
    s1.add(2);
    Collections.addAll(s1, 1, 2, 3);

    var s2 = new HashSet<Integer>() {
      {
        add(1);
        add(2);
      }
    };

    var s3 = new HashSet<Integer>(Arrays.asList(1, 2, 3));

    var s4 = Set.of(1, 2, 3); // java.util.ImmutableCollections$SetN

    Set s5 = Set.of(1, 2, 3); // java.util.ImmutableCollections$SetN
  }
}
