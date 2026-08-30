package storage

import "student-management-system/models"

type TeacherRepository interface {
	Load() ([]models.Teacher, error)
	Save([]models.Teacher) error
}
