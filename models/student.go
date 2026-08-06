package models

type Student struct {
	ID    int    `json:"ID"`
	Name  string `json:"Name"`
	Age   int    `json:"Age"`
	Grade string `json:"Grade"`
}
