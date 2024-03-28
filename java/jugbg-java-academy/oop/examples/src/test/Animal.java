package test;

public abstract class Animal {
  abstract public void makeSound(); 
}

class Dog extends Animal {
  @Override
  public void makeSound() { System.out.println("bark"); }
}

class Cat extends Animal {
  @Override
  public void makeSound() { System.out.println("myau"); }
}
