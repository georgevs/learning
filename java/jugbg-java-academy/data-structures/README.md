# Collections

[Lesson: Aggregate Operations](https://docs.oracle.com/javase/tutorial/collections/streams/index.html)  
[Lesson: Generics](https://docs.oracle.com/javase/tutorial/java/generics/index.html)  
[Trail: Collections](https://docs.oracle.com/javase/tutorial/collections/index.html) 
[Collections Interfaces](https://docs.oracle.com/javase/tutorial/collections/interfaces/collection.html)  

## [Collections](https://docs.oracle.com/javase/tutorial/collections/interfaces/collection.html)

### Transformations
```
coll = Arrays.asList(xs)   // view xs as a collection;  NO COPY!!!
coll = Collections.toArray(coll)
xss = Arrays.stream(xs)
```

### Filter
```
static void filter(Collection<?> c) {
    for (Iterator<?> it = c.iterator(); it.hasNext(); )
        if (!cond(it.next()))
            it.remove();
}  

c.removeAll(Collections.singleton(e));
```

## [Set](https://docs.oracle.com/javase/tutorial/collections/interfaces/set.html)

### Interface
```
size(), isEmpty()
add/remove(e)
iterator()

containsAll/addAll/retainAll/removeAll(coll)
```

### Remove duplicates
```
Collection<Type> noDups = new HashSet<Type>(c);   // fast
Collection<Type> noDups = new LinkedHashSet<Type>(c);   // preserves the order
```

### Streams
```
c.stream()
  .collect(Collectors.toSet()); // no duplicates

Set<String> set = people.stream()
  .map(Person::getName)
  .collect(Collectors.toCollection(TreeSet::new));
```

### Set operations
```
Set<Type> union = new HashSet<Type>(s1);
union.addAll(s2);

Set<Type> intersection = new HashSet<Type>(s1);
intersection.retainAll(s2);

Set<Type> difference = new HashSet<Type>(s1);
difference.removeAll(s2);
```

## [List](https://docs.oracle.com/javase/tutorial/collections/interfaces/list.html)

### Interface
```
- Positional access
- Search
- Iteration
- Range-view

get/set/add/remove
indexOf, lastIndexOf

Collections.  sort/shuffle/reverse/rotate
              swap/replaceAll/fill/copy/binarySearch
              indexOfSubList/lastIndexOfSubList
```

### Implementations
```
ArrayList
LinkedList
```

### Idioms
```
// reverse iterator
for (ListIterator<Type> it = list.listIterator(list.size()); it.hasPrevious(); ) {
    Type t = it.previous();
    ...
}

// range view
list.subList(int fromIndex, int toIndex)
```


## [Queue](https://docs.oracle.com/javase/tutorial/collections/interfaces/queue.html)

### Interface
```
element, add, remove   // throw on error
peek, offer, poll // return null on error
```

### Implementations
```
LinkedList
BlockingQueue
PriorityQueue
```

## [Deque](https://docs.oracle.com/javase/tutorial/collections/interfaces/deque.html)

### Interface
```
addFirst/offerFirst // Last
removeFirst/pollFirst // Last
getFirst/peekFirst // Last
removeFirstOccurence // Last
```

### Implementations
```
ArrayDeque
LinkedList
```

## [Map](https://docs.oracle.com/javase/tutorial/collections/interfaces/map.html)

### Interface
```
put, get, remove, 
containsKey, containsValue, 
size, empty

putAll, addAll,
containsAll, removeAll, retainAll, 
clear

keySet, entrySet, values

equals - Two Map instances are equal if they represent the same key-value mappings.
```

### Implementations
```
HashMap
TreeMap
LinkedHashMap
```

### Idioms
```
(Map<Department, List<Employee>>) employees.stream()
  .collect(
    Collectors.groupingBy(Employee::getDepartment));

(Map<Department, Integer>) employees.stream()
  .collect(
    Collectors.groupingBy(Employee::getDepartment, 
      Collectors.summingInt(Employee::getSalary)));

for (Map.Entry<KeyType, ValType> e : m.entrySet())
    System.out.println(e.getKey() + ": " + e.getValue());

for (Iterator<Type> it = m.keySet().iterator(); it.hasNext(); )
    if (it.next().isBogus())
        it.remove();

if (m1.entrySet().containsAll(m2.entrySet())) { ... }
if (m1.keySet().equals(m2.keySet())) { ... }

Employee employee = ... ;
managers.values().removeAll(Collections.singleton(employee));
```

## [Ordering](https://docs.oracle.com/javase/tutorial/collections/interfaces/order.html)

### Interface
```
Collections.sort(coll)
Comparable.compareTo(x) -> bool
Comparator.compare(lhs,rhs) -> int
```

### Idioms
```
public class Name implements Comparable<Name> {
  private final String firstName, lastName;

  public int hashCode() { return 31*firstName.hashCode() + lastName.hashCode(); }

  public boolean equals(Object o) { 
    if (!(o instanceof Name)) return false;
    return ((Name)o).firstName.equals(firstName) && ((Name)o).lastName.equals(lastName);
  }

  public int compareTo(Name n) {
    int result;
    if ((result = lastName.compareTo(n.lastName)) == 0)
         result = firstName.compareTo(n.firstName);
    return result;
  }
}
```
*WARNING*: sorted collections (`TreeSet` etc) REQUIRE that `Comparator.compare()` is compatible with `equal()` which requires that ALL attributes must participate in the `compare()` expression even if not related to the order.


## [SortedSet](https://docs.oracle.com/javase/tutorial/collections/interfaces/sorted-set.html)

### Interface
```
- range view  -- including low endpoint `from`, excluding high endpoint `to`
- endpoints
- comparator access

SortedSet: Set 

subSet(from, to), headSet(to), tailSet(from) -> SortedSet
first(), last() -> x
comparator() -> Comparator   // null if natural order

iterator() 
toArray()
```

### Implementations
```
TreeSet
```

### Idioms
```
// print count of words per letter in a dictionary
for (char ch = 'a'; ch <= 'z'; ) {
    String from = String.valueOf(ch);
    String to = String.valueOf(++ch);
    System.out.println(from + ": " + dictionary.subSet(from, to).size());  // [from, to)
}

// override the default sub set interval [from, to)
xss.subSet(from = "doorbell",   to = "pickle\0")  // include high endpoint "pickle"
xss.subSet(from = "doorbell\0", to = "pickle"  )  // exclude low endpoint "dorbell"
```

Continue here https://docs.oracle.com/javase/tutorial/collections/interfaces/sorted-map.html