package storage

import (
	"encoding/json"
	"os"

	"student-management-system/models"
)

type JSONEnrollmentStorage struct {
	FileName string
}

func (r JSONEnrollmentStorage) Load() ([]models.Enrollment, error) {
	data, err := os.ReadFile(r.FileName)
	if err != nil {
		return nil, err
	}

	var enrollments []models.Enrollment

	if err := json.Unmarshal(data, &enrollments); err != nil {
		return nil, err
	}

	return enrollments, nil
}

func (r JSONEnrollmentStorage) Save(
	enrollments []models.Enrollment,
) error {
	data, err := json.MarshalIndent(enrollments, "", "  ")
	if err != nil {
		return err
	}

	return os.WriteFile(
		r.FileName,
		data,
		0644,
	)
}
