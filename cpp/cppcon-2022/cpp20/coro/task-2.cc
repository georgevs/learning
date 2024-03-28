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

template <typename T>
struct task {
  struct promise_type;
  using handle_type = coroutine_handle<promise_type>;

  struct promise_type {
    auto get_return_object() { return task { handle_type::from_promise(*this) }; }
    auto initial_suspend() noexcept { return suspend_always {}; }
    // auto yield_value(T&& value) noexcept { value_ = value; return suspend_always {}; } 
    // void return_void() noexcept {}
    void return_value(T&& value) noexcept { value_ = value; }
    void unhandled_exception() { throw; }
    auto final_suspend() noexcept { return suspend_always {}; }
    optional<T> value_;
    optional<coroutine_handle<> > continuation_;
  };

  task(handle_type handle) : handle_(handle) {}
  ~task() { if (handle_ && !handle_.done()) handle_.destroy(); }

  task(task&& other) : handle_(std::exchange(other.handle_, nullptr)) {}
  task& operator=(task&& other) { handle_ = std::exchange(other.handle_, nullptr); return *this; }

  task() = delete;
  task(const task&) = delete;
  task& operator=(const task&) = delete;





  struct awaitable {
    bool await_ready() { return false; }
    auto await_suspend(coroutine_handle<> handle) {
      cout << "task<T>::awaitable.await_suspend" << endl;
      handle_.promise().continuation_ = handle;
      return handle_;  // continue with task<T>
    }
    void await_resume() { 
      cout << "task<T>::awaitable.await_resume" << endl;
      handle_.promise().continuation_->resume(); 
    }
    handle_type handle_;
  };

  awaitable operator co_await() {
    cout << "task<T>.co_await" << endl;
    return awaitable { handle_ };
  }




  handle_type handle_;
};


template <>
struct task<void> {
  struct promise_type;
  using handle_type = coroutine_handle<promise_type>;

  struct promise_type {
    auto get_return_object() { return task { handle_type::from_promise(*this) }; }
    auto initial_suspend() noexcept { return suspend_always {}; }
    // auto yield_value(T&& value) noexcept { value_ = value; return suspend_always {}; } 
    void return_void() noexcept {}
    // void return_value(T&& value) noexcept { value_ = value; }
    void unhandled_exception() { throw; }
    auto final_suspend() noexcept { return suspend_always {}; }
  };

  task(handle_type handle) : handle_(handle) {}
  ~task() { if (handle_ && !handle_.done()) handle_.destroy(); }

  task(task&& other) : handle_(std::exchange(other.handle_, nullptr)) {}
  task& operator=(task&& other) { handle_ = std::exchange(other.handle_, nullptr); return *this; }

  task() = delete;
  task(const task&) = delete;
  task& operator=(const task&) = delete;

  handle_type handle_;
};

task<int> goo() {
  cout << "goo" << endl;
  co_return 42;
}

task<void> foo() {
  cout << "foo" << endl;
  co_return;
}

void main() {
  cout << "main: test_task" << endl;
  auto t = goo();
  auto f = foo();

  t.handle_.resume();
  cout << "main: t: " << t.handle_.promise().value_ << endl;

  f.handle_.resume();
}

}  // namespace


int main() {
  test_task::main();
}
