package main

import (
	"fmt"
	"log"
	"net/http"

	"student-management-system/api"
	"student-management-system/internal/app"
)

func main() {
	service, err := app.NewStudentService()
	if err != nil {
		log.Fatal(err)
	}

	handler := api.StudentHandler{
		Service: service,
	}

	mux := http.NewServeMux()
	api.RegisterRoutes(mux, &handler)

	fmt.Println("API running on :8080")

	if err := http.ListenAndServe(":8080", api.EnableCORS(mux)); err != nil {
		log.Fatal(err)
	}
}