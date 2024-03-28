const eq = (x, y) => {
  if (x === y) { return true }
  if (x instanceof Function || y instanceof Function) { return false }
  if (x instanceof Set || y instanceof Set) { return eqs(x, y) }
  if (x instanceof UnorderedArray || y instanceof UnorderedArray) { return equa(x, y) }
  if (x instanceof SomeArray || y instanceof SomeArray) { return eqsa(x, y) }
  if (Array.isArray(x) || Array.isArray(y)) { return eqa(x, y) }
  if (Object(x) === x && Object(y) === y) { return eqo(x, y) }
  return false;
};

class UnorderedArray extends Array { }
class SomeArray extends Array { }

const eqsa = (xs, ys) => {
  if (!(xs instanceof Array && ys instanceof Array)) { return false }
  const sxs = xs instanceof SomeArray ? xs : SomeArray.of(xs);
  const sys = ys instanceof SomeArray ? ys : SomeArray.of(ys);

  for (const x of sxs) {
    for (const y of sys) {
      if (eq(x, y)) { return true }
    }
  }
  return false;
};

const equa = (xs, ys) => {
  if (!(xs instanceof Array && ys instanceof Array)) { return false }
  if (xs.length !== ys.length) { return false }

  const ixs = Array.from(xs.keys());
  const iys = Array.from(ys.keys());
  while (ixs.length > 0 && iys.length > 0) {
    const i = ixs.shift();
    const k = iys.findIndex(j => eq(xs[i], ys[j]));
    if (k === -1) { return false }
    iys.splice(k, 1);
  }
  return ixs.length == 0 && iys.length == 0;
};

const eqs = (x, y) => {
  if (!(x instanceof Set && y instanceof Set)) { return false }
  return equa(UnorderedArray.from(x.values()), UnorderedArray.from(y.values()));
};

const eqa = (x, y) => {
  if (!(Array.isArray(x) && Array.isArray(y))) { return false }
  return x.length === y.length && x.every((v, i) => eq(v, y[i]));
};

const eqo = (x, y) => {
  if (!(Object(x) === x && Object(y) === y)) { return false }
  return eq(Object.entries(x).sort(compareKey), Object.entries(y).sort(compareKey))
};

const compareKey = ([lhs],[rhs]) => lhs.localeCompare(rhs);

const asserteq = (e, r) => console.assert(eq(e, r), 'expected:', e, 'result:', r);

module.exports = { asserteq, eq, UnorderedArray, SomeArray };

if (require.main === module) {
  asserteq(true, eq(undefined, undefined));
  asserteq(false, eq(1, undefined));
  asserteq(false, eq(undefined, 1));
  asserteq(false, eq(0, undefined));
  asserteq(false, eq(undefined, 0));
  asserteq(false, eq('a', undefined));
  asserteq(false, eq(undefined, 'a'));
  asserteq(false, eq('', undefined));
  asserteq(false, eq(undefined, ''));
  asserteq(false, eq([], undefined));
  asserteq(false, eq(undefined, []));
  asserteq(true, eq(1, 1));
  asserteq(true, eq(0, 0));
  asserteq(true, eq('a', 'a'));
  asserteq(true, eq('', ''));
  asserteq(true, eq([], []));
  asserteq(true, eq([0, 1, '', 'a', [0, 1, '', 'a']], [0, 1, '', 'a', [0, 1, '', 'a']]));
  asserteq(false, eq([0, 1, ''], [0, 1, '', 'a']));
  asserteq(false, eq([0, 1, '', 'a'], [0, 1, '']));
  asserteq(true, eq({}, {}));
  asserteq(true, eq({ a: 1 }, { a: 1 }));
  asserteq(true, eq([{ a: 1, b: [1] }], [{ a: 1, b: [1] }]));
  asserteq(true, eq([{ a: 1, b: [1] }], [{ b: [1], a: 1 }]));
  asserteq(false, eq({ a: 1 }, { a: 2 }));
  asserteq(false, eq({ a: 1 }, { b: 1 }));
  asserteq(false, eq({ a: 1 }, { a: 1, b: 1 }));
  
  const [A,B,C] = Array.from('ABC').map(Symbol);

  asserteq(false, eq(A, B));
  asserteq(true, eq(A, A));

  asserteq(true, eq(UnorderedArray.of(A, B, C), [A, B, C]));
  asserteq(true, eq(UnorderedArray.of(A, B, C), [B, A, C]));
  asserteq(false, eq(UnorderedArray.of(A, B, C), [A, B, C, B]));
  asserteq(true, eq(UnorderedArray.of(A, B, B, C), [A, B, C, B]));
  asserteq(true, eq(UnorderedArray.from([]), []));
  asserteq(true, eq([], UnorderedArray.from([])));
  asserteq(false, eq(UnorderedArray.from([]), {}));
  asserteq(true, eq([{ a: 1 }, { b: 2 }], UnorderedArray.of({ b: 2 }, { a: 1 })));

  asserteq(true, eq([A, [B, C]], [A, [B, C]]));
  asserteq(false, eq([A, [B, C]], [A, [C, B]]));
  asserteq(true, eq([A, [B, C]], [A, UnorderedArray.from([C, B])]));
  asserteq(true, eq([A, [B, C]], [A, UnorderedArray.of(C, B)]));

  asserteq(false, eq(new Set([A, B]), new Set([A, B, C])));
  asserteq(true, eq(new Set([A, B, C]), new Set([A, B, C])));
  asserteq(true, eq(new Set([A, B, C]), new Set([B, A, C])));
  asserteq(true, eq(new Set([A, B, C]), new Set([A, B, C, B])));
  asserteq(true, eq(new Set([A, B, B, C]), new Set([A, B, C, B])));
  asserteq(true, eq(new Set([]), new Set([])));
  asserteq(false, eq(new Set([]), {}));
  
  asserteq(true, eq(SomeArray.of([]), []));
  asserteq(true, eq(SomeArray.of([1,2,3],['a','b','c']), [1,2,3]));
  asserteq(true, eq(SomeArray.of([1,2,3],['a','b','c']), ['a','b','c']));
  asserteq(true, eq(SomeArray.of([1,2,3],['a','b','c']), SomeArray.of([A,B,C],[1,2,3])));
  asserteq(false, eq(SomeArray.of([1,2,3],['a','b','c']), [A,B,C]));
  asserteq(false, eq(SomeArray.of([1,2,3],['a','b','c']), '..not an array..'));
}
