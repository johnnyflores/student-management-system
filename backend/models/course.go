package models

type Course struct {
	ID       int    `json:"ID"`
	Name     string `json:"Name"`
	Teacher  int    `json:"Teacher"`
	Students []int  `json:"Students"`
}
