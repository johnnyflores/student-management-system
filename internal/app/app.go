package app

import (
	"student-management-system/services"
	"student-management-system/storage"
)


func NewStudentService() (*services.StudentService, error) {

	repository := storage.JSONStorage{
		FileName: "data/students.json",
	}


	students, err := repository.Load()

	if err != nil {
		return nil, err
	}


	service := &services.StudentService{
		Students:    students,
		Repository: repository,
	}


	return service, nil
}