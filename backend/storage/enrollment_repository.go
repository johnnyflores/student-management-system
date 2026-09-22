package storage

import "student-management-system/models"

type EnrollmentRepository interface {
	Load() ([]models.Enrollment, error)

	Save([]models.Enrollment) error
}
