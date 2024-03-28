const { asserteq } = require('../asserteq');

const maze = [
  ['S','.','.','#','.','.','.'],
  ['.','#','.','.','.','#','.'],
  ['.','#','.','.','.','.','.'],
  ['.','.','#','#','.','.','.'],
  ['#','.','#','E','.','#','.'],
];

const test = (findPath) => {
  asserteq(9, findPath(maze, 0, 0));
};

module.exports = test;

if (require.main === module) {
  test(require('./fcc-grid'));
}
