const dfs = ({ discover, finish, edge }, g, ovs = g.vertices()) => {
  const vs = new Set;
  const visit = (v1, vp) => {
    vs.add(v1);
    if (discover) { discover([v1, vp]) }
    for (let v2 of g.neighbours(v1)) { 
      if (!vs.has(v2)) { visit(v2, v1) }
      else if (edge) { edge(v1, v2) }
    }
    if (finish) { finish(v1) }
  };
  for (let v1 of ovs) {
    if (!vs.has(v1)) { visit(v1, null) }
  }
};

module.exports = dfs;
