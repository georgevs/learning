package handlers

import (
	"encoding/json"
	"net/http"
	"strings"

	"github.com/georgevs/microservice/version/data"
	"github.com/georgevs/microservice/version/dbs"
	"github.com/georgevs/microservice/version/stats"
)

type Version struct {
	db   dbs.Db
	info chan stats.Stats
}

func NewVersion(db dbs.Db, info chan stats.Stats) *Version {
	return &Version{db: db, info: info}
}

func (h *Version) ServeHTTP(w http.ResponseWriter, req *http.Request) {
	switch req.Method {
	case http.MethodGet:
		env := strings.TrimPrefix(req.URL.Path, "/version/")
		enc := json.NewEncoder(w)
		if ver, err := h.db.Get(env); err != nil {
			enc.Encode(data.Result{Error: err.Error()})
		} else {
			enc.Encode(data.Result{Version: ver})
		}

	default:
		w.WriteHeader(http.StatusMethodNotAllowed)
	}

	h.info <- stats.Stats{}
}
