package api

import (
	"encoding/json"
	"net/http"
	"strconv"

	"student-management-system/models"
	"student-management-system/services"
)

type StudentHandler struct {
	Service *services.StudentService
}


func (h *StudentHandler) GetStudents(w http.ResponseWriter, r *http.Request) {

	students := h.Service.GetStudents()

	w.Header().Set("Content-Type", "application/json")

	json.NewEncoder(w).Encode(students)
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


	json.NewEncoder(w).Encode(student)
}


func (h *StudentHandler) CreateStudent(w http.ResponseWriter, r *http.Request) {

	var student models.Student


	err := json.NewDecoder(r.Body).Decode(&student)

	if err != nil {
		http.Error(w, "invalid request", http.StatusBadRequest)
		return
	}


	success := h.Service.AddStudent(student)


	if !success {
		http.Error(w, "student ID already exists", http.StatusConflict)
		return
	}


	h.Service.Save()


	w.WriteHeader(http.StatusCreated)

	json.NewEncoder(w).Encode(student)
}