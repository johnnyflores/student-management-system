package models

type PaginatedCourses struct {
	Courses   []Course `json:"courses"`
	Page       int       `json:"page"`
	Limit      int       `json:"limit"`
	Total      int       `json:"total"`
	TotalPages int       `json:"totalPages"`
}
