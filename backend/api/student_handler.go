package api

import (
	"encoding/json"
	"net/http"
	"strconv"
	"strings"

	"student-management-system/models"
	"student-management-system/services"
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

	var result models.PaginatedStudents

	if name != "" {
		students := h.Service.SearchStudentsByName(name)

		total := len(students)
		totalPages := (total + limit - 1) / limit

		start := (page - 1) * limit

		if start >= total {
			result = models.PaginatedStudents{
				Students:   []models.Student{},
				Page:       page,
				Limit:      limit,
				Total:      total,
				TotalPages: totalPages,
			}
		} else {
			end := start + limit

			if end > total {
				end = total
			}

			result = models.PaginatedStudents{
				Students:   students[start:end],
				Page:       page,
				Limit:      limit,
				Total:      total,
				TotalPages: totalPages,
			}
		}

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
		Name  string `json:"Name"`
		Age   *int   `json:"Age"`
		Grade string `json:"Grade"`
	}

	err := json.NewDecoder(r.Body).Decode(&request)

	if err != nil {
		http.Error(w, "invalid request", http.StatusBadRequest)
		return
	}

	if strings.TrimSpace(request.Name) == "" {
		http.Error(w, "name is required", http.StatusBadRequest)
		return
	}

	if request.Age == nil {
		http.Error(w, "age is required", http.StatusBadRequest)
		return
	}

	if *request.Age < 1 || *request.Age > 100 {
		http.Error(w, "age must be between 1 and 100", http.StatusBadRequest)
		return
	}

	if strings.TrimSpace(request.Grade) == "" {
		http.Error(w, "grade is required", http.StatusBadRequest)
		return
	}

	student := models.Student{
		Name:  request.Name,
		Age:   *request.Age,
		Grade: request.Grade,
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


	var student models.Student

	err = json.NewDecoder(r.Body).Decode(&student)

	if err != nil {
		http.Error(w, "invalid request", http.StatusBadRequest)
		return
	}


	success := h.Service.UpdateStudent(id, student)

	if !success {
		http.Error(w, "student not found", http.StatusNotFound)
		return
	}


	h.Service.Save()


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