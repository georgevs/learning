package com.example.util;

public class MyUtil {
  private String name;

  public MyUtil(String name) {
    this.name = name;
  }

  public void greet(String name) {
    System.out.println(String.format("Hello %s! My name is %s.", name, this.name));
  }
}
