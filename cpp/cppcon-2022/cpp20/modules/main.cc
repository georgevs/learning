
/*
  rm -rf *.o
  rm -rf *.pcm
  rm -rf *.out
  clang++ -fmodules-ts -Xclang -emit-module-interface -c mathlib.cc -o mathlib.pcm
  clang++ -fmodules-ts -fprebuilt-module-path=. -c main.cc
  clang++ -fmodules-ts main.o mathlib.pcm && ./a.out
*/
#include <iostream>

import mathlib;

int main() { 
  std::cout << "main: " << add(10, 20) << std::endl;
}
