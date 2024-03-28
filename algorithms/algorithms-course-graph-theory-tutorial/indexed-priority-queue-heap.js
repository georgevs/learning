// data structure: indexed priority queue

const queue = (order) => {
  const kv = new Map;
  const ki = new Map;
  const ik = [];

  const insert = (k, v) => { 
    kv.set(k, v);
    ki.set(k, ik.length);
    ik.push(k);
    bubble(ki.get(k));
  };

  const contains = (k) => kv.has(k);

  const update = (k, v) => {
    if (!kv.has(k)) { throw Error() } // assert
    kv.set(k, v);
    bubble(ki.get(k));
    sink(ki.get(k));
  };

  const poll = () => { 
    swap(0, ik.length - 1);
    const k = ik.pop();
    const v = kv.get(k);
    kv.delete(k);
    ki.delete(k);
    sink(0);
    return v;
  };

  const empty = () => ik.length == 0;

  const bubble = (i) => {
    for (let p = parent(i); order(kv.get(ik[i]), kv.get(ik[p])) < 0; i = p, p = parent(i)) { 
      swap(i, p);
    }
  };

  const sink = (i) => {
    for (;;) {
      let t = i;
      const l = left(i);
      if (l < ik.length && order(kv.get(ik[l]), kv.get(ik[t])) < 0) { t = l }
      const r = right(i);
      if (r < ik.length && order(kv.get(ik[r]), kv.get(ik[t])) < 0) { t = r }
      if (t === i) { break }
      swap(t, i);
      i = t;
    }
  };

  const swap = (i, j) => { 
    ki.set(ik[i], j); ki.set(ik[j], i);
    let t = ik[i]; ik[i] = ik[j]; ik[j] = t;
  };

  const left = (i) => 2 * i + 1;
  const right = (i) => 2 * i + 2;
  const parent = (i) => (i - 1) / 2 | 0;

  return { insert, contains, update, poll, empty };
};

module.exports = queue;
