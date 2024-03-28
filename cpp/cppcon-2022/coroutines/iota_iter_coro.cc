/*
Reference:
  https://en.cppreference.com/w/cpp/coroutine/coroutine_handle
  https://learn.microsoft.com/en-us/archive/msdn-magazine/2017/october/c-from-algorithms-to-coroutines-in-c

Build:
  clang++ -std=c++20 -stdlib=libc++ -fcoroutines-ts iota_iter_coro.cc && ./a.out
*/

#include <iostream>
#include <experimental/coroutine>
#include <numeric>
#include <optional>

//----------------------------------------------------------------------------------------
namespace test_iota {

void main() {
  std::cout << "Test iota" << std::endl;
  int range[10];

  std::iota(std::begin(range), std::end(range), 0);

  for (const int i : range) {
    std::cout << i << std::endl;
  }
}

} // namespace test_iota


//----------------------------------------------------------------------------------------
namespace test_iterator {

template <typename T>
struct generator {
  T first_;
  T last_;

  struct iterator { 
    using iterator_category = std::input_iterator_tag;
    using value_type = T;
    using difference_type = ptrdiff_t;
    using pointer = T const*;
    using reference = T const&;

    bool operator==(iterator const& other) const { return value_ == other.value_; }
    bool operator!=(iterator const& other) const { return !(*this == other); }

    T const& operator*() const { return value_; }
    T const* operator->() const { return std::addressof(value_); }

    iterator& operator++() { ++value_; return *this; }
    iterator operator++(int) = delete;

    int value_;
  };

  iterator begin() { return { first_ }; }
  iterator end() { return { last_ }; }
};

template <typename T>
generator<T> range(T first, T last) {
  return { first, last };
}

void main() {
  std::cout << "Test iterator" << std::endl;
  for (const int i : range(0, 10)) {
    std::cout << i << std::endl;
  }
}

} // namespace test_iterator

//----------------------------------------------------------------------------------------
namespace test_coroutine {

template <typename T>
struct generator {
  // promise interfaces the CURRENT yielded value to the coroutine caller, 
  //   and advices the coroutine state machine behavior at start/yield/await/return in the coroutine
  struct promise_type {
    generator get_return_object() { return generator { *this }; }
    std::experimental::suspend_always initial_suspend() noexcept { return {}; }  // suspend on coroutine start
    std::experimental::suspend_always yield_value(T value) noexcept {  // co_await (value) === co_await (promise.yield_value(value))
      value_ = std::move(value);  // capture the value produced in coroutine
      return {};  // suspend on co_yield in coroutine
    }
    void await_transform() = delete;  // disable co_await in coroutine
    [[noreturn]] static void unhandled_exception() { throw; }
    void return_void() {}  // co_return in coroutine
    std::experimental::suspend_always final_suspend() noexcept { return {}; }  // suspend on co_return in coroutine

    std::optional<T> value_;  // interface the CURRENT yielded value
  };

  // handle controls the coroutine state machine from the coroutine caller
  //   trivially copyable, holds (non-owner) a pointer to the coroutine state 
  //   the coroutine state is self-destroyed on coroutine exit OR if handle::destroy() is called explicitly
  using handle_type = std::experimental::coroutine_handle<promise_type>;

  // generator (aka return object) is a lightweight movable object proxying a coroutine invocation
  explicit generator(promise_type& promise) : handle_(handle_type::from_promise(promise)) {}
  generator(generator&& other) : handle_(std::exchange(other.handle_, nullptr)) {}
  generator& operator=(generator&& other) { handle_ = std::exchange(other.handle_, nullptr); return *this; }
  ~generator() { if (handle_ && !handle_.done()) handle_.destroy(); }

  // disable default, copy, assign   
  generator() = delete;
  generator(const generator&) = delete;
  generator& operator=(const generator&) = delete;

  // enable for each loop
  struct iterator {
    void operator++() { handle_.resume(); }
    const T& operator*() const { return *handle_.promise().value_; }
    bool operator==(std::default_sentinel_t) const { return !handle_ || handle_.done(); }  // coroutine completed
    explicit iterator(const handle_type handle) : handle_(handle) {}
    handle_type handle_;
  };

  iterator begin() {
    if (handle_ && !handle_.done()) handle_.resume();  // resume from coroutine start
    return iterator { handle_ };
  }
  std::default_sentinel_t end() { return {}; }

  handle_type handle_;  // coroutine state machine handle
};

template <typename T>
generator<T> range(T first, const T last) {
  while (first < last) {
    co_yield first++;
  }
}

void main() {
  std::cout << "Test coroutines" << std::endl;
  for (const int i : range(0, 10)) {
    std::cout << i << std::endl;
  }
}

} // namespace test_coroutine

//----------------------------------------------------------------------------------------
int main() {
  test_iota::main();
  test_iterator::main();
  test_coroutine::main();
}
