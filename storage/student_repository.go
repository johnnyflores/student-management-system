package storage

import "student-management-system/models"

type StudentRepository interface {
	Load() ([]models.Student, error)

	Save([]models.Student) error
}
