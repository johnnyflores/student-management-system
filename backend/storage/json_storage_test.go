package storage

import (
	"os"
	"testing"
	"time"

	"student-management-system/models"
)

func TestJSONStorageSaveAndLoad(t *testing.T) {
	file := "test_students.json"

	defer os.Remove(file)

	storage := JSONStorage{
		FileName: file,
	}

	dateOfBirth := time.Date(
		2008, 5, 10,
		0, 0, 0, 0,
		time.UTC,
	)

	students := []models.Student{
		{
			ID:          101,
			FirstName:   "Alice",
			LastName:    "Smith",
			Email:       "alice.smith@test.local",
			Phone:       "+10000000001",
			DateOfBirth: dateOfBirth,
			Grade:       models.Grade12,
			Status:      models.StudentActive,
		},
	}

	err := storage.Save(students)

	if err != nil {
		t.Errorf("save failed: %v", err)
	}

	result, err := storage.Load()

	if err != nil {
		t.Errorf("load failed: %v", err)
	}

	if len(result) != 1 {
		t.Fatalf(
			"expected 1 student, got %d",
			len(result),
		)
	}

	if result[0].FirstName != "Alice" {
		t.Errorf(
			"expected Alice, got %s",
			result[0].FirstName,
		)
	}

	if result[0].LastName != "Smith" {
		t.Errorf(
			"expected Smith, got %s",
			result[0].LastName,
		)
	}

	if result[0].Email != "alice.smith@test.local" {
		t.Errorf(
			"expected alice.smith@test.local, got %s",
			result[0].Email,
		)
	}

	if result[0].Grade != models.Grade12 {
		t.Errorf(
			"expected grade 12, got %s",
			result[0].Grade,
		)
	}

	if result[0].Status != models.StudentActive {
		t.Errorf(
			"expected active status, got %s",
			result[0].Status,
		)
	}

	if !result[0].DateOfBirth.Equal(dateOfBirth) {
		t.Errorf(
			"expected date of birth %v, got %v",
			dateOfBirth,
			result[0].DateOfBirth,
		)
	}
}
