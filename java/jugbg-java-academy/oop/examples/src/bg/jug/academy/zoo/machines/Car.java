package bg.jug.academy.zoo.machines;

public class Car extends AbstractMachine {
  @Override
  public void operate() {
    System.out.println("Wrooom!");
  }
}
