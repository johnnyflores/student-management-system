package api

import (
	"net/http"
)

func RegisterRoutes(
	mux *http.ServeMux,
	studentHandler *StudentHandler,
	courseHandler *CourseHandler,
) {

	// Student routes
	mux.HandleFunc("/students", func(w http.ResponseWriter, r *http.Request) {

		switch r.Method {

		case http.MethodGet:
			studentHandler.GetStudents(w, r)

		case http.MethodPost:
			studentHandler.CreateStudent(w, r)

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
			studentHandler.GetStudent(w, r)

		case http.MethodPut:
			studentHandler.UpdateStudent(w, r)

		case http.MethodDelete:
			studentHandler.DeleteStudent(w, r)

		default:
			http.Error(
				w,
				"Method not allowed",
				http.StatusMethodNotAllowed,
			)
		}
	})

	// Course routes
	mux.HandleFunc("/courses", func(w http.ResponseWriter, r *http.Request) {

		switch r.Method {

		case http.MethodGet:
			courseHandler.GetCourses(w, r)

		case http.MethodPost:
			courseHandler.CreateCourse(w, r)

		default:
			http.Error(
				w,
				"Method not allowed",
				http.StatusMethodNotAllowed,
			)
		}
	})

	mux.HandleFunc("/course", func(w http.ResponseWriter, r *http.Request) {

		switch r.Method {

		case http.MethodGet:
			courseHandler.GetCourse(w, r)

		default:
			http.Error(
				w,
				"Method not allowed",
				http.StatusMethodNotAllowed,
			)
		}
	})

	// Assign a student to a course
	mux.HandleFunc("/courses/students", func(w http.ResponseWriter, r *http.Request) {

		switch r.Method {

		case http.MethodGet:
			courseHandler.ViewCourseStudents(w, r)

		case http.MethodPost:
			courseHandler.AssignStudent(w, r)

		case http.MethodDelete:
			courseHandler.RemoveStudent(w, r)

		default:
			http.Error(
				w,
				"Method not allowed",
				http.StatusMethodNotAllowed,
			)
		}
	})
}
