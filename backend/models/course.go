package models

type Course struct {
	ID       int   `json:"ID"`
	Name     string `json:"Name"`
	Teacher  string `json:"Teacher"`
	Students []int `json:"Students"`
}

