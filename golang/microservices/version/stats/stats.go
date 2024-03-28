package stats

import (
	"fmt"
	"time"
)

type Stats struct{} // TBD

type StatsAggregator struct{} // TBD

func NewStatsAggregator() *StatsAggregator {
	return &StatsAggregator{}
}

func (sa *StatsAggregator) Run(info chan Stats) {
	quantStart := time.Now()
	quantDeadline := quantStart.Add(1 * time.Second)
	var quantRequests uint
	var totalRequests uint64
	for {
		select {
		case <-info:
			quantRequests++
			totalRequests++
		case <-time.After(1 * time.Second):
		}
		if quantDeadline.Before(time.Now()) {
			fmt.Printf("STAT[%v]: N=%v R=%.1f/s\n",
				time.Now().Unix(), totalRequests,
				float64(quantRequests)/float64(time.Since(quantStart).Milliseconds())*1000,
			)
			quantStart = time.Now()
			quantDeadline = quantStart.Add(1 * time.Second)
			quantRequests = 0
		}
	}
}
