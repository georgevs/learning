https://www.youtube.com/watch?v=09_LlHjoEiY
https://github.com/williamfiset/algorithms

https://wingkwong.github.io/leetcode-the-hard-way/

Types of graphs - https://youtu.be/09_LlHjoEiY?t=149
- undirected
- directed (digraph)
- weighted

Special graphs - https://youtu.be/09_LlHjoEiY?t=294
- tree: undirected graph with no cycles, N nodes, N-1 edges
- rooted tree: tree with designed root node
  -- aborescence (out-tree): edges point out from the root
  -- anti-aborescence (in-tree): edges point towards the root
- directed acyclic graphs (DAG)
  * all out-trees are DAGs
  * algorithms: shortest path, topological order
- bipartite graphs: 
  * vertices are split between two sets U and V, 
  * each edge connects U and V
  * algorithms: maximum matches
  * releated to: network flow
- complete graphs:
  * graph with unique edge between every pair of vertices
  * Kn: complete graph with N nodes 

Representing graphs - https://youtu.be/09_LlHjoEiY?t=543
- adjacency matrix: 
  * m[v1][v2] represents edge/weight from v1 to v2
  * great for dense graphs O(V^2)
  * edge lookup is O(1)
- adjacency list:
  * Map v1 -> [(v2,w) ...]
  * great for sparse graphs
  * edge lookup is O(E)
- edge list:
  * unordered list of edges [(v1,v2,w) ...]

                       * * * 
 
Common graph theory problems - https://youtu.be/09_LlHjoEiY?t=832
- typical properties to consider:
  -- directed or undirected
  -- weighted or unweighted
  -- sparse or dense
  -- which representation will be efficient 

Shortest path problem - https://youtu.be/09_LlHjoEiY?t=905
* file://./shortest-path/test.js
- algorithms: bfs (unweighted graph), Dijkstra, Bellman-Ford, Floyd-Warshall, A*, ...
                      
Connectivity - https://youtu.be/09_LlHjoEiY?t=942
- does there exist a path between v1 and v2
- algorithms:
  -- union-find
  -- dfs: file://./search/dfs-iterative.js

Negative cycles - https://youtu.be/09_LlHjoEiY?t=975
* file://./negative-cycles/test.js
- does a weighted digraph have any negative cycles
- algorithms: Bellman-Ford, Floyd-Warshall
* presents a challenge for finding shortest path
* application in currency exchange arbitrages

Strongly connected components - https://youtu.be/09_LlHjoEiY?t=1071
* file://./strongly-connected-components/test.js
- self-contained cycles within a directed graph, where
  * every vertex within a cycle can reach every other vertexin the same cycle
- algorithms: Tarjan, Kosaraju  

Traveling Salesman Problem - https://youtu.be/09_LlHjoEiY?t=1116
* file://./traveling-salesman/test.js
- shortest (minimal cost) possible route, 
  * which visits each node exactly once,
  * and returns to the start node
- algorithms: Held-Karp (dynamic programming), branch-and-bound, etc.
- computationally challenging (NP-hard)

Bridges - https://youtu.be/09_LlHjoEiY?t=1178
* file://./bridges/test.js
- A bridge (cut edge) is any edge 
  * whose removal increases the number of connected components
- useful for finding weak points and bottlenecks

Articulation points - https://youtu.be/09_LlHjoEiY?t=1213
- Articulation point (cut point) is a node
  * whose removal increases the number of connected components

Minimum Spanning Tree (MST) - https://youtu.be/09_LlHjoEiY?t=1230
- subset of edges of a connected weighted graph,
  * which connects all vertices
  * without any cycles
  * minimum possible total weight
- algorithms: Kruskal, Prim, Boruvka

Network flow - https://youtu.be/09_LlHjoEiY?t=1300
- with infinite input how much flow can be pushed through a network (DAG)
 * where edge weights represent capacity
- algorithms: Ford-Fulkerson, Edmonds-Karp, Dinic

                        * * * 

Depth First Search overview - https://youtu.be/09_LlHjoEiY?t=1399
- fundamental search algorithm to explore nodes and edges
- it runs with O(V+E)
- building block to other algorithms: count connected components, determine connectivity, find bridges...
- DFS can:
  -- find connected components
  -- find minimum spanning tree (MST)
  -- detect and find cycles
  -- check if graph is bipartite
  -- find strongly connected components
  -- topologically sort the nodes of a graph
  -- find bridges and articulation points
  -- find augmeting paths in flow network
  -- generate mazes

Basic DFS - https://youtu.be/09_LlHjoEiY?t=1455

Connected components - https://youtu.be/09_LlHjoEiY?t=1701
- "coloring" component: identify each node of the same component with the same value
- connected components are NOT (necessarily) strongly connected components

                        * * * 

Breadth First Search (BFS) - https://youtu.be/09_LlHjoEiY?t=1999
* file: file://./breadth-first-search/bfs.js 
- particularily useful for finding the SHORTEST path on UNWEIGTHED graph

BFS shortest path on a grid - https://youtu.be/09_LlHjoEiY?t=2426
* file: file://./breadth-first-search-grid/bfs.js
- many problems can be represented using a grid
- a grid is also an implicit graph where neighbors are determined by the location in the grid
  -- finding a path through a maze
  -- finding a route through obstacles (dungeon problem statement)
- convert grid to graph
  -- label all cells with continuous numbers
  -- construct adj list/matrix
- adapt the grid data representation
  -- neighbors of cell i,j are cells offset with `direction vectors` [±1, ±1]
  -- (optionally) instead of pushing (i,j) into the bfs queue, 
      have separate queues for each grid dimention 

                        * * * 

Topological sort - https://youtu.be/09_LlHjoEiY?t=3384
- topological ordering is an ordering of the nodes in a directed graph where
  for each directed edge from A to B, A appears BEFORE B in the ordering
- topological sort can find a topolgical ordering in O(V+E) 
- topological ordering are NOT unique
- not all graphs have topological ordering (for example graph with cycle)
- graphs WITH topological ordering:
  -- directed acyclic graphs
  -- Trees 
- many real world problems can be modeled as directed graphs where events (nodes) happen BEFORE others
  -- class prerequisites
  -- program dependencies
  -- event scheduling
  -- assembly instructions
- how to validate a graph is DAG
  -- Tarjan strongly connected component algorithm

Topological sort algorithm for trees - https://youtu.be/09_LlHjoEiY?t=3663

Topological sort algorithm for graph - https://youtu.be/09_LlHjoEiY?t=3706
* file://./topological-sort/sort.js
- algorithm
  -- pick an unvisited node
  -- beginning the selected node DFS explore only unvisited nodes
  -- on the recursive callback, add the current node in reverse order
  -- repeat steps until no more unvisited nodes   

                        * * * 

Shortst and Longest path on DAG - https://youtu.be/09_LlHjoEiY?t=4193
* file://./single-source-shortest-paths-on-dag/topological-sort-shortest-paths.js
* https://github.com/williamfiset/Algorithms/blob/master/src/main/java/com/williamfiset/algorithms/graphtheory/TopologicalSortAdjacencyList.java
- Directed acyclic graph (DAG) is a graph with directed edges and no cycles
- the single source shortest path (SSSP) can be solved very efficiently (linear)
- another algorithm: find the SHORTEST path from one node to ALL other nodes in the graph 
  by using topological ordering
- similar problem: find the LONGEST path from one node to ALL other nodes.
  The problem is NP-hard for general graphs, but linear for DAGs.
  To solve multiply ALL edges by -1, solve for SHORTEST path, and multiply the result by -1.
 
                        * * * 

Dijkstra's shortest path algorithm - https://youtu.be/09_LlHjoEiY?t=4773
- single source shortest path algorithm for graphs with NON-NEGATIVE edge weights
- complexity can be O(E logV)
- 2 implementations:
  -- lazy
  -- eager

Quick algorithm overview - https://youtu.be/09_LlHjoEiY?t=4907
- maintain `dist[]` with distance to node
  -- initially infinity for all nodes, except 0 for the starting node
- maintain priority queue (PQ) of node-distance pairs sorted to minimize distance
- add (s,0) in PQ, and loop while not empty pulling next promissing (node,distance)
- iterate node's outward edges, and add new (node, distance) in PQ

Lazy Dijkstra - https://youtu.be/09_LlHjoEiY?t=4989
* file://./single-source-shortest-paths-on-dag/dijkstra-lazy-shortest-paths.js

Finding the optimal path - https://youtu.be/09_LlHjoEiY?t=5491
* file://./single-source-shortest-paths-on-dag/dijkstra-lazy-find-optimal-path.js
- optimization: stop evaluating shortest paths early when the target node is visited

Eager Dijkstra using indexed PQ - https://youtu.be/09_LlHjoEiY?t=5670
- the lazy approach adds multiple (key,weight) pairs, and lazily removes them
  because it's more efficient to add rather than update a PQ
- the lazy approach may be inefficient for DENSE graphs
- the eager approach avoids additional (key,weight) pairs by using INDEXED priority queue (IPQ)

D-ary heap optimization - https://youtu.be/09_LlHjoEiY?t=5990
- in dense graphs (ie large E/V) with a lot of updates it's better to use D-ary PQ
- D-ary PQ has D children per node rather than two in binary PQ
- general recomendation is D = E/V which gives O(E*logE/V(V))

Fibonacci heap optimization - https://youtu.be/09_LlHjoEiY?t=6148
- gives O(E + V*logV(V))
- difficult to implement
- impractical except for quite large graphs

                        * * * 

Bellman-Ford algorithm - https://youtu.be/09_LlHjoEiY?t=6646
* file://./single-source-shortest-paths-on-dag/shortest-paths-bellman-ford.js
* https://github.com/williamfiset/Algorithms/blob/master/src/main/java/com/williamfiset/algorithms/graphtheory/BellmanFordAdjacencyList.java
- single source shortest path algorithm
- simple, but worse time complexity
- for comparison: 
  -- BF complexity is O(EV) 
  -- Dijkstra complexity is O((E+V)log(V))s
  -- BF can handle NEGATIVE CYCLES, Dijkstra CAN'T

Negative cycles - https://youtu.be/09_LlHjoEiY?t=6854
- negative self-loops
- negative net gain of an arbitrary loop of nodes

Bellman-Ford algorithm steps - https://youtu.be/09_LlHjoEiY?t=6892
- initialize the start vertice w to 0, and repeat V times, 
    for each edge (v1,v2,xw) update w2 = min(w2, w1+xw)
- to detect negative cycles, repeat V times, 
    for each edge (v1,v2,xw) w2 = -Infinity if (w2 < w1+xw) (..aka loop is detected)

                        * * * 

Shortest Path (SP) Algorithms - https://youtu.be/09_LlHjoEiY?t=7580
- BFS vs. Dijkstra vs. Bellman-Ford vs. Floyd-Warshall

                        * * * 
                        
Floyd-Warshall algorithm - https://youtu.be/09_LlHjoEiY?t=7534
- ALL PAIRS shortest graph algorithm
- time complexity is O(V^3)
- optimal representaion is adjacency matrix:
  -- m[i][j] = xw for the edge from `i` to `j`
  -- m[i][j] = m[j][i] = `Infinity` if NO connection between `i` and `j`
- main idea: gradually find shortest paths `i` and `j` through ONLY subset of vertices
  -- start with direct route from `i` to `j` as best
  -- then check if connecting best routes `i` to `1`, and `1` to `j` is better 
    than the best route `i` to `j` not involving `1` (.. in this iteration only direct route is an option)
  -- then check if connecting best routes `i` to `2`, and `2` to `j` (possibly through `1`) is better 
    than the best route `i` to `j` (possibly through `1`) not involving `2`
  -- then check if connecting best routes `i` to `3`, and `3` to `j` (possibly through `1`,`2`) is better 
    than the best route `i` to `j` (possibly through `1`,`2`) not involving `3`
  ...
  -- at the end will have best routes `i` to `j` (possibly through 1,2,..n-1, n)

                        * * * 

Algorithm to find bridges and articulation points - https://youtu.be/09_LlHjoEiY?t=8959
* file://./bridges-and-articulation-points/bridges.js
- main idea:
  -- map vertices to indeces
  -- map edges to directed edges
  -- map vertices to lowest vertice index reachable over directed edges
  -- an edge is a bridge if its directed edge from vertex index is less than 
      its to vertex lowest vertice index reachable over directed edges

Articulation points - https://youtu.be/09_LlHjoEiY?t=9801
- an articulation point has `id` equal to `low` of a next node over a bridge,
  which is also an indicator of a cycle
- an articulation point MUST have more than a single OUTGOING edge

                        * * * 

Tarjan's algorithm for finding strongly connected components - https://youtu.be/09_LlHjoEiY?t=10653
* file://./strongly-connected-components/strongly-connected-components-tarjan.js
- strongly connected components

                        * * * 

Traveling salesman - https://youtu.be/09_LlHjoEiY?t=12012
* https://leetcode.com/problems/shortest-path-visiting-all-nodes/solution/
* file://./traveling-salesman/traveling-salesman.js

- definition:
  -- given a list of cities, and
  -- the distance between each city,
  -- what is the SHORTEST route to visit EACH city exactly ONCE, and
  -- RETURN to the origin city
- formal definition:
  -- given a COMPLETE weighted graph,
  -- what is Hamiltonian cycle of minimum cost

                        * * * 

Existence of Eulerian paths and ciycles - https://youtu.be/09_LlHjoEiY?t=13948
- Eulerian path: path which visits each edge exactly once
- Eulerian cycle: Eulerian path which starts and ends at the same vertex
- conditions for existence of eulerian PATH:
  -- all vertices with nonzero degree belong to a single connected component
  undirected graph: 
    -- all have even degree,  
    -- or exactly two vertices have odd (..those would be the start and end)
  directed graph: 
    -- at most one vertex has in-out=1, 
    -- and at most one vertex has out-in=1,
    -- and all others have in=out
- conditions for existence of eulerian CYCLE:
  undirected:
    -- all have even degree
  directed:
    -- all have in=out

Finding Eulerian paths and cycles - https://youtu.be/09_LlHjoEiY?t=14479
- prerequisite: find if Eulerian path exists:
  -- dg:0|1=+1,0|1=-1,*=0
  -- g:*=2i|2=2i+1
- find a start node:
  -- the node with extra OUTGOING edge will be the STARTING node
  -- the node with extra INGOING edge will be the ENDING node
  -- if ALL nodes have equal in/out edges there's an Eulerian cycle, and we can start enywhere


Prim's Minimum Spanning Tree - https://youtu.be/09_LlHjoEiY?t=15786
- MST: 
  -- subset of edges connecting ALL vertices 
  -- without cycles 
  -- where the sum of those edges weights is the minimum

Prims algorithm (Lazy):
file://./minimum-spanning-tree/minimum-spanning-tree-prim.js
- Q is a priority queue over the edges weight
- T is the result MST
- S is a set of vertices aready in T
- pick a random starting vertex `v`
- add the selected vertex in S, and enqueue all its edges into Q
- dequeue an edge `e` from Q, until either of its vertices `u` is NOT yet in S
- add the found edge `e` in T, and continue with `u` if |T|<|V|-1 (...there are still unconnected vertices)

Prims algorithm (Eager): https://youtu.be/09_LlHjoEiY?t=16626
- in the eager version on each step try to determine which INCOMMING edges 
  to select to include in the MST
- instead of include all edges of a node, RELAX (update) the destination node MOST promissing edge
- use INDEXED PRIORITY QUEUE to efficiently update key-value pairs

Graph edge density analysis - https://youtu.be/09_LlHjoEiY?t=17186
- adj list is faster in sparce graphs <50%
- adj matrix is faster in dense graphs >50%

                        * * * 

Max Flow Ford-Fulkerson method - https://youtu.be/09_LlHjoEiY?t=17910
file:///./network-flow/max-flow-dfs-recursive.js
- Flow graph: 
  -- edges have max CAPACITY, and flow VALUE
  -- SOURCE and SINK node
- the maximum flow problem:
  -- with INFINITE input source, 
  -- how much FLOW can we push through the network, 
  -- without exceeding the CAPACITY of any edge
- the maximum flow EQUALS the SUM of the flows entering the sink

                        * * * 

Max flow: unweighted bipartite graph matching - https://youtu.be/09_LlHjoEiY?t=19645
- bipartite graph - G=(V,E), V = X u Y, 0 = X n Y, all (u,v) of E: u of X, v of Y
- max cardinality bipartite matching (MCBM) - 
  given V, find E, such that sum(f(u,v)) is max/min for all (u,v)

- PROBLEM: match READERS with BOOKS in a library
  -- solution: max-flow with S connecting all readers, and all book connecting T
  -- An S to reader edge capacity represents maximum number allowed for this reader
  -- An book to T edge capacity represents maximum copies of the book the library owns

- PROBLEM: mice and owls - https://youtu.be/09_LlHjoEiY?t=20291
  -- M mice can run distance `r` before being caught by the owl
  -- H holes with various capacity `w` each
  -- what's the maximum capacity of mice which can hide
  -- solution: max-flow with S connecting all mice, and all holes connecting T
  -- c(S Mi)=1, c(Hi T)=Wi, (Mi Hj) in E with c(Mi Hi)=1 if distance(Mi Hj) < r 

- PROBLEM: elementary math - https://youtu.be/09_LlHjoEiY?t=20771
  -- Given pairs of numbers (a,b), select one of 3 operators (+,-,x)
     such that the solutions are unique
  -- solution: max-flow with S connecting pairs, and possible unique solutions connecting T
  -- c(S Pi)=1, c(Rj T)=1, (Pi Rj) in E with c(Pi Rj)=1 if Rj in Pi's possible solutions

Network flow: Edmonds-Karp algorithm - https://youtu.be/09_LlHjoEiY?t=21381
file:///./network-flow/max-flow-edmonds-karp-bfs.js
- Edmonds-Karp algorithm is an improvement of Max Flow Ford-Fulkerson method 
  by selecting augmenting paths with BFS.

Network flow: capacity scaling - https://youtu.be/09_LlHjoEiY?t=22207
- Capacity scaling is an euristic improvement of Max Flow Ford-Fulkerson method 
  by selecting augmenting paths with edges ONLY above some threshold 'd'
- The threshold initial value is the maximum power of 2 value which is
  less or equal than the largest edge capacity in the flow graph.
- The threshold value is split in half each time no more augmenting path exist
  with residual capacity above the threshold.
- Once the threshold value is zero the process is done.

Network flow: Dinic's algorithm - https://youtu.be/09_LlHjoEiY?t=23104
- Dinic's algorithm is an improvement of the Max Flow Ford-Fulkerson method
  by selecting augmenting paths from LEVEL GRAPHS of the flow graph
- A level graph is a sub-graph of the flow graph with only those edges which:
  -- still have non-zero residual capacity, and
  -- have vertices STRICTLY from lower to higher level (BFS distance from the source)
- The algorithm first exhausts all possible augmenting paths form the current level graph,
  then the next level graph is constructed, OR if one can't be constructed the process is done 

THE END
