// algorithm: all paths shortest paths Floyd Warshall
// https://youtu.be/09_LlHjoEiY?t=7534


const shortestPaths = (m) => {
  const n = m.length;
  const dp = Array.from(Array(n), (_, i) => Array.from(m[i]));
  const next = Array.from(Array(n), (_, i) => Array.from(Array(n), (_, j) => m[i][j] === Infinity ? undefined : j));

  for (let k = 0; k < n; ++k) {
    for (let i = 0; i < n; ++i) {
      for (let j = 0; j < n; ++j) {
        const w = dp[i][k] + dp[k][j];
        if (w < dp[i][j]) {
          next[i][j] = next[i][k];
          dp[i][j] = w;
        }
      }
    }
  }

  // identify negative loops
  for (let k = 0; k < n; ++k) {
    for (let i = 0; i < n; ++i) {
      for (let j = 0; j < n; ++j) {
        const w = dp[i][k] + dp[k][j];
        if (w < dp[i][j]) {
          next[i][j] = null;
          dp[i][j] = -Infinity;
        }
      }
    }
  }

  return { dp, next };
};

module.exports = shortestPaths;

if (require.main === module) {
  const { asserteq } = require('../asserteq');

  const xs = [
    [0,1,2],[0,2,5],[0,6,10],
    [1,2,2],[1,4,11],
    [2,6,2],
    [4,5,1],
    [5,4,-2],
    [6,5,11]
  ];
  const n = xs.reduce((n, [v1, v2]) => Math.max(n, v1, v2), -1) + 1;
  const m = xs.reduce(
    (m, [v1, v2, w]) => (m[v1][v2] = w, m), 
    Array.from(Array(n), (_, i) => Array.from(Array(n), (_, j) => i == j ? 0 : Infinity))
  );
  asserteq({
    dp: [
      [0, 2, 4, Infinity, -Infinity, -Infinity, 6],
      [Infinity, 0, 2, Infinity, -Infinity, -Infinity, 4],
      [Infinity, Infinity, 0, Infinity, -Infinity, -Infinity, 2],
      [Infinity, Infinity, Infinity, 0, Infinity, Infinity, Infinity],
      [Infinity, Infinity, Infinity, Infinity, -Infinity, -Infinity, Infinity],
      [Infinity, Infinity, Infinity, Infinity, -Infinity, -Infinity, Infinity],
      [Infinity, Infinity, Infinity, Infinity, -Infinity, -Infinity, 0]
    ],
    next: [
      [0, 1, 1, undefined, null, null, 1],
      [undefined, 1, 2, undefined, null, null, 2],
      [undefined, undefined, 2, undefined, null, null, 6],
      [undefined, undefined, undefined, 3, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, null, null, undefined],
      [undefined, undefined, undefined, undefined, null, null, undefined],
      [undefined, undefined, undefined, undefined, null, null, 6]
    ]
  }, shortestPaths(m));
}
