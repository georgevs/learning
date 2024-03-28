// algorithm: Tarjan Strongly Connected Components

const stronglyConnectedComponents = (g) => {
  // console.log(g.toString());

  const ids = new Map;
  const lls = new Map;
  let id = 0;

  const s = [];  // stack

  const visit = (v1) => {
    ids.set(v1, id); lls.set(v1, id); ++id;
    s.push(v1);

    for (let v2 of g.neighbours(v1)) { 
      if (!ids.has(v2)) { visit(v2) }
      if (s.includes(v2)) { lls.set(v1, Math.min(lls.get(v1), lls.get(v2))) }
    }

    if (ids.get(v1) === lls.get(v1)) {
      for (let v2 = s.pop(); v2 !== v1; v2 = s.pop()) {
        lls.set(v2, ids.get(v1));
      }
    }
  };

  for (let v of g.vertices()) { 
    if (!ids.has(v)) { visit(v) }
  }

  const rs = Array.from(lls.entries())
    .reduce((m, [v, i]) => ((m.get(i) ?? m.set(i, []).get(i)).push(v), m), new Map)
    .values();
  return Array.from(rs);
};

module.exports = stronglyConnectedComponents;

if (require.main === module) {
  require('./test')({ stronglyConnectedComponentsTarjan: stronglyConnectedComponents });
}
