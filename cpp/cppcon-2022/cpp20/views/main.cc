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
#include <ranges>
#include <vector>
#include <string>

using namespace std;

namespace test_views {

void main() { 
  cout << "test_views" << endl;
  vector data { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 }; 
  auto result { data 
    | views::filter([](const auto& value) { return value % 2 == 0; })
    | views::transform([](const auto& value) { return value * 2; })
    | views::drop(2)
    | views::reverse
    | views::transform([](int i) { return to_string(i); })
  };
  for (auto x : result) {
    cout << x << endl;
  }
}

}  // namespace

int main() {
  test_views::main();
}
