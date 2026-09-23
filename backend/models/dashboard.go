package models

type DashboardStats struct {
	Students    int `json:"students"`
	Teachers    int `json:"teachers"`
	Courses     int `json:"courses"`
	Enrollments int `json:"enrollments"`
}
