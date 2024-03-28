/*
  linux: 
    g++-10 -std=c++20 main.cc && ./a.out
    
  macOS:   clang does not supprt ranges yet
    brew search gcc
    brew info gcc
    brew install gcc

    g++-12 -std=c++20 main.cc && ./a.out
*/

#include <concepts>
#include <iostream>

using namespace std;

namespace test_concepts {

template <typename T>
concept Incrementable = requires(T x) { 
  { ++x } -> convertible_to<T>;
  { x++ } -> convertible_to<T>;
};

template <Incrementable T> T foo1(T& x) { return ++x; }
template <typename T> requires Incrementable<T> T foo2(T& x) { return ++x; }
template <typename T> T foo3(T& x) requires Incrementable<T> { return ++x; }
auto foo4(Incrementable auto& x) { return ++x; }

void main() {
  cout << "test_concepts" << endl;
  int x = 0;
  cout << x << "," << foo1(x) << endl
       << x << "," << foo2(x) << endl
       << x << "," << foo3(x) << endl
       << x << "," << foo4(x) << endl
       ;  
}

}  // namespace

int main() {
  test_concepts::main();
}
