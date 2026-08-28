package storage

import (
	"encoding/json"
	"io"
	"os"

	"student-management-system/models"
)

type JSONCourseStorage struct {
	FileName string
}

func (j JSONCourseStorage) Load() ([]models.Course, error) {

	file, err := os.Open(j.FileName)

	if err != nil {
		return []models.Course{}, err
	}

	defer file.Close()

	var courses []models.Course

	err = json.NewDecoder(file).Decode(&courses)

	if err == io.EOF {
		return []models.Course{}, nil
	}

	return courses, err
}

func (j JSONCourseStorage) Save(courses []models.Course) error {

	file, err := os.Create(j.FileName)

	if err != nil {
		return err
	}

	defer file.Close()

	return json.NewEncoder(file).Encode(courses)
}
