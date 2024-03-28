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
#include <thread>
#include <utility>

using namespace std;

namespace std {

template <typename T>
ostream& operator << (ostream& os, const optional<T>& value) {
  os << (value ? to_string(*value) : "(empty)");
  return os;
}

}  // namespace

namespace test_task {

struct task {
  struct promise_type;
  using handle_type = coroutine_handle<promise_type>;

  struct promise_type {
    ~promise_type() { cout << "promise dtor" << endl; }
    auto get_return_object() { return task { handle_type::from_promise(*this) }; }
    auto initial_suspend() noexcept { 
      cout << "promise: initial_suspend" << endl;
      return suspend_always {};
    }
    auto yield_value(int value) noexcept { 
      cout << "promise: yield_value" << endl;
      value_ = value; return suspend_always {}; 
    } 
    // void return_void() noexcept {}
    void return_value(int value) noexcept { cout << "promise: return_value" << endl; value_ = value + 100; }
    void unhandled_exception() { throw; }
    auto final_suspend() noexcept { cout << "promise: final suspend" << endl; return suspend_always {}; }
    optional<int> value_;
  };

  task(handle_type handle) : handle_(handle) {}
  ~task() {
    cout << "task dtor: enter" << endl;

    handle_type handle;
    if (handle_ && !handle_.done()) { cout << "task dtor: handle_.destroy" << endl; handle_.destroy();}
    else { cout << "task dtor" << endl; }
    cout << "task dtor: leave..." << endl;
  }

  task(task&& other) : handle_(std::exchange(other.handle_, nullptr)) {}
  task& operator=(task&& other) { handle_ = std::exchange(other.handle_, nullptr); return *this; }

  task() = delete;
  task(const task&) = delete;
  task& operator=(const task&) = delete;

  handle_type handle_;
};

task goo() {
  // co_yield 42;
  co_return 42;
}

void main() {
  cout << "main: test_task" << endl;
  task t = goo();

  // cout << "main: t: " << t() << endl;
  // cout << "main: t: " << t() << endl;


  cout << "main: t.resume" << endl;
  t.handle_.resume();
  cout << "main: t: " << t.handle_.promise().value_ << endl;

  // cout << "main: t.resume" << endl;
  // t.handle_.resume();

  // cout << "main: t.resume" << endl;
  // t.handle_.resume();
  
  cout << "main: leave..." << endl;
}

}  // namespace


int main() {
  test_task::main();
}
