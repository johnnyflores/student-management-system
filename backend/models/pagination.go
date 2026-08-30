package models

type PaginatedStudents struct {
	Students   []Student `json:"students"`
	Page       int       `json:"page"`
	Limit      int       `json:"limit"`
	Total      int       `json:"total"`
	TotalPages int       `json:"totalPages"`
}
