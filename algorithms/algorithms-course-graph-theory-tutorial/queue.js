const queue = () => {
  const xs = [];
  const enqueue = (x) => { xs.push(x) };
  const dequeue = () => xs.shift();
  const empty = () => xs.length === 0;
  return { enqueue, dequeue, empty };
};

module.exports = queue;
