# Network Flow

## Test
```
find . -name 'test*' | xargs -L1 node
time node max-flow-dfs-recursive 100000  
time node max-flow-edmonds-karp-bfs 100000  
time node max-flow-edmonds-karp-bfs-recursive 100000  
```