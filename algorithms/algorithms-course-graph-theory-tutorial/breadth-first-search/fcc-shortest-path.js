// https://youtu.be/09_LlHjoEiY?t=2208

const queue = require('../queue');

// n :: number of nodes
// g :: adjacency list
const solution = (n, g) => {
  // bfs :: (s, e) -> p
  // s :: start node, 0 <= s < n
  // e :: end node, 0 <= e < n
  // p :: shortest path
  const bfs = (s, e) => {
    const prev = solve(s);
    return reconstructPath(s, e, prev);
  };
  
  // solve :: s -> prev
  // returns array of parents per node 
  const solve = (s) => {
    const q = queue();
    q.enqueue(s);
    const visited = Array(n).fill(false);
    visited[s] = true;
    const prev = Array(n);
    while (!q.empty()) {
      const node = q.dequeue();
      const neighbours = g.get(node);
      for (const next of neighbours) {
        if (!visited[next]) {
          q.enqueue(next);
          visited[next] = true;
          prev[next] = node;   // <--- `next` PARENT is `node`
        }
      }
    }
    return prev;
  };

  // reconstructPath :: (s, e, prev) -> p
  const reconstructPath = (s, e, prev) => {
    const path = [];
    for (let at = e; at !== undefined; at = prev[at]) {
      path.push(at);
    }
    path.reverse();
    return path[0] === s ? path : [];
  };

  return bfs;
};

const shortestPath = (g,s,e) => {
  const bfs = solution(g.vertices().length, { get: g.neighbours });
  return bfs(s, e);
};

module.exports = shortestPath;
