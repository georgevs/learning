const { asserteq, SomeArray: SA } = require('../asserteq');
const { graph } = require('../graph');

const xs = [
  [0,7],[0,9],[0,11],
  [3,2],[3,4],
  [6,5],[6,7],
  [7,0],[7,3],[7,6],[7,11],
  [8,1],[8,9],[8,12],
  [9,0],[9,8],[9,10],
  [10,1],[10,9],
  [11,0],[11,7]
];

const g = graph(xs);

const test = (shortestPath) => {
  asserteq([0, 7, 3, 4], shortestPath(g, 0, 4));
  asserteq(SA.of([0, 9, 10, 1], [0, 9, 8, 1]), shortestPath(g, 0, 1));
};

if (require.main === module) {
  test(require('./fcc-shortest-path'));
}
