// data structure: indexed priority queue

const queue = (order) => {
  const ki = new Map;
  const xs = [];

  const has = (k) => ki.has(k);
  const get = (k) => xs[ki.get(k)][1];

  const enqueue = (k, v) => { 
    const i = ki.get(k);
    if (i !== undefined) { 
      xs[i][1] = v;
      sink(bubble(i));

    } else {
      xs.push([k, v]);
      ki.set(k, xs.length - 1);
      bubble(xs.length - 1);
    }
  };

  const dequeue = () => { 
    if (xs.length != 0) {
      swap(0, xs.length - 1);
      const [k, v] = xs.pop();
      ki.delete(k);
      sink(0);
      return v;
    }
  };

  const empty = () => xs.length == 0;

  const bubble = (i) => {
    for (let p = parent(i); order(xs[i][1], xs[p][1]) < 0; i = p, p = parent(i)) { 
      swap(i, p);
    }
    return i;
  };

  const sink = (i) => {
    for (;;) {
      let t = i;
      const l = left(i);
      if (l < xs.length && order(xs[l][1], xs[t][1]) < 0) { t = l }
      const r = right(i);
      if (r < xs.length && order(xs[r][1], xs[t][1]) < 0) { t = r }
      if (t === i) { break }
      swap(t, i);
      i = t;
    }
    return i;
  };

  const swap = (i, j) => { 
    ki.set(xs[i][0], j); ki.set(xs[j][0], i);
    let t = xs[i]; xs[i] = xs[j]; xs[j] = t;
  };

  const left = (i) => 2 * i + 1;
  const right = (i) => 2 * i + 2;
  const parent = (i) => (i - 1) / 2 | 0;

  return { has, get, enqueue, dequeue, empty };
};

module.exports = queue;
