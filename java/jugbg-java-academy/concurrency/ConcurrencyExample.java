/*
  Build and run:
    javac -d ./bin/ ConcurrencyExample.java && java -cp ./bin/ ConcurrencyExample
 */

import java.time.LocalDateTime;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import java.util.concurrent.TimeUnit;

public class ConcurrencyExample {
  public static void main(String[] args) throws InterruptedException, ExecutionException {
    // new ConcurrencyExample().testFact();
    new ConcurrencyExample().createPool(10);
  }

  public java.util.concurrent.ExecutorService createPool(int numThreads) {
    return java.util.concurrent.Executors.newFixedThreadPool(numThreads);
  }

  public void testFact() throws InterruptedException, ExecutionException {
    var pool = java.util.concurrent.Executors.newFixedThreadPool(16);
    int n = 20;
    System.out.println(fact1(n, pool).get());
    System.out.println(fact(n, pool).get());
    pool.shutdown();
  }

  public java.util.concurrent.Future<java.math.BigDecimal> fact(int n, java.util.concurrent.ExecutorService pool) {
    int m = 5;
    int k = (n + m - 1) / m;
    var rs = new java.util.ArrayList<java.util.concurrent.Future<java.math.BigDecimal>>(k);
    for (int i = 0; i < k; i++) {
      int l = i * m;
      int r = Math.min(l + m, n);
      rs.add(pool.submit(facti(l + 1, r)));
    }
    return pool.submit(() -> {
      java.math.BigDecimal val = new java.math.BigDecimal(1);
      for (var r : rs) {
        val = val.multiply(r.get());
      }
      return val;
    });
  }

  public static java.util.concurrent.Callable<java.math.BigDecimal> facti(final int b, final int e) {
    // System.out.println(String.format("facti: %d %d", b, e));
    return () -> {
      java.math.BigDecimal val = new java.math.BigDecimal(b);
      for (int i = b + 1; i <= e; ++i) {
        val = val.multiply(new java.math.BigDecimal(i));
      }
      return val;
    };
  }

  public java.util.concurrent.Future<java.math.BigDecimal> fact1(int n, java.util.concurrent.ExecutorService pool) {
    return pool.submit(() -> {
      var val = new java.math.BigDecimal(1);
      for (int i = 1; i <= n; ++i) {
        val = val.multiply(new java.math.BigDecimal(i));
      }
      return val;
    });
  }

  static void log(String line) {
    System.out.println(String.format("%s: %s - %s",
        LocalDateTime.now(), Thread.currentThread().getName(), line));
  }

  static void testFuture() throws InterruptedException, ExecutionException {
    final int numThreads = 3;
    var executor = Executors.newFixedThreadPool(numThreads);
    Future<Integer> f = executor.submit(() -> {
      try {
        Thread.sleep(3000);
      } catch (InterruptedException x) {
      }
      return 42;
    });

    log("shutdown");
    executor.shutdown();

    log("waiting...");
    log(String.format("f=%d", f.get()));

    log("done");
  }

  static void testExecutors() throws InterruptedException {
    final int numThreads = 3;
    var executor = Executors.newFixedThreadPool(numThreads);
    for (int i = 0; i < numThreads; i++) {
      executor.execute(new Runnable() {
        public void run() {
          try {
            Thread.sleep(3000);
          } catch (InterruptedException x) {
          }
          log("running...");
        }
      });
    }
    log("waiting...");
    Thread.sleep(1000);

    log("signal shutdown");
    executor.shutdown();

    log("waiting shutdown...");
    executor.awaitTermination(5000, TimeUnit.MILLISECONDS);

    log("done");
  }

  static void testThread() throws InterruptedException {
    var t = new Thread() {
      public void run() {
        System.out.println(String.format("%s: Hello world!", Thread.currentThread().getName()));
      }
    };
    var t2 = new Thread(new Runnable() {
      public void run() {
        System.out.println(String.format("%s: Hello world!", Thread.currentThread().getName()));
      }
    });
    t.start();
    t2.start();
    t.join();
    t2.join();
    // t.wait();
    // Thread.sleep(5000);
    System.out.println(String.format("%s: done", Thread.currentThread().getName()));
  }
}
