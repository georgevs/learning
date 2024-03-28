// algorithm: bridges
// https://youtu.be/09_LlHjoEiY?t=9084

const articulationPoints = (g) => {
  const vs = new Set;
  const ids  = new Map;
  const low = new Map;
  const avs = new Set;
  let id = 0;
  
  const dfs = (v1, vp) => {
    vs.add(v1);
    ids.set(v1, id);
    low.set(v1, id);
    ++id;
    let n = 0; // unconnected subtrees count
    for (const v2 of g.neighbours(v1)) {
      if (v2 === vp) { continue }
      if (!vs.has(v2)) {
        ++n;
        dfs(v2, v1);
        low.set(v1, Math.min(low.get(v1), low.get(v2)));
        const i1 = ids.get(v1), l2 = low.get(v2);
        if (i1 < l2) { avs.add(v1) } // bridge
        if (i1 == l2 && vp !== null) { avs.add(v1) } // cycle on a bridge end
      } else {
        low.set(v1, Math.min(low.get(v1), ids.get(v2)));
      }
    }
    return n;
  };

  for (const v1 of g.vertices()) { 
    if (!vs.has(v1)) { 
      if (dfs(v1, null) > 1) { avs.add(v1) } // 2+ unconnected subtrees
    }
  }
  return Array.from(avs);
};

module.exports = articulationPoints;

if (require.main === module) {
  require('./test')({ articulationPoints }, Number(process.argv[2]) || 1);
}
