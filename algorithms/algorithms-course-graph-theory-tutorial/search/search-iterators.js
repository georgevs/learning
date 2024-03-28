class Graph {
  constructor(n, xs) {
    this.vertices = Array.from(Array(n), (_, i) => i);
    const vs = Array.from(this.vertices, () => new Set);
    xs.forEach(([u, v]) => { vs[u].add(v); vs[v].add(u) });
    this.neighbors = vs.map(s => Array.from(s));
  }
}

const search = (enqueue) => (fn, g) => {
  const q = [iter(g.vertices)];
  const s = new Set;
  while (q.length > 0) {
    const { done, value: x } = q[0].next();
    if (done) { q.shift() }
    else if (!s.has(x)) { s.add(x); fn(x); enqueue(q, iter(g.neighbors[x])) }
  }
};

const iter = xs => xs[Symbol.iterator]();
const enqueueBack = (q, x) => q.push(x);
const enqueueFront = (q, x) => q.unshift(x);

const bfs = search(enqueueBack);
const dfs = search(enqueueFront);

module.exports = { bfs, dfs };

if (require.main === module) {
  const { asserteq } = require('../asserteq');
  const g = new Graph(6, [
    [0,1],[0,2],
    [1,0],[1,3],[1,4],
    [2,0],[2,4],[2,5],
    [3,1],
    [4,1],[4,2],
    [5,2]
  ]);
  const traverse = (fn, g) => { let r = []; fn(Array.prototype.push.bind(r), g); return r };
  asserteq([0, 1, 2, 3, 4, 5], traverse(bfs, g));
  asserteq([0, 1, 3, 4, 2, 5], traverse(dfs, g));
}
