/*
Build:
  clang++ -std=c++20 coro.cc && ./a.out
*/

#include <experimental/coroutine>
#include <iostream>
#include <optional>

using namespace std;
using namespace std::experimental;

// NOTE: all calls are in the same thread

struct promise_type;
using handle_type = coroutine_handle<promise_type>;  // non-owning, trivial copyable

struct coroutine {   // owned by the caller 
  using promise_type = promise_type;

  explicit coroutine(handle_type&& handle) : handle_(std::exchange(handle, nullptr)) {
    cout << "coroutine(h&&)" << endl;
  }
  coroutine(coroutine&& other) : handle_(std::exchange(other.handle_, nullptr)) {
    cout << "coroutine(c&&)" << endl;
  }
  coroutine& operator=(coroutine&& other) { 
    cout << "coroutine=(c&&)" << endl;
    handle_ = std::exchange(other.handle_, nullptr); 
    return *this;
  }
  coroutine() = delete;
  coroutine(const coroutine&) = delete;
  coroutine& operator=(const coroutine&) = delete;

  ~coroutine() { 
    cout << "coroutine.dtor" << endl;
    if (!handle_.done()){
      cout << "coroutine.dtor: handle.destroy" << endl;
      handle_.destroy();
    }
  }

  handle_type handle_;
};

struct awaiter {   // controls a single enter/yield/return/leave await point
  bool await_ready() const noexcept { 
    cout << "awaiter.await_ready: " << ready_ << endl;
    return ready_;  // call suspend() if not ready
  }
  bool await_suspend(coroutine_handle<>) const noexcept {
    cout << "awaiter.await_suspend: " << suspend_ << endl;
    return suspend_; // magic switch to caller if suspend
  }
  void await_resume() const noexcept {
    cout << "awaiter.await_resume" << endl;
  }
  bool ready_ { false };
  bool suspend_ { false };
};

struct promise_type {   // owned by the coroutine state machine
  ~promise_type() {
    cout << "promise.dtor" << endl;
  }
  coroutine get_return_object() { 
    cout << "promise.get_return_object" << endl;
    return coroutine { handle_type::from_promise(*this) }; 
  }
  awaiter initial_suspend() noexcept { 
    cout << "promise.initial_suspend" << endl;
    return { .ready_ = false, .suspend_ = true };  // start suspended
  }
  awaiter yield_value(int value) noexcept { 
    cout << "promise.yield_value: " << value << endl;
    value_ = value;
    return { .ready_ = false, .suspend_ = true };   // suspend on yield
  }
  // void await_transform() = delete;  // disable co_await
  void unhandled_exception() { 
    cout << "promise.unhandled_exception" << endl;
    throw; 
  }
  void return_void() noexcept {
    cout << "promise.return_void" << endl;
  }
  awaiter final_suspend() noexcept { 
    cout << "promise.final_suspend" << endl;
    return { .ready_ = true, .suspend_ = false };  // don't suspend on leave
  }

  optional<int> value_;  // last yielded value
};

coroutine foo() {
  // promise = promise_type {}
  // coroutine (aka return object) = promise.get_return_object()
  //
  // co_await (awaiter = promise.initial_suspend())
  
  cout << "foo: enter" << endl;

  struct resource_type {  // some arbitrary resource managed in the coroutine
    ~resource_type() {
      cout << "resource.dtor" << endl;
    }
    int value() { return 42; }
  } resource;
  
  co_yield resource.value();
  // co_await (awaiter = promise.yield_value( 42 ))
  //    if (!awaiter.await_ready())
  //      if (awaiter.await_suspend(coroutine.handle_)) 
  //        ... compiler magic to switch to caller until coroutine.handle_.resume()
  //    awaiter.await_resume();
  //    


  // cout << "foo: co_return" << endl;
  // co_return;
    // resource.dtor
    // promise.return_void()
    // co_await (awaiter = promise.final_suspend())
    // promise.dtor

  cout << "foo: leave" << endl;

  // resource.dtor
  // promise.return_void()
  // co_await (awaiter = promise.final_suspend())
  // promise.dtor
}

ostream& operator<<(ostream& os, const optional<int>& value) { 
  return os << (value ? to_string(*value) : "(null)");
}

void test() {
  cout << "test: enter" << endl;
  coroutine fn = foo();  // create and suspend the coroutine function

  cout << "test: fn.handle.resume()" << endl;
  fn.handle_.resume();  // enter and run till first yield in the coroutine function

  cout << "test: fn.handle.promise.value: " 
       << fn.handle_.promise().value_ << endl;

  cout << "test: fn.handle.resume()" << endl;
  fn.handle_.resume();  // continue and leave the coroutine function
    // leaving the coroutine will destroy the handle automatically

  // cout << "test: fn.handle.destroy" << endl;
  // fn.handle_.destroy();   // explicit destroy of the handle
 
  cout << "test: leave" << endl;
}

int main() {
  cout << "main: enter" << endl;
  test();
  cout << "main: leave" << endl;
}
