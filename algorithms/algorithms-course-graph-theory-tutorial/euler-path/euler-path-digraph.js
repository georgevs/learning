const digraph = require('./digraph');

const eulerPathDigraph = (n, xs) => {
  const g = digraph(n, xs);
  
  const first = () => {
    let i0;
    const vs = g.vertices();
    for (let i = 0; i < vs.length; ++i) {
      const d = diffDegree(vs[i]);
      if (d == 1) { return vs[i] }
      if (i0 == undefined && d == 0) { i0 = i }
    }
    return vs[i0];
  };
  
  const hasEulerPath = () => {
    const conforms = (acc) => (d) => {
      if (d == 0) { return true }
      if (d == 1) { return ++acc.p <= 1 }  // at most one vertex of +1 out degree
      if (d == -1) { return ++acc.n <= 1 } // at most one vertex of +1 in degree
      return false; // no vertex of +2 in/out degree
    };
    return g.vertices().map(diffDegree).every(conforms({ n: 0, p: 0 }));
  };

  const diffDegree = (v) => g.outEdges(v).length - g.inEdges(v).length;

  return { ...g, first, hasEulerPath };
};


module.exports = eulerPathDigraph;

if (require.main === module) {
  require('./test-euler-path-digraph')({ eulerPathDigraph });
}
