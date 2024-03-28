# Go by example

[Go by example](https://gobyexample.com)

## Arguments (os, flags)
```golang
os.Args[i] -> [prog a1 a2 a3...]
val := flag.String/Int/Bool(key, default, help) -> *String
flag.Parse()
flag.Args() -> (tail []T)
```
```bash
./prog -str=abc -int=5 -bool a b c    # tail = [a b c]
```

## Variadic functions
```golang
func sum(xs ...int) {
  for i,x := range xs { }
}

sum(1)
sum(1, 2, 3, 4)

xs := []int{ 1, 2, 3, 4 }
sum(xs...)
```

## Strings (unicode/utf8)
```golang
len(s) -> n  // length in bytes, NOT in code points (aka runes)
utf8.RuneCountInString(s) -> n  // length in code points
for i:=0, i<len(s); i++ { b := s[i] }  // iterate bytes 
for i,ch := range s { ch == s[i] }  // iterate code points
ch,w := utf8.DecodeRuneInString(s[i:])
```

## Structs, methods, interfaces
```golang
dog := struct { name string; isGood bool }  // anonymous struct

type person struct { name string; age int }  // type definition
func newPerson() *person { return &person{name:"name", age:42} }  // ctor
func (p *person) foo() { ... }  // method

type geometry interface {  // interface
  area() float64
  perimeter() float64
}

type rect struct { w, h float64 }

func (r *rect) area() float64 { return r.w * r.h }   // rect implements geometry
```

## Unit testing
```golang
// ./tests/slices_test.go
import (
	"testing"
	"github.com/stretchr/testify/assert"
)
func TestSlices(t *testing.T) {
	xs := []int{1, 2, 3}
	assert.Equal(t, []int{1, 2, 3}, xs)
}
```
### Run the tests
```bash
go test -v ./tests
```

## Slices
```golang
xs := []int{1,2,3}
xs = append(xs,4,5,6)
for i,x := range xs { fmt.Println(fmt.Sprintf("xs[%v]->%v",i,x)) }
xs := append(xs[:i],xs[i+1:]...)  // remove i-th
```

## Maps
```golang
xs := map[int]string{1: "one", 2: "two"}
if x, ok := xs[1]; ok { fmt.Println(x) }
for k,v := range xs { fmt.Println(fmt.Sprintf("xs[%v]->%v",k,v)) }

xs[1] = "ten"
delete(xs, 1)  // noop if key missing
```


## Composifion and embedding
```golang
type base struct { num int }
type container struct {
  base
  str string
}
co := container{ base{1}, "str" }
co.base.num
```

## Generics
```golang
type List[T any] struct { head, tail * element[T] }
type element[T any] struct { next element[T]; val T }
func lst := List[int]{} lst.GetAll()
```

## Errors (errors)
```golang
func foo() (int,error) { return -1, error.New("...reason...") }
type myError struct { what, when string }
func (e *myError) Error() string { return fmt.Sprintf(...) }
if val, ok := e.(*myError); ok { ...e is myError ... }
```

## Waitgroup (sync)
```golang
var wg sync.WaitGroup
wg.Add(k)
for i:=0; i<k; i++ { got func() { ...; wg.Done() } }
wg.Wait()
```

## Rate limiter (time)
```golang
limiter := time.Tick(200 * time.Millisecond)
for {
  <- limiter   // 200ms wait
}
```

## Atomic counters (sync/atomic)
```golang
var counter uint64
atomic.AddUint64(&counter, 1)
```

## Mutex (sync)
```golang
type container struct { mu sync.Mutex; data int }
func (c *Container) inc() {
  c.mu.Lock(); defer c.mu.Unlock();
  c.data++
}
```

## Stateful goroutines
```golang
server := func() {
  var state int
  for { switch req := <- ch { ...mutate state } }
}
```

## Sorting (sort)
```golang
sort.Strings(values)
sort.IntsAreSorted(values)

sortable:
  Len() int
  Swap(i,j int)
  Less(i,j int) bool
```

## Environment (os)
```golang
os.Setenv(key, val)
os.Getenv(key) -> val
os.Environ() -> []String   "key=val"
```

## Http client (net/http, buffio)
```golang
resp, err := http.Get(url)
defer res.Body.Close()
res.Status
scanner := buffio.NewScanner(resp.Body)
scanner.Scan()
scanner.Text() 
scanner.Err()
```

## Http server (net/http)
```golang
func hello(w http.ResponseWriter, req *http.Request) {
  fmt.Fprintf(w, "hello\n")
}
http.HandlerFunc("/hello", hello)
http.ListenAndServe(":8080", nil)
```
```bash
curl http://localhost:8080/hello
```

## Http request context (net/http)
```golang
func hello(w http.ResponseWriter, req *http.Request) {
  ctx := req.Context()
  switch {
    case <- ctx.Done(): return  //...leave; we're done...
  }
}
```

## Spawn process (os/exec)
Read all output
```golang
proc, err := exec.Command("date")
bytes, err := proc.Output()
fmt.Println(string(bytes))
switch e := err.(type) {
  case *exec.Error: handleError()
  case *exec.ExitError: handleExitError()
}
```
Read through pipes
```golang
proc, err := exec.Command("grep", "hello")
w, _ := proc.StdinPipe()   // send input to the process
r, _ := proc.StdoutPipe()  // read output from the process

proc.Start()

w.Write([]byte{"...text..."})
w.Close()  // done with input

bytes, _ := io.ReadAll(r)
proc.Wait()   // sync completion
```

## Run and forget (syscall)
```golang
err := syscall.Exec("/path/to/prog", args, os.Environ())
```

## Signals (os/signal)
```golang
sigs := make(chan os.Signal, 1)
signal.Notify(sigs, syscall.SIGINT, syscall.SIGTERM)
```

## Exit (os)
```golang
os.Exit(3)
```
