package models

import "time"

type Enrollment struct {
	ID         int       `json:"id"`
	CourseID   int       `json:"courseId"`
	StudentID  int       `json:"studentId"`
	EnrolledAt time.Time `json:"enrolledAt"`
}
