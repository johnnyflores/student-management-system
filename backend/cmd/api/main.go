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

	courseService, err := app.NewCourseService(studentService)
	if err != nil {
		log.Fatal(err)
	}

	courseHandler := api.CourseHandler{
		Service: courseService,
	}

	mux := http.NewServeMux()
	api.RegisterRoutes(mux, &studentHandler, &courseHandler)

	fmt.Println("API running on :8080")

	if err := http.ListenAndServe(":8080", api.EnableCORS(mux)); err != nil {
		log.Fatal(err)
	}
}