package services

import (
	"student-management-system/models"
)

type MockRepository struct {
	Students []models.Student
}

func (m *MockRepository) Load() ([]models.Student, error) {

	return m.Students, nil
}

func (m *MockRepository) Save(students []models.Student) error {

	m.Students = students

	return nil
}
