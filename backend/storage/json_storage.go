package storage

import (
	"encoding/json"
	"os"

	"student-management-system/models"
)

type JSONStorage struct {
	FileName string
}

func (j JSONStorage) Load() ([]models.Student, error) {

	file, err := os.Open(j.FileName)

	if err != nil {
		return []models.Student{}, err
	}

	defer file.Close()

	var students []models.Student

	err = json.NewDecoder(file).Decode(&students)

	return students, err
}

func (j JSONStorage) Save(students []models.Student) error {

	file, err := os.Create(j.FileName)

	if err != nil {
		return err
	}

	defer file.Close()

	return json.NewEncoder(file).Encode(students)
}
