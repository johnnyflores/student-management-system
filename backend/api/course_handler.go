package api

import (
	"encoding/json"
	"net/http"
	"strconv"
	"strings"

	"student-management-system/models"
	"student-management-system/services"
	"student-management-system/utils"
)

type CourseHandler struct {
	Service *services.CourseService
}

func (h *CourseHandler) CreateCourse(
	w http.ResponseWriter,
	r *http.Request,
) {
	var request struct {
		Name      string `json:"Name"`
		TeacherID int    `json:"TeacherID"`
	}

	err := json.NewDecoder(r.Body).Decode(&request)

	if err != nil {
		http.Error(
			w,
			"invalid request",
			http.StatusBadRequest,
		)
		return
	}

	if strings.TrimSpace(request.Name) == "" {
		http.Error(
			w,
			"course name is required",
			http.StatusBadRequest,
		)
		return
	}

	if request.TeacherID < 1 {
		http.Error(
			w,
			"teacher_id is required",
			http.StatusBadRequest,
		)
		return
	}

	if h.Service.TeacherService == nil {
		http.Error(
			w,
			"teacher service unavailable",
			http.StatusInternalServerError,
		)
		return
	}

	teacher := h.Service.TeacherService.SearchTeacher(request.TeacherID)

	if teacher == nil {
		http.Error(
			w,
			"teacher not found",
			http.StatusNotFound,
		)
		return
	}

	course := models.Course{
		Name:      strings.TrimSpace(request.Name),
		TeacherID: request.TeacherID,
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

func (h *CourseHandler) GetCourses(w http.ResponseWriter, r *http.Request) {

	page := 1
	limit := 10

	pageParam := r.URL.Query().Get("page")
	limitParam := r.URL.Query().Get("limit")
	name := r.URL.Query().Get("name")

	var err error

	if pageParam != "" {
		page, err = strconv.Atoi(pageParam)

		if err != nil || page < 1 {
			http.Error(w, "invalid page", http.StatusBadRequest)
			return
		}
	}

	if limitParam != "" {
		limit, err = strconv.Atoi(limitParam)

		if err != nil || limit < 1 {
			http.Error(w, "invalid limit", http.StatusBadRequest)
			return
		}
	}

	var result models.Paginated[models.Course]

	if name != "" {
		courses := h.Service.SearchCoursesByName(name)
		result = utils.Paginate(courses, page, limit)
	} else {
		result = h.Service.GetCoursesPaginated(page, limit)
	}

	w.Header().Set("Content-Type", "application/json")

	json.NewEncoder(w).Encode(result)
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
