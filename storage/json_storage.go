package storage

import (
	"encoding/json"
	"os"
	"student-management-system/models"
)

const fileName = "data/students.json"

func SaveStudents(students []models.Student) error {

	file, err := os.Create(fileName)

	if err != nil {
		return err
	}

	defer file.Close()

	encoder := json.NewEncoder(file)

	return encoder.Encode(students)
}

func LoadStudents() ([]models.Student, error) {

	file, err := os.Open(fileName)

	if err != nil {
		return []models.Student{}, nil
	}

	defer file.Close()

	var students []models.Student

	decoder := json.NewDecoder(file)

	err = decoder.Decode(&students)

	return students, err
}
