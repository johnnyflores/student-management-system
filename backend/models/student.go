package models

import "time"

type Student struct {
	ID          int           `json:"id"`
	FirstName   string        `json:"firstName"`
	LastName    string        `json:"lastName"`
	Email       string        `json:"email"`
	Phone       string        `json:"phone"`
	DateOfBirth time.Time     `json:"dateOfBirth"`
	Grade       GradeLevel    `json:"grade"`
	Status      StudentStatus `json:"status"`
	CreatedAt   time.Time     `json:"createdAt"`
	UpdatedAt   time.Time     `json:"updatedAt"`
}

type GradeLevel string

const (
	Grade1  GradeLevel = "1"
	Grade2  GradeLevel = "2"
	Grade3  GradeLevel = "3"
	Grade4  GradeLevel = "4"
	Grade5  GradeLevel = "5"
	Grade6  GradeLevel = "6"
	Grade7  GradeLevel = "7"
	Grade8  GradeLevel = "8"
	Grade9  GradeLevel = "9"
	Grade10 GradeLevel = "10"
	Grade11 GradeLevel = "11"
	Grade12 GradeLevel = "12"
)

func (g GradeLevel) IsValid() bool {
	switch g {
	case Grade1, Grade2, Grade3, Grade4,
		Grade5, Grade6, Grade7, Grade8,
		Grade9, Grade10, Grade11, Grade12:
		return true
	default:
		return false
	}
}

type StudentStatus string

const (
	StudentActive    StudentStatus = "active"
	StudentInactive  StudentStatus = "inactive"
	StudentGraduated StudentStatus = "graduated"
)

func (s StudentStatus) IsValid() bool {
	switch s {
	case StudentActive, StudentInactive, StudentGraduated:
		return true
	default:
		return false
	}
}
