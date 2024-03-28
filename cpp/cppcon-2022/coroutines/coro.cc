/*
Build:
  clang++ -std=c++20 coro.cc && ./a.out
*/

#include <experimental/coroutine>
#include <iostream>
#include <optional>

using namespace std;
using namespace std::experimental;

// all calls are in the same thread

struct coroutine {   // owned by the caller 
  struct promise_type;
  using handle_type = coroutine_handle<promise_type>;  // non-owning, trivial copyable

  struct promise_type {   // owned by the coroutine state machine
    coroutine get_return_object() { return coroutine { handle_type::from_promise(*this) }; }
    suspend_never initial_suspend() noexcept { return {}; }  // don't suspend on start

    auto await_transform(int) {
      struct input_awaiter {   // suspend until resumed
        bool await_ready() { return false; }
        bool await_suspend(handle_type handle) {
          cout << "input_awaiter: suspend" << endl; 
          handle_ = handle;
          return true;  // suspend
        }
        int await_resume() { 
          cout << "input_awaiter: resume: input: " << *handle_.promise().input_ << endl; 
          return *handle_.promise().input_;
        }
        handle_type handle_;
      };
      return input_awaiter { };
    }

    auto yield_value(int value) noexcept {
      struct output_awaiter {   // yield output value and continue
        bool await_ready() { return false; }
        bool await_suspend(handle_type handle) {
          handle.promise().output_ = value_;
          cout << "output_awaiter: suspend: output: " << *handle.promise().output_ << endl; 
          return false;  // don't suspend
        }
        void await_resume() {
          cout << "output_awaiter: resume" << endl;
        }
        int value_;
      };
      return output_awaiter { value };
    }

    void unhandled_exception() { throw; }  // rethrow exceptions
    void return_void() noexcept { cout << "promise.return_void" << endl; }  // noop on co_return
    suspend_always final_suspend() noexcept { cout << "promise.final_suspend" << endl; return {}; } // suspend at leave

    ~promise_type() { cout << "promise.dtor" << endl; }
    optional<int> input_;  // last awaited value
    optional<int> output_;  // last yielded value
  };

  explicit coroutine(handle_type handle) : handle_(handle) {}
  coroutine(coroutine&& other) : handle_(std::exchange(other.handle_, nullptr)) {}
  coroutine& operator=(coroutine&& other) { handle_ = std::exchange(other.handle_, nullptr); return *this; }
  ~coroutine() { 
    if (!handle_.done()) { cout << "coroutine.dtor: handle.destroy" << endl; handle_.destroy(); }
    else { cout << "coroutine.dtor: handle is DONE" << endl; }
  }

  // disable default, copy, assign
  coroutine() = delete;
  coroutine(const coroutine&) = delete;
  coroutine& operator=(const coroutine&) = delete;

  int next(int x) {
    handle_.promise().input_ = x;
    cout << "coroutine: next: input: " << *handle_.promise().input_ << endl;
    handle_.resume();
    cout << "coroutine: next: output: " << *handle_.promise().output_ << endl;
    return *handle_.promise().output_;
  }
  
  handle_type handle_;
};


coroutine foo() {
  // promise = promise_type {}
  // coroutine (aka return object) = promise.get_return_object()
  //
  // co_await (awaiter = promise.initial_suspend())

  int acc = 10;
  cout << "foo: acc: " << acc << endl;
  
  acc += co_await 0;  // suspend until resumed
  // input = co_await 0
  //    awaiter = promise.await_transform( 0 )
  //    if (!awaiter.await_ready())
  //      if (awaiter.await_suspend(coroutine.handle_)) 
  //        ... compiler magic to switch to caller until coroutine.handle_.resume()
  //    input = awaiter.await_resume();
  //    
  
  co_yield acc;       // yield and continue
  // co_await output
  //    awaiter = promise.yield_value( output )
  //    if (!awaiter.await_ready())
  //      if (awaiter.await_suspend(coroutine.handle_)) 
  //        ... compiler magic to switch to caller until coroutine.handle_.resume()
  //    awaiter.await_resume();
  //  


  acc += co_await 0;  // suspend until resumed
  co_yield acc;       // yield and continue  NOTICE how state is maintained


  cout << "foo: leave" << endl;

  // co_return;   // implied at coroutine leave

  // promise.return_void()
  // co_await (awaiter = promise.final_suspend())
  // promise.dtor
}

ostream& operator<<(ostream& os, const optional<int>& value) { 
  return os << (value ? to_string(*value) : "(null)");
}

void test() {
  coroutine fn = foo();  // create and suspend the coroutine function

  cout << "test: next: ..." << fn.next(100) << "..." << endl;
  cout << "test: next: ..." << fn.next(200) << "..." << endl;

  cout << "test: leave" << endl;
  // coroutine dtor will destroy the promise if coroutine is still suspended
}

int main() {
  test();
  cout << "main: leave" << endl;
}
