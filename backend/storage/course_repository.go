package storage

import "student-management-system/models"

type CourseRepository interface {
	Load() ([]models.Course, error)

	Save([]models.Course) error
}
