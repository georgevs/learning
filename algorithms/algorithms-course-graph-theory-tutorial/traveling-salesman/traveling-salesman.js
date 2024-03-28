// Traveling salesman - https://youtu.be/09_LlHjoEiY?t=12012
// Related to https://leetcode.com/problems/shortest-path-visiting-all-nodes/

// Use dynamic programming to calculate the min cost of all possible routes
// from the starting vertex, thorugh a set of vertices, ending on a vertex from that set.
//
// DP relation:
//   w = dp(s,i) is the min cost of all permutations of `s` starting v1 and ending at `i`
//   dp(s,i) = min { dp(s\i,j) + m(j,i), j<-s\{i,v1} }
//   dp({v1,i},i) = m(v1,i)
//
// min route cost = min { dp(V,i) + m(i,v1), i<-V\v1 }
// min route path = f(V,v1), f(v,i) = f(v\j,j) + j, j: min { dp(v,j) + m(j,i), j<-v\v1 } 

const dp = (m, v1) => {
  const n = m.length;
  const rs = new Map;
  const set = (s, i, w) => (rs.get(s) ?? rs.set(s, new Map).get(s)).set(i, w);
  const get = (s, i) => rs.get(s)?.get(i);
  const iter = (si, i) => {
    const s = si & ~(1 << i);  // si\{i}
    let w = Infinity;
    for (let j = 0; j < n; ++j) {
      if (j != v1 && (s & (1 << j)) != 0) {  // j<-s\{v1}
        w = Math.min(w, dp(s, j) + m[j][i]);
      }
    }
    return w;
  };
  const dp = (s, i) => { let w; return get(s, i) ?? (set(s, i, w = iter(s, i)), w) };

  for (let i = 0; i < n; ++i) {
    if (i != v1) {
      set((1 << v1) | (1 << i), i, m[v1][i]);
    }
  }
  return dp;
};

const calcMinRouteCost = (m, v1, dp) => {
  const n = m.length;
  let w = Infinity;
  const s = (1 << n) - 1; // all of `n`
  for (let i = 0; i < n; ++i) {
    if (i != v1) {  // i<-s\{v1}
      w = Math.min(w, dp(s, i) + m[i][v1]);
    }
  }
  return w;
};

const calcMinRoutePath = (m, v1, dp) => {
  const n = m.length;
  const iter = (s, l) => {
    if (s == (1 << v1)) { return [v1] }

    let wi = Infinity, i;
    for (let j = 0; j < n; ++j) {
      if (j != v1 && (s & (1 << j)) != 0) { // j<-s\{v1}
        const wj = dp(s, j) + m[j][l];
        if (wj < wi) { wi = wj; i = j }
      }
    }
    return iter(s & ~(1 << i), i).concat(i);
  };

  return iter((1 << n) - 1, v1);
};

const minRouteCost = (m, v1) => calcMinRouteCost(m, v1, dp(m, v1));
const minRoutePath = (m, v1) => calcMinRoutePath(m, v1, dp(m, v1))

module.exports = { minRouteCost, minRoutePath };

if (require.main === module) {
  require('./test')(module.exports);
}
