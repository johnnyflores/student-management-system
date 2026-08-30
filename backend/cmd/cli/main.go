package main

import (
	"log"

	"student-management-system/cli"
	"student-management-system/internal/app"
)

func main() {

	studentService, err := app.NewStudentService()

	if err != nil {
		log.Fatal(err)
	}

	teacherService, err := app.NewTeacherService()

	if err != nil {
		log.Fatal(err)
	}

	courseService, err := app.NewCourseService(
		studentService,
		teacherService,
	)

	if err != nil {
		log.Fatal(err)
	}

	cli.Start(
		studentService,
		teacherService,
		courseService,
	)
}
