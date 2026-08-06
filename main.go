package main

import (
	"fmt"

	"student-management-system/services"
	"student-management-system/storage"
)

func main() {

	students, _ := storage.LoadStudents()

	service := services.StudentService{
		Students: students,
	}

	fmt.Println("Student Management System Started")

	// TODO: Start CLI menu here

	_ = service
}