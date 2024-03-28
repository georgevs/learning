package main

type WorkerPool []*Worker

func (pool WorkerPool) Len() int           { return len(pool) }
func (pool WorkerPool) Less(i, j int) bool { return pool[i].load < pool[j].load }

func (pool WorkerPool) Swap(i, j int) {
	pool[i], pool[j] = pool[j], pool[i]
	pool[i].index = i
	pool[j].index = j
}

func (pool *WorkerPool) Push(x any) {
	worker := x.(*Worker)
	worker.index = len(*pool)
	*pool = append(*pool, worker)
}

func (pool *WorkerPool) Pop() any {
	n := len(*pool)
	worker := (*pool)[n-1]
	*pool = (*pool)[0 : n-1]
	return interface{}(worker)
}
