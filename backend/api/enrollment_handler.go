package api

import (
	"encoding/json"
	"errors"
	"net/http"
	"strconv"

	"student-management-system/services"
)

type EnrollmentHandler struct {
	Service *services.EnrollmentService
}

func (h *EnrollmentHandler) EnrollStudent(
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

	err = h.Service.Enroll(
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
				"could not enroll student",
				http.StatusInternalServerError,
			)
		}

		return
	}

	enrollments := h.Service.GetByCourse(courseID)

	w.Header().Set("Content-Type", "application/json")

	json.NewEncoder(w).Encode(enrollments)
}

func (h *EnrollmentHandler) GetCourseEnrollments(
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

	// Make sure the course exists.
	if h.Service.CourseService.SearchCourse(courseID) == nil {
		http.Error(
			w,
			"course not found",
			http.StatusNotFound,
		)
		return
	}

	enrollments := h.Service.GetByCourse(courseID)

	w.Header().Set("Content-Type", "application/json")

	json.NewEncoder(w).Encode(enrollments)
}

func (h *EnrollmentHandler) UnenrollStudent(
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

	err = h.Service.Unenroll(
		courseID,
		studentID,
	)

	if err != nil {
		switch {
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

	w.WriteHeader(http.StatusNoContent)
}
