/*
  linux: 
    g++-10 -std=c++20 main.cc && ./a.out
    
  macOS:   clang does not supprt ranges yet
    brew search gcc
    brew info gcc
    brew install gcc

    g++-12 -std=c++20 main.cc && ./a.out
*/

#include <chrono>
#include <condition_variable>
#include <iostream>
#include <thread>
#include <mutex>

using namespace std;

namespace test_cancellable_threads {

void foo1() {
  cout << "foo1 - will leave in ~3 sec after enter" << endl;

  jthread job { 
    [](stop_token token) {
      while (!token.stop_requested()) {
        cout << "job: tick" << endl;
        this_thread::sleep_for(chrono::seconds(3));
      }
    }
  };

  cin.ignore();
  job.request_stop();

  // jthread dtor will join (aka wait) the thread to complete
}

void foo2() {
  cout << "foo2 - will leave IMMEDIATELY after enter" << endl;

  condition_variable_any cv;
  mutex mx;

  jthread job { 
    [&](stop_token token) {
      while (!token.stop_requested()) {
        cout << "job: tick" << endl;

        unique_lock lk { mx };
        cv.wait_for(lk, token, chrono::seconds(3), []{ return false; });
      }
    }
  };

  cin.ignore();
  job.request_stop();

  // jthread dtor will join (aka wait) the thread to complete
}

void main() {
  cout << "test_cancellable_threads" << endl;
  foo1();
  foo2();
  cout << "main: leave..." << endl;
}

}  // namespace

int main() {
  test_cancellable_threads::main();
}
