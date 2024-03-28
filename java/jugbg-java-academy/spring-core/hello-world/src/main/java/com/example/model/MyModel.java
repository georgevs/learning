
package com.example.model;

import com.example.util.MyUtil;

public class MyModel {
  private MyUtil util;

  public MyModel(MyUtil util) {
    this.util = util;
  }

  public void greet(String name) {
    this.util.greet(name);
  }
}
