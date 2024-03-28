package dbs

type Db interface {
	Get(env string) (ver string, err error)
}
