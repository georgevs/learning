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
#include <memory>
#include <optional>
#include <thread>
#include <utility>
#include <deque>

using namespace std;

namespace std {

template <typename T>
ostream& operator << (ostream& os, const optional<T>& value) {
  if (value) os << *value;
  else os << "(empty)";
  return os;
}

template <typename T>
ostream& operator << (ostream& os, const shared_ptr<T>& value) {
  if (value) os << *value;
  else os << "(null)";
  return os;
}

}  // namespace

namespace test_task {


deque<coroutine_handle<> > queue_;

template <typename T>
struct task {
  struct promise_type;
  using handle_type = coroutine_handle<promise_type>;

  struct promise_type {
    ~promise_type() { cout << "promise.dtor" << endl; }
    auto get_return_object() { return task { handle_type::from_promise(*this) }; }
    auto initial_suspend() noexcept { return suspend_always {}; }
    // auto yield_value(T&& value) noexcept { value_ = value; return suspend_always {}; } 
    // void return_void() noexcept {}
    void return_value(T value) noexcept { value_ = value; }
    void unhandled_exception() { throw; }


    struct suspend {
      bool suspend_;
      bool await_ready() noexcept { return false; }
      bool await_suspend(coroutine_handle<>) noexcept { return suspend_; }
      void await_resume() noexcept {}
    };
    auto final_suspend() noexcept { 
      cout << "final_suspend: leaving..." << endl;
      
      // if (continuation_) continuation_->resume();
      if (continuation_) {
        continuation_->promise().value_ = value_;
        queue_.push_back(*continuation_);
        return suspend { false };
      }  // continue with task<T>
      
      return suspend { true };
    }
    optional<T> value_;
    optional<handle_type> continuation_;
  };

  task(handle_type handle) : handle_(handle) {}
  ~task() { 
    if (handle_ && !handle_.done()) { cout << "task.dtor: h.destroy" << endl; handle_.destroy(); }
    else cout << "task.dtor" << endl;
  }

  task(task&& other) : handle_(std::exchange(other.handle_, nullptr)) {}
  task& operator=(task&& other) { handle_ = std::exchange(other.handle_, nullptr); return *this; }

  task() = delete;
  task(const task&) = delete;
  task& operator=(const task&) = delete;





  struct awaitable {
    explicit awaitable(handle_type handle) : handle_(handle) {}
    bool await_ready() { return false; }
    void await_suspend(coroutine_handle<> handle) {
      cout << "task<T>::awaitable.await_suspend" << endl;
      continuation_ = handle_type::from_address(handle.address());
      handle_.promise().continuation_ = continuation_;
      queue_.push_back(handle_);  // continue with task<T>
    }
    auto await_resume() { 
      cout << "task<T>::awaitable.await_resume" << endl;
      return *continuation_.promise().value_;
    }
    handle_type handle_;
    handle_type continuation_;
  };

  awaitable operator co_await() {
    cout << "task<T>.co_await" << endl;
    return awaitable { handle_ };
  }


  handle_type handle_;
  shared_ptr<T> value_;
};


task<int> goo(int value) {
  cout << "goo" << endl;
  co_return value;
  cout << "goo: leave..." << endl;
}

task<int> foo() {
  cout << "foo" << endl;
  auto x = co_await goo(10);
  auto y = co_await goo(20);
  co_return x + y;
  cout << "foo: leave..." << endl;
}

void main() {
  cout << "main: test_task" << endl;
  auto f = foo();

  // while (!f.handle_.done()) {
  //   cout << "main: f.resume" << endl;
  //   f.handle_.resume();
  // }

  queue_.push_back(f.handle_);

  while (!queue_.empty()) {
    auto handle = queue_.back();
    queue_.pop_back();
    cout << "main: handle resume" << endl;
    if (!handle.done()) handle.resume();
  }

  cout << "main: f: " << f.handle_.promise().value_ << endl;

  cout << "main: leave..." << endl;
}

}  // namespace


int main() {
  test_task::main();
}
