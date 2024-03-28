# Minimum Spanning Tree

## Prim's algorithm (CLRS 23.2)
```
MST-PRIM G(V E) -> T
  
```

## Kruskal algorithm (CLRS 23.2)
```
MST-KRUSKAL G(V E) -> T
  S = { v -> {v} }
  Q = SORT E

  for e <- Q
    u,v <- e  
    if S[u] != S[v]
      T <- e
      S[u] = S[v] = S[u] + S[v]
```