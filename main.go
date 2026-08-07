package main

import (
	"fmt"
	"net/http"

	"student-management-system/api"
	"student-management-system/services"
	"student-management-system/storage"
)


func main() {


	jsonStorage := storage.JSONStorage{
		FileName: "data/students.json",
	}


	students, _ := jsonStorage.Load()


	service := services.StudentService{
		Students: students,
		Repository: jsonStorage,
	}


	handler := api.StudentHandler{
		Service: &service,
	}


	api.RegisterRoutes(&handler)


	fmt.Println("API running on port 8080")


	http.ListenAndServe(":8080", nil)
}