const findPath = require('./find-path-bfs-recursive');
const maxFlow = require('./max-flow-ford-fulkerson');

module.exports = maxFlow(findPath);

if (require.main === module) {
  require('./test-max-flow')(module.exports, process.argv[2]);
}
