package main

import (
	"student-management-system/cli"
	"student-management-system/services"
	"student-management-system/storage"
)

func main() {

	students, _ := storage.LoadStudents()

	service := services.StudentService{
		Students: students,
	}

	cli.Start(&service)

	_ = service
}
