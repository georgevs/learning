package main

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestBalancer(t *testing.T) {
	balancer := NewBalancer(10)
	assert.Equal(t, 10, len(balancer.pool))
}
