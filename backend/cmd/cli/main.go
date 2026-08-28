package main

import (
	"log"

	"student-management-system/cli"
	"student-management-system/internal/app"
)

func main() {

	// Create student service
	studentService, err := app.NewStudentService()

	if err != nil {
		log.Fatal(err)
	}

	// Create course service
	courseService, err := app.NewCourseService(studentService)

	if err != nil {
		log.Fatal(err)
	}

	// Start CLI
	cli.Start(studentService, courseService)
}
