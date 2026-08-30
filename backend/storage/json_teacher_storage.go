package storage

import (
	"encoding/json"
	"os"

	"student-management-system/models"
)

type JSONTeacherStorage struct {
	FileName string
}

func (j JSONTeacherStorage) Load() ([]models.Teacher, error) {
	file, err := os.Open(j.FileName)

	if err != nil {
		return []models.Teacher{}, err
	}

	defer file.Close()

	var teachers []models.Teacher

	err = json.NewDecoder(file).Decode(&teachers)

	return teachers, err
}

func (j JSONTeacherStorage) Save(teachers []models.Teacher) error {
	file, err := os.Create(j.FileName)

	if err != nil {
		return err
	}

	defer file.Close()

	return json.NewEncoder(file).Encode(teachers)
}
