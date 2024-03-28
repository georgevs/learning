
#include <iostream>
#include <concepts>

template <typename A, typename B>
concept Neqable = requires(A a, B b) {
  { a != b } -> std::convertible_to<bool>;
};

template <typename A, Neqable<A> B>
auto foo1(A a, B b) {
  return a != b;
}

template <typename A, typename B>
  requires Neqable<A, B>
auto foo2(A a, B b) {
  return a != b;
}

template <typename A, typename B>
auto foo3(A a, B b)
  requires Neqable<A, B>
{
  return a != b;
}

template <typename A>
auto foo4(A a, Neqable<A> auto b) {
  return a != b;
}

auto foo5(auto a, Neqable<decltype(a)> auto b) { return a != b; }

auto foo6(auto a, auto b)
  requires Neqable<decltype(a), decltype(b)>
{
  return a != b;
}

int main() {
  std::cout << "Hello world";
  foo1(1, 2);
  foo2(1, 2);
  foo3(1, 2);
  foo4(1, 2);
  foo5(1, 2);
}
