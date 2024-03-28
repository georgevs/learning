/*
  linux: 
    g++-10 -std=c++20 main.cc && ./a.out
    
  macOS:   clang does not supprt ranges yet
    brew search gcc
    brew info gcc
    brew install gcc

    g++-12 -std=c++20 main.cc && ./a.out
*/

#include <algorithm>
#include <iostream>
#include <span>
#include <vector>

using namespace std;

namespace test_span {

void main() {
  cout << "test-span" << endl;
  int data[] = { 1, 2, 3 };
  span s { data };
  for (int i : s) {
    cout << i << endl;
  }
}

}  // namespace


namespace test_ranges {

void main() {
  cout << "test-ranges" << endl;
  vector data { 1, 2, 3 };
  ranges::sort(data);
  for (auto i : data) {
    cout << i << endl;
  }
}


}  // namespace


int main() {
  test_span::main();
  test_ranges::main();
}
