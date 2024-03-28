package com.example.app;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

import com.example.model.MyModel;
import com.example.util.MyUtil;

@Configuration
@PropertySource("classpath:com/example/app/default.properties")
class HelloWorldConfig {
  @Bean
  MyUtil util(@Value("${util.name}") String name) {
    return new MyUtil(name);
  }

  @Bean
  MyModel model(MyUtil util) {
    return new MyModel(util);
  }
}
