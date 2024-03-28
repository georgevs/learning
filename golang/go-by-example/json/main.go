/*
Build:

	go build -o ./bin/ ./go-by-example/json && ./bin/json
*/
package main

import (
	"encoding/json"
	"fmt"
	"os"
)

type Data struct {
	Page   int      `json:"page"`
	Fruits []string `json:"fruits"`
}

func json_marshal_unmarshal() {
	bytes, _ := json.Marshal(&Data{
		Page:   42,
		Fruits: []string{"apple", "peach"},
	})
	fmt.Println(string(bytes))

	data := Data{}
	json.Unmarshal(bytes, &data)
	fmt.Println(data)
}

func json_to_writer() {
	data := Data{
		Page:   42,
		Fruits: []string{"apple", "peach"},
	}
	enc := json.NewEncoder(os.Stdout)
	enc.Encode(&data)
}

func main() {
	json_marshal_unmarshal()
	json_to_writer()
}
