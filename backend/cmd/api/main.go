package main

import (
	"fmt"
	"log"
	"net/http"

	"student-management-system/api"
	"student-management-system/internal/app"
)

func main() {
	studentService, err := app.NewStudentService()
	if err != nil {
		log.Fatal(err)
	}

	studentHandler := api.StudentHandler{
		Service: studentService,
	}

	teacherService, err := app.NewTeacherService()
	if err != nil {
		log.Fatal(err)
	}

	courseService, err := app.NewCourseService(studentService, teacherService)
	if err != nil {
		log.Fatal(err)
	}

	courseHandler := api.CourseHandler{
		Service: courseService,
	}

	teacherHandler := api.TeacherHandler{
		Service: teacherService,
	}

	mux := http.NewServeMux()
	api.RegisterRoutes(mux, &studentHandler, &courseHandler, &teacherHandler)

	fmt.Println("API running on :8080")

	if err := http.ListenAndServe(":8080", api.EnableCORS(mux)); err != nil {
		log.Fatal(err)
	}
}
