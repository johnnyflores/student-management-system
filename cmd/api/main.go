package main

import (
	"fmt"
	"net/http"

	"student-management-system/api"
	"student-management-system/internal/app"
)


func main() {

	service, err := app.NewStudentService()

	if err != nil {
		panic(err)
	}


	handler := api.StudentHandler{
		Service: service,
	}


	api.RegisterRoutes(&handler)


	fmt.Println("API running on port 8080")


	http.ListenAndServe(":8080", nil)
}