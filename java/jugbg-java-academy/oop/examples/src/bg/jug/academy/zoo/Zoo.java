package bg.jug.academy.zoo;

import bg.jug.academy.zoo.animals.*;
import bg.jug.academy.zoo.machines.*;

public class Zoo {
  public static void main(String[] args) {
    Zoo.listen(new Dog());
    Zoo.listen(new Cow());
    Zoo.listen(new Human());

    Zoo.listen(new Car());

    Zoo.listen(new Machine() {   // ad-hock machine
      @Override
      public void operate() {
        System.out.println("Buzzz!");   // very special custom noise
      }
    });
  }
  
  private static void listen(final Animal a) {  // overload for animals
    a.talk();
  }

  private static void listen(final Human h) {  // overload for humans (a specific animal)
    h.greet();  // special treating of humans
  }

  private static void listen(final Machine m) {  // overload for machines
    m.operate();
  }
}
