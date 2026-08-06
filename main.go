package main

import (
	"student-management-system/cli"
	"student-management-system/services"
	"student-management-system/storage"
)

func main() {

	jsonStorage := storage.JSONStorage{
		FileName: "data/students.json",
	}

	students, _ := jsonStorage.Load()

	service := services.StudentService{
		Students:   students,
		Repository: jsonStorage,
	}

	cli.Start(&service)

	_ = service
}
