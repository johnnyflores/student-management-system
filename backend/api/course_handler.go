package api

import (
	"encoding/json"
	"errors"
	"net/http"
	"strconv"
	"strings"

	"student-management-system/models"
	"student-management-system/services"
)

type CourseHandler struct {
	Service *services.CourseService
}

func (h *CourseHandler) CreateCourse(
	w http.ResponseWriter,
	r *http.Request,
) {
	var request struct {
		Name    string `json:"Name"`
		Teacher string `json:"Teacher"`
	}

	err := json.NewDecoder(r.Body).Decode(&request)

	if err != nil {
		http.Error(w, "invalid request", http.StatusBadRequest)
		return
	}

	if strings.TrimSpace(request.Name) == "" {
		http.Error(w, "course name is required", http.StatusBadRequest)
		return
	}

	if strings.TrimSpace(request.Teacher) == "" {
		http.Error(w, "teacher is required", http.StatusBadRequest)
		return
	}

	course := models.Course{
		Name:    strings.TrimSpace(request.Name),
		Teacher: strings.TrimSpace(request.Teacher),
	}

	success := h.Service.AddCourse(&course)

	if !success {
		http.Error(
			w,
			"could not create course",
			http.StatusInternalServerError,
		)
		return
	}

	if err := h.Service.Save(); err != nil {
		http.Error(
			w,
			"failed to save course",
			http.StatusInternalServerError,
		)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)

	json.NewEncoder(w).Encode(course)
}

func (h *CourseHandler) GetCourses(
	w http.ResponseWriter,
	r *http.Request,
) {
	courses := h.Service.GetCourses()

	w.Header().Set("Content-Type", "application/json")

	json.NewEncoder(w).Encode(courses)
}

func (h *CourseHandler) GetCourse(
	w http.ResponseWriter,
	r *http.Request,
) {
	id, err := strconv.Atoi(r.URL.Query().Get("id"))

	if err != nil {
		http.Error(w, "invalid id", http.StatusBadRequest)
		return
	}

	course := h.Service.SearchCourse(id)

	if course == nil {
		http.Error(w, "course not found", http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "application/json")

	json.NewEncoder(w).Encode(course)
}

func (h *CourseHandler) AssignStudent(
	w http.ResponseWriter,
	r *http.Request,
) {
	courseID, err := strconv.Atoi(
		r.URL.Query().Get("course_id"),
	)

	if err != nil || courseID < 1 {
		http.Error(
			w,
			"invalid course_id",
			http.StatusBadRequest,
		)
		return
	}

	studentID, err := strconv.Atoi(
		r.URL.Query().Get("student_id"),
	)

	if err != nil || studentID < 1 {
		http.Error(
			w,
			"invalid student_id",
			http.StatusBadRequest,
		)
		return
	}

	err = h.Service.AssignStudent(
		courseID,
		studentID,
	)

	if err != nil {

		switch {
		case errors.Is(err, services.ErrCourseNotFound):
			http.Error(
				w,
				"course not found",
				http.StatusNotFound,
			)

		case errors.Is(err, services.ErrStudentNotFound):
			http.Error(
				w,
				"student not found",
				http.StatusNotFound,
			)

		case errors.Is(err, services.ErrAlreadyEnrolled):
			http.Error(
				w,
				"student is already enrolled in this course",
				http.StatusConflict,
			)

		default:
			http.Error(
				w,
				"could not assign student",
				http.StatusInternalServerError,
			)
		}

		return
	}

	if err := h.Service.Save(); err != nil {
		http.Error(
			w,
			"failed to save course",
			http.StatusInternalServerError,
		)
		return
	}

	course := h.Service.SearchCourse(courseID)

	w.Header().Set("Content-Type", "application/json")

	json.NewEncoder(w).Encode(course)
}

func (h *CourseHandler) RemoveStudent(
	w http.ResponseWriter,
	r *http.Request,
) {
	courseID, err := strconv.Atoi(
		r.URL.Query().Get("course_id"),
	)

	if err != nil || courseID < 1 {
		http.Error(
			w,
			"invalid course_id",
			http.StatusBadRequest,
		)
		return
	}

	studentID, err := strconv.Atoi(
		r.URL.Query().Get("student_id"),
	)

	if err != nil || studentID < 1 {
		http.Error(
			w,
			"invalid student_id",
			http.StatusBadRequest,
		)
		return
	}

	err = h.Service.RemoveStudent(
		courseID,
		studentID,
	)

	if err != nil {

		switch {
		case errors.Is(err, services.ErrCourseNotFound):
			http.Error(
				w,
				"course not found",
				http.StatusNotFound,
			)

		case errors.Is(err, services.ErrEnrollmentNotFound):
			http.Error(
				w,
				"student is not enrolled in this course",
				http.StatusNotFound,
			)

		default:
			http.Error(
				w,
				"could not remove student",
				http.StatusInternalServerError,
			)
		}

		return
	}

	if err := h.Service.Save(); err != nil {
		http.Error(
			w,
			"failed to save course",
			http.StatusInternalServerError,
		)
		return
	}

	course := h.Service.SearchCourse(courseID)

	w.Header().Set("Content-Type", "application/json")

	json.NewEncoder(w).Encode(course)
}

