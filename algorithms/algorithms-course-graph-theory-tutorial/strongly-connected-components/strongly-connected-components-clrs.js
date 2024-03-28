// algorithm: Strongly Connected Components CLRS
// Introduction to Algorithms; Corman,Leiserson,Rivest,Stein.

const graph = require('./graph');

const stronglyConnectedComponents = (g) => {
  const fvs = [];
  dfs({ finish: collect(fvs) }, g);
  const tg = transpose(g);
  const dvs = [];
  dfs({ discover: collect(dvs) }, tg, fvs.reverse());
  const rs = Array.from(group(dvs)).map(s => Array.from(s));
  return rs;
};

const group = (xs) => {
  const m = new Map;
  const addEdge = ([v2, v1]) => {
    const s = v1 ? (m.get(v1) ?? new Set) : new Set;
    m.set(v2, s.add(v2));
  };
  xs.forEach(addEdge);
  return new Set(m.values());
};

const collect = (rs) => (v) => { rs.push(v) };

const transpose = (g) => {
  const txs = g.edges().map(([v1, v2]) => [v2, v1]);
  return graph(txs);
};

const dfs = ({ discover, finish }, g, ovs = g.vertices()) => {
  const vs = new Set;
  const visit = (v1, vp) => {
    vs.add(v1);
    if (discover) { discover([v1, vp]) }
    for (let v2 of g.neighbours(v1)) { 
      if (!vs.has(v2)) { visit(v2, v1) }
    }
    if (finish) { finish(v1) }
  };
  for (let v1 of ovs) {
    if (!vs.has(v1)) { visit(v1, null) }
  }
};

module.exports = stronglyConnectedComponents;

if (require.main === module) {
  require('./test')({ stronglyConnectedComponentsCLRS: stronglyConnectedComponents });
}
