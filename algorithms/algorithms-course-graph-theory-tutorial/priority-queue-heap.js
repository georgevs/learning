// data structure: priority queue
// https://www.youtube.com/watch?v=RBSGKlAvoiM

const queue = (order) => {
  const xs = [];
  const enqueue = (x) => { xs.push(x); bubble(xs.length - 1) };
  const dequeue = () => { swap(0, xs.length - 1); const r = xs.pop(); sink(0); return r };
  const empty = () => xs.length == 0;

  const bubble = (i) => {
    for (let p = parent(i); order(xs[i], xs[p]) < 0; i = p, p = parent(i)) { 
      swap(i, p);
    }
  };

  const sink = (i) => {
    for (;;) {
      let t = i;
      const l = left(i);
      if (l < xs.length && order(xs[l], xs[t]) < 0) { t = l }
      const r = right(i);
      if (r < xs.length && order(xs[r], xs[t]) < 0) { t = r }
      if (t === i) { break }
      swap(t, i);
      i = t;
    }
  };

  const swap = (i, j) => { let t = xs[i]; xs[i] = xs[j]; xs[j] = t };
  const left = (i) => 2 * i + 1;
  const right = (i) => 2 * i + 2;
  const parent = (i) => (i - 1) / 2 | 0;

  return { enqueue, dequeue, empty, xs };
};

module.exports = queue;
