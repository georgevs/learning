package com.example.app;

import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import com.example.model.MyModel;

public class HelloWorld {
  public static void main(String[] args) {
    try (var ctx = new AnnotationConfigApplicationContext(HelloWorldConfig.class)) {
      var model = (MyModel) ctx.getBean("model");
      var env = ctx.getEnvironment();
      model.greet(env.getProperty("name"));
    }
  }
}
