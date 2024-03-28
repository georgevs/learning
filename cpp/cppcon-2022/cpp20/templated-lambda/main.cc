/*
  linux: 
    g++-10 -std=c++20 main.cc && ./a.out
    
  macOS:   clang does not supprt ranges yet
    brew search gcc
    brew info gcc
    brew install gcc

    g++-12 -std=c++20 main.cc && ./a.out
*/

#include <iostream>
#include <vector>

using namespace std;

namespace test_lambda {

void main() {
  cout << "test_lambda" << endl;

  auto fn = []<typename T>(const vector<T>& xs) {
    for (T i : xs) {
      cout << i << endl;
    }
  };

  fn(vector { 1, 2, 3 });
}

}  // namespace

int main() {
  test_lambda::main();
}
