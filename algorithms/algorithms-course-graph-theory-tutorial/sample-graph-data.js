const vertices = Array.from('ABCDEFGHIJ').map(Symbol);
const [A, B, C, D, E, F, G, H, I, J, K] = vertices;

// directed acyclic graph
const dagxs = [
  [A, B, 3], [A, C, 6], 
  [B, C, 4], [B, D, 4], [B, E, 11], 
  [C, D, 8], [C, G, 11], 
  [D, E, -4], [D, F, 5], [D, G, 2], 
  [E, H, 9], 
  [F, H, 1],
  [G, H, 2]
];

// negative cycle directed graph
const ncdgxs = [
  [0, 1, 1], [0, 2, 1],
  [1, 3, 4],
  [2, 1, 1],
  [3, 2, -6], [3, 4, 1], [3, 5, 1],
  [4, 5, 1], [4, 6, 3],
  [5, 6, 1]
];

// strongly connected components directed graph
const sscdgxs = [
  [A, B], [A, C],
  [B, A], [B, D],
  [C, A], [C, D],
  [D, F],
  [E, C], [E, F], [E, H],
  [G, E],
  [H, G],
  [I, G], [I, H]
];

// traveling salesaman problem
const tspdgxs = [
  [A,B,4],[A,C,1],[A,D,9],
  [B,A,3],[B,C,6],[B,D,11],
  [C,A,4],[C,B,1],[C,D,2],
  [D,A,6],[D,B,5],[D,C,-4]
];

// bridges
const bgxs = [
  [0,1],[0,2],
  [1,0],[1,2],
  [2,0],[2,1],[2,3],[2,5],
  [3,2],[3,4],
  [4,3],
  [5,2],[5,6],[5,8],
  [6,5],[6,7],
  [7,6],[7,8]
];

// minimum spanning tree (MST)
const mstgxs = [
  [A,B,5],[A,D,9],[A,E,1],
  [B,A,5],[B,C,4],[B,D,2]
  [C,B,4],[C,H,4],[C,I,1],[C,J,8],
  [D,A,9],[D,B,2],[D,E,2],[D,F,5],[D,G,1],[D,H,2],
  [E,A,1],[E,D,2],[E,F,1],
  [F,D,5],[F,E,1],[F,G,7],
  [G,D,1],[G,F,7],[G,H,1],[G,I,4],
  [H,C,4],[H,D,2],[H,G,1],[H,I,6],
  [I,C,1],[I,G,4],[I,H,6],[I,J,0],
  [J,C,8],[J,I,0]
];

// network flow
const nfdgxs = [
  [A,B,1],[A,C,2],[A,D,1],
  [B,E,2],[B,F,4],
  [C,F,5],[C,G,6],
  [D,E,4],[D,I,8],
  [E,H,7],[E,I,1],
  [F,H,3],[F,J,3],
  [G,J,3],
  [H,K,1],
  [I,K,3],
  [J,K,4]
];

// depth first search
const dfsgxs = [
  [0,1],[0,9],
  [1,0],[1,8],
  [2,3],
  [3,2],[3,4],[3,5],[3,7],
  [4,3],
  [5,3],[5,6],
  [6,5],[6,7],
  [7,3],[7,6],[7,8],[7,10],[7,11],
  [8,1],[8,7],[8,9],
  [9,0],[9,8],
  [10,7],[10,11],
  [11,7],[11,10],
  [13,0],[13,14],
  [14,0],[14,8],[14,13],
  [15,2],[15,9],[15,10],
  [16,5],
  [17,5]
];

// coloring components
const ccgxs = [
  [0,4],[0,8],[0,13],[0,14],
  [1,5],
  [2,9],[2,15],
  [3,9],
  [4,0],[4,8],
  [5,1],[5,16],[5,17],
  [6,7],[6,11],
  [7,6],[7,11],
  [8,0],[8,4],[8,14],
  [9,2],[9,3],[9,15],
  [10,15],
  [11,6],[11,7]
];

module.exports = { 
  dagxs, ncdgxs, sscdgxs, 
  tspdgxs, bgxs, mstgxs, 
  nfdgxs, ccgxs,
  vertices
};
