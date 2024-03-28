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
#include <atomic>
#include <memory>

using namespace std;

namespace test_atomic_smart_ptr {

void main() {
  cout << "test_atomic_smart_ptr" << endl;
  atomic<shared_ptr<int> > api;
  
  // initialize...
  {
    api.store(make_shared<int>(42));
  }

  // use...
  {
    auto pi = api.load();
    auto i = *pi;
    cout << i << endl;
  }

  // update...
  {
    auto pi = api.load();  // the old value
    auto pj = make_shared<int>(43);
    while (!api.compare_exchange_weak(pi, pj)) {}
  }

  // use...
  {
    auto pi = api.load();
    auto i = *pi;
    cout << i << endl;
  }
}

}  // namespace

int main() {
  test_atomic_smart_ptr::main();
}
