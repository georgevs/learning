const queue = require('../queue');

// R,C grid matrix size
// m :: grid matrix 
// sr,sc :: start position
const solution = (R, C, m, sr, sc) => {
  const rq = queue();
  const cq = queue();
  let move_count = 0;
  let nodes_left_in_layer = 1;
  let nodes_in_next_layer = 0;
  let reached_end = false;
  const visited = Array.from(Array(R), () => Array(C).fill(false));

  // dr,dc direction vectors North,South,East,West 
  const dr = [-1,+1,0,0];
  const dc = [0,0,+1,-1];

  const solve = () => {
    rq.enqueue(sr);
    cq.enqueue(sc);
    visited[sr][sc] = true;
    while (!rq.empty()) {
      const r = rq.dequeue(), c = cq.dequeue();
      if (m[r][c] === 'E') { reached_end = true; break }
      explore_neighbours(r, c);
      nodes_left_in_layer--;
      if (nodes_left_in_layer === 0) {
        nodes_left_in_layer = nodes_in_next_layer;
        nodes_in_next_layer = 0;
        move_count++;
      }
    }
    return reached_end ? move_count : -1;
  };

  const explore_neighbours = (r, c) => {
    for (let i = 0; i < 4; ++i) {
      const rr = r + dr[i], cc = c + dc[i];
      if (rr < 0 || R <= rr || cc < 0 || C <= cc) { continue }
      if (visited[rr][cc]) { continue }
      if (m[rr][cc] === '#') { continue } // obstacle
      rq.enqueue(rr);
      cq.enqueue(cc);
      visited[rr][cc] = true;
      nodes_in_next_layer++;
    }
  };

  return solve();
};

const findPath = (m, sr, sc) => {
  return solution(m.length, m[0].length, m, sr, sc);
};

module.exports = findPath;
