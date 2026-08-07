package api

import (
	"net/http"
)

func RegisterRoutes(mux *http.ServeMux, handler *StudentHandler) {

	mux.HandleFunc("/students", func(w http.ResponseWriter, r *http.Request) {

		switch r.Method {

		case http.MethodGet:
			handler.GetStudents(w, r)

		case http.MethodPost:
			handler.CreateStudent(w, r)

		default:
			http.Error(
				w,
				"Method not allowed",
				http.StatusMethodNotAllowed,
				)
		}
	})


	mux.HandleFunc("/student", func(w http.ResponseWriter, r *http.Request) {

		switch r.Method {

		case http.MethodGet:
			handler.GetStudent(w, r)

		case http.MethodPut:
			handler.UpdateStudent(w, r)

		case http.MethodDelete:
			handler.DeleteStudent(w, r)

		default:
			http.Error(
				w,
				"Method not allowed",
				http.StatusMethodNotAllowed,
			)
		}
	})
}