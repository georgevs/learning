/*
  linux: 
    g++-10 -std=c++20 main.cc && ./a.out
    
  macOS:   clang does not supprt ranges yet
    brew search gcc
    brew info gcc
    brew install gcc

    g++-12 -std=c++20 main.cc && ./a.out
*/

#include <coroutine>
#include <iostream>
#include <iterator>
#include <optional>
#include <utility>

using namespace std;

namespace test_coroutines {

struct generator {
  struct promise_type;
  using handle_type = coroutine_handle<promise_type>;

  struct promise_type {
    generator get_return_object() { return generator { handle_type::from_promise(*this) }; }
    suspend_always initial_suspend() noexcept { return {}; }
    suspend_always yield_value(int value) noexcept { value_ = value; return {}; } 
    void return_void() noexcept {}
    void unhandled_exception() { throw; }
    suspend_always final_suspend() noexcept { return {}; }
    optional<int> value_;
  };

  generator(handle_type handle) : handle_(handle) {}
  ~generator() { if (!handle_.done()) handle_.destroy(); }

  generator(generator&& other) : handle_(std::exchange(other.handle_, nullptr)) {}
  generator& operator=(generator&& other) { handle_ = std::exchange(other.handle_, nullptr); return *this; }

  generator() = delete;
  generator(const generator&) = delete;
  generator& operator=(const generator&) = delete;

  struct iterator {
    int operator*() { return *handle_.promise().value_; }
    void operator++() { handle_.resume(); }
    bool operator==(default_sentinel_t) { return handle_.done(); }
    handle_type handle_;
  };

  iterator begin() { handle_.resume(); return iterator { handle_ }; }
  default_sentinel_t end() { return {}; }

  handle_type handle_;
};

generator range(int begin, int end) {
  for (int i = begin; i < end; ++i) {
    co_yield i;
  }
}

void main() {
  cout << "test_coroutines" << endl;
  for (int i : range(5, 10)) {
    cout << i << endl;
  }
}

}  // namespace

int main() {
  test_coroutines::main();
}
