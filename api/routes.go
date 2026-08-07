package api

import (
	"net/http"
)


func RegisterRoutes(handler *StudentHandler) {


	http.HandleFunc(
		"/students",
		func(w http.ResponseWriter, r *http.Request) {

			switch r.Method {

			case http.MethodGet:
				handler.GetStudents(w, r)

			case http.MethodPost:
				handler.CreateStudent(w, r)

			default:
				http.Error(
					w,
					"method not allowed",
					http.StatusMethodNotAllowed,
				)
			}
		},
	)


	http.HandleFunc(
		"/student",
		handler.GetStudent,
	)
}