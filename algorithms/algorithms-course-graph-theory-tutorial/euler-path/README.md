# Eulerian path

## References
-[Sedgewick EulerianPath.java](https://algs4.cs.princeton.edu/41graph/EulerianPath.java.html)
-[Sedgewick DirectedEulerianPath.java](https://algs4.cs.princeton.edu/42digraph/DirectedEulerianPath.java.html)

## Warning
The representation of UNDIRECTED graphs with adjacency list
doubling an edge `(u,v)` in the adjacency lists of both `u` and `v`
is incorrect for the purpose of finding an Eulerian path in an undirected graph,
because there is no easy way to say if that's the same edge already traveled, 
or a different `(u,v)` edge.

For example consider the graph with double edges `(0,2)` and `(2,4)`:
```
Map(6) {
  0 => [ 1, 2, 2, 3 ],
  1 => [ 0, 3 ],
  2 => [ 0, 0, 4, 4 ],
  3 => [ 0, 1, 4, 5 ],
  4 => [ 2, 2, 3, 5 ],
  5 => [ 3, 4 ]
}
```

In the [edge weighted graph representation](https://algs4.cs.princeton.edu/43mst/EdgeWeightedGraph.java.html) the vertices adjacency lists keep edges as references hence preserving the edge identity:
```
    public void addEdge(Edge e) {
        int v = e.either();
        int w = e.other(v);
        validateVertex(v);
        validateVertex(w);
        adj[v].add(e);
        adj[w].add(e);
        E++;
    }
```
However, in the [general graph representation](https://algs4.cs.princeton.edu/41graph/Graph.java.html) the vertices adjacency lists keep the neighbouring vertices, hence unable to differentiate doubling edges:
```
    public void addEdge(int v, int w) {
        validateVertex(v);
        validateVertex(w);
        E++;
        adj[v].add(w);
        adj[w].add(v);
    }
``` 

In the [undirected graph eulerian path solution](https://algs4.cs.princeton.edu/41graph/EulerianPath.java.html) the ORDER of vertices is used to differentiate the edges:

```
    // create local view of adjacency lists, to iterate one vertex at a time
    // the helper Edge data type is used to avoid exploring both copies of an edge v-w
    Queue<Edge>[] adj = (Queue<Edge>[]) new Queue[G.V()];
    ...
    for (int v = 0; v < G.V(); v++) {
        for (int w : G.adj(v)) {
            ...
            else if (v < w) {
                Edge e = new Edge(v, w);
                adj[v].enqueue(e);
                adj[w].enqueue(e);
            }
        }
    }
```
