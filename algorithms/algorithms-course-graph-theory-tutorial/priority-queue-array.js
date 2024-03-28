
const queue = (order) => {
  const xs = [];
  let dirty = false;
  const enqueue = (x) => { xs.push(x); dirty = true };
  const dequeue = () => { if (dirty) { xs.sort(order); dirty = false } return xs.shift() };
  const empty = () => xs.length == 0;
  return { enqueue, dequeue, empty };
};

module.exports = queue;
