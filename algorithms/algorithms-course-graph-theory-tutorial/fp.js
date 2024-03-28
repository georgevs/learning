const compose = (...fns) => fns.reduce((g, f) => (x) => g(f(x)));
const pipe = (...fns) => fns.reduce((g, f) => (x) => f(g(x)));

const ap = (fn) => Function.prototype.call.bind(fn);
const unary = (fn) => (x) => fn(x);
const binary = (fn) => (x, y) => fn(x, y);

const tap = (fn) => (x) => (fn(x), x);

const filter = (fn) => (xs) => xs.filter(fn);
const map = (fn) => (xs) => xs.map(fn);
const reduce = (rfn, acc) => (xs) => xs.reduce(rfn, acc);
const into = (acc, rfn) => reduce(rfn, acc);

const gfilter = (fn) => function* (xs) { for (const x of xs) if (fn(x)) yield x };
const gmap = (fn) => function* (xs) { for (const x of xs) yield fn(x) };

const ifilter = (fn) => (xs) => ({
  next() {
    this.it = this.it ?? xs[Symbol.iterator]();
    let { value, done } = this.it.next();
    while (!done) {
      if (fn(value)) { return { value, done } }
      ({ value, done } = this.it.next());
    }
    return { value: undefined, done };
  },
  [Symbol.iterator]() { return this }
});

const imap = (fn) => (xs) => ({
  next() {
    this.it = this.it ?? xs[Symbol.iterator]();
    const { value, done } = this.it.next();
    return { value: done ? undefined : fn(value), done };
  },
  [Symbol.iterator]() { return this }
});

// transducers - https://medium.com/javascript-scene/transducers-efficient-data-processing-pipelines-in-javascript-7985330fe73d
//  rfn :: (acc,x) -> acc
//  xfn :: rfn -> rfn
const tfilter = (fn) => (rfn) => (acc, x) => fn(x) ? rfn(acc, x) : acc;
const tmap = (fn) => (rfn) => (acc, x) => rfn(acc, fn(x));
const transduce = (rfn, acc) => (xfn) => reduce(xfn(rfn), acc);
const toArray = transduce((acc, x) => acc.concat(x), []);

module.exports = { 
  compose, pipe, 
  ap, unary, binary,
  tap,
  filter, map, 
  gfilter, gmap, 
  ifilter, imap, 
  tfilter, tmap, transduce, toArray
};

if (require.main === module) {
  const { asserteq } = require('./asserteq');
  const add = (y) => (x) => String(x) + y;
  const even = (x) => x % 2 === 0;

  // compose/pipe
  asserteq(['1ba','2ba','3ba'], [1,2,3].map(compose(add('a'), add('b'))));  
  asserteq(['1ab','2ab','3ab'], [1,2,3].map(pipe(add('a'), add('b'))));  

  // filter/map/reduce
  asserteq([2,4], filter(even)([1,2,3,4]));
  asserteq(['1a','2a','3a','4a'], map(add('a'))([1,2,3,4]));
  asserteq('s1234', reduce((acc, x) => acc + x, 's')([1, 2, 3, 4]));

  // ap
  asserteq('s1234', reduce(binary(ap(String.prototype.concat)), 's')([1, 2, 3, 4]));

  // gfilter/gmap
  asserteq([2,4], Array.from(gfilter(even)([1,2,3,4])));
  asserteq(['1a','2a','3a','4a'], Array.from(gmap(add('a'))([1,2,3,4])));

  // ifilter/imap
  asserteq([2,4], Array.from(ifilter(even)([1,2,3,4])));
  asserteq(['1a','2a','3a','4a'], Array.from(imap(add('a'))([1,2,3,4])));

  // tfilter/tmap/transduce
  asserteq([2,4], toArray(tfilter(even))([1,2,3,4]));
  asserteq(['1a','2a','3a','4a'], toArray(tmap(add('a')))([1,2,3,4]));
  asserteq(['1ab','2ab','3ab'], toArray(compose(tmap(add('a')), tmap(add('b'))))([1,2,3]));  
}
