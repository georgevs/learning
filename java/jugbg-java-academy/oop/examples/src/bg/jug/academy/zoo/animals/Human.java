package bg.jug.academy.zoo.animals;

public class Human extends AbstractAnimal {
  @Override
  public void talk() {   // behave like an animal
    System.out.println("Grrrr!");
  }

  public void greet() {
    System.out.println("Hello world!");
  } 
}
