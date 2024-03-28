const enumVertices = (fn, g) => {
  const first = g.vertices().next().value;
  if (first === undefined) { return false }

  const vs = new Set();
  const iter = (v) => {
    vs.add(v);
    if (fn(v)) { return true }
    for (const v2 of g.neighbours(v)) {
      if (!vs.has(v2)) {
        if (iter(v2)) { return true }
      }
    }
    return false;
  }
  
  return iter(first);
};

module.exports = { enumVertices };
