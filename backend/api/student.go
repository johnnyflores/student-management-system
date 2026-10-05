package api

import (
	"encoding/json"
	"net/http"
	"strconv"
	"strings"
	"time"

	"student-management-system/models"
	"student-management-system/services"
	"student-management-system/utils"
)

type StudentHandler struct {
	Service *services.StudentService
}

func (h *StudentHandler) GetStudents(w http.ResponseWriter, r *http.Request) {
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

	var result models.Paginated[models.Student]

	if name != "" {
		students := h.Service.SearchStudentsByName(name)
		result = utils.Paginate(students, page, limit)
	} else {
		result = h.Service.GetStudentsPaginated(page, limit)
	}

	w.Header().Set("Content-Type", "application/json")

	json.NewEncoder(w).Encode(result)
}

func (h *StudentHandler) GetStudent(w http.ResponseWriter, r *http.Request) {

	id, err := strconv.Atoi(r.URL.Query().Get("id"))

	if err != nil {
		http.Error(w, "invalid id", http.StatusBadRequest)
		return
	}

	student := h.Service.SearchStudent(id)

	if student == nil {
		http.Error(w, "student not found", http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(student)
}

func (h *StudentHandler) CreateStudent(
	w http.ResponseWriter,
	r *http.Request,
) {
	var request struct {
		FirstName   string               `json:"firstName"`
		LastName    string               `json:"lastName"`
		Email       string               `json:"email"`
		Phone       string               `json:"phone"`
		DateOfBirth *time.Time           `json:"dateOfBirth"`
		Grade       models.GradeLevel    `json:"grade"`
		Status      models.StudentStatus `json:"status"`
	}

	err := json.NewDecoder(r.Body).Decode(&request)
	if err != nil {
		http.Error(w, "invalid request", http.StatusBadRequest)
		return
	}

	if strings.TrimSpace(request.FirstName) == "" {
		http.Error(w, "firstName is required", http.StatusBadRequest)
		return
	}

	if strings.TrimSpace(request.LastName) == "" {
		http.Error(w, "lastName is required", http.StatusBadRequest)
		return
	}

	if strings.TrimSpace(request.Email) == "" {
		http.Error(w, "email is required", http.StatusBadRequest)
		return
	}

	if request.DateOfBirth == nil {
		http.Error(w, "dateOfBirth is required", http.StatusBadRequest)
		return
	}

	if !request.Grade.IsValid() {
		http.Error(w, "invalid grade", http.StatusBadRequest)
		return
	}

	if request.Status == "" {
		request.Status = models.StudentActive
	}

	if !request.Status.IsValid() {
		http.Error(w, "invalid student status", http.StatusBadRequest)
		return
	}

	student := models.Student{
		FirstName:   strings.TrimSpace(request.FirstName),
		LastName:    strings.TrimSpace(request.LastName),
		Email:       strings.TrimSpace(request.Email),
		Phone:       strings.TrimSpace(request.Phone),
		DateOfBirth: *request.DateOfBirth,
		Grade:       request.Grade,
		Status:      request.Status,
	}

	success := h.Service.AddStudent(&student)

	if !success {
		http.Error(w, "could not create student", http.StatusInternalServerError)
		return
	}

	if err := h.Service.Save(); err != nil {
		http.Error(w, "failed to save student", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)

	json.NewEncoder(w).Encode(student)
}

func (h *StudentHandler) UpdateStudent(
	w http.ResponseWriter,
	r *http.Request,
) {
	id, err := strconv.Atoi(r.URL.Query().Get("id"))
	if err != nil {
		http.Error(w, "invalid id", http.StatusBadRequest)
		return
	}

	var request struct {
		FirstName   string               `json:"firstName"`
		LastName    string               `json:"lastName"`
		Email       string               `json:"email"`
		Phone       string               `json:"phone"`
		DateOfBirth *time.Time           `json:"dateOfBirth"`
		Grade       models.GradeLevel    `json:"grade"`
		Status      models.StudentStatus `json:"status"`
	}

	err = json.NewDecoder(r.Body).Decode(&request)
	if err != nil {
		http.Error(w, "invalid request", http.StatusBadRequest)
		return
	}

	if strings.TrimSpace(request.FirstName) == "" {
		http.Error(w, "firstName is required", http.StatusBadRequest)
		return
	}

	if strings.TrimSpace(request.LastName) == "" {
		http.Error(w, "lastName is required", http.StatusBadRequest)
		return
	}

	if strings.TrimSpace(request.Email) == "" {
		http.Error(w, "email is required", http.StatusBadRequest)
		return
	}

	if request.DateOfBirth == nil {
		http.Error(w, "dateOfBirth is required", http.StatusBadRequest)
		return
	}

	if !request.Grade.IsValid() {
		http.Error(w, "invalid grade", http.StatusBadRequest)
		return
	}

	if !request.Status.IsValid() {
		http.Error(w, "invalid student status", http.StatusBadRequest)
		return
	}

	student := models.Student{
		ID:          id,
		FirstName:   strings.TrimSpace(request.FirstName),
		LastName:    strings.TrimSpace(request.LastName),
		Email:       strings.TrimSpace(request.Email),
		Phone:       strings.TrimSpace(request.Phone),
		DateOfBirth: *request.DateOfBirth,
		Grade:       request.Grade,
		Status:      request.Status,
	}

	success := h.Service.UpdateStudent(id, student)

	if !success {
		http.Error(w, "student not found", http.StatusNotFound)
		return
	}

	if err := h.Service.Save(); err != nil {
		http.Error(w, "failed to save student", http.StatusInternalServerError)
		return
	}

	updatedStudent := h.Service.SearchStudent(id)

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(updatedStudent)
}

func (h *StudentHandler) DeleteStudent(
	w http.ResponseWriter,
	r *http.Request,
) {

	id, err := strconv.Atoi(r.URL.Query().Get("id"))

	if err != nil {
		http.Error(w, "invalid id", http.StatusBadRequest)
		return
	}

	success := h.Service.DeleteStudent(id)

	if !success {
		http.Error(w, "student not found", http.StatusNotFound)
		return
	}

	h.Service.Save()

	w.WriteHeader(http.StatusNoContent)
}
