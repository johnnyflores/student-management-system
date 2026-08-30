package storage

import (
	"os"
	"testing"

	"student-management-system/models"
)

func TestJSONStorageSaveAndLoad(t *testing.T) {

	file := "test_students.json"

	defer os.Remove(file)

	storage := JSONStorage{
		FileName: file,
	}

	students := []models.Student{
		{
			ID:    101,
			Name:  "Alice",
			Age:   20,
			Grade: "A",
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
		t.Errorf(
			"expected 1 student, got %d",
			len(result),
		)
	}

	if result[0].Name != "Alice" {
		t.Errorf(
			"expected Alice, got %s",
			result[0].Name,
		)
	}
}
