import java.util.function.Predicate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.function.BiConsumer;
import java.util.function.Supplier;
import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

interface Fooable {
    void foo(int x);
}

interface Mooable {
    void moo(int y);
}

public class LambdaExample {

    public static void main(String[] args) {
        // int[] xs = { 1, 2, 3 };
        var xs = new int[] { 1, 2, 3 };
        LambdaExample.processData(xs, x -> x % 2 == 0);
        Arrays.stream(xs)
            .filter(x -> x % 2 == 0)
            .forEach(x -> System.out.println(x));


        new Whatever().foo(42);
        LambdaExample.foo(new Whatever(), 43);
        LambdaExample.foo(x -> System.out.println(String.format("Lambda %d", x)), 44);
        LambdaExample.foo(x -> new Whatever().foo(x), 45);
        LambdaExample.foo(new Whatever()::foo, 46);
        LambdaExample.foo(x -> Whatever.goo(x), 47);
        LambdaExample.foo(Whatever::goo, 48);
        LambdaExample.moo(Whatever::moo, new Whatever(49), 50);


        {
            Collection<Integer> coll = new ArrayList<>();
            coll.add(1);
            coll.add(2);
            coll.add(3);
            Set<Integer> dest = LambdaExample.transferElements(
                coll, 
                () -> { return new HashSet<Integer>(); }
            );
            System.out.println(dest);
        }

        System.out.println(LambdaExample.transferElements(Arrays.asList(10, 20, 30), HashSet::new));
    }

    static <T, Source extends Collection<T>, Dest extends Collection<T> > 
    Dest transferElements(Source coll, Supplier<Dest> factory) {
        Dest dest = factory.get();
        for (T x : coll) {
            dest.add(x);
        }
        return dest;
    }

    static void processData(int[] xs, Predicate<Integer> tester) {
        for (int x : xs) {
            if (tester.test(x)) {
                System.out.println(x);
            }
        }
    }

    static class Whatever implements Fooable, Mooable {
        int x;
        Whatever() { this(0); }
        Whatever(int x) { this.x = x; }
        public void foo(int x) {
            System.out.println(String.format("Whatever foo %d", x));
        }
        static void goo(int x) {
            System.out.println(String.format("Whatever goo %d", x));
        }
        public void moo(int y) {
            System.out.println(String.format("Whatever moo %d %d", this.x, y));
        }
    }

    static void foo(Fooable fooable, int x) {
        fooable.foo(x);
    }
    static void moo(BiConsumer<Whatever, Integer> mooable, Whatever w, int y) {
        mooable.accept(w, y);
    }
}
