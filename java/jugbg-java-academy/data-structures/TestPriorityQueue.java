/*
  Build:
    javac -d ./bin/ TestPriorityQueue.java && java -cp ./bin/ TestPriorityQueue
*/

import java.util.List;
import java.util.PriorityQueue;
import java.util.stream.Collectors;

public class TestPriorityQueue {
  public static void main(String[] args) {
    var queue = new PriorityQueue<>(List.of(1, 3, 5, 7, 2, 4, 6, 8));

    System.out.println(
        queue.stream() // WARNING: the priority stream alone is NOT ordered!!!
            .sorted()
            .collect(Collectors.toList()));

    queue.forEach(System.out::println);

    for (var item : queue) {
      System.out.println(item);
    }

    while (!queue.isEmpty()) {
      System.out.println(queue.poll());
    }
  }
}
