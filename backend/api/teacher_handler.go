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

type TeacherHandler struct {
	Service *services.TeacherService
}

func (h *TeacherHandler) GetTeachers(w http.ResponseWriter, r *http.Request) {
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

	var result models.Paginated[models.Teacher]

	if name != "" {
		teachers := h.Service.SearchTeachersByName(name)
		result = utils.Paginate(teachers, page, limit)
	} else {
		result = h.Service.GetTeachersPaginated(page, limit)
	}

	w.Header().Set("Content-Type", "application/json")

	json.NewEncoder(w).Encode(result)
}

func (h *TeacherHandler) GetTeacher(
	w http.ResponseWriter,
	r *http.Request,
) {
	id, err := strconv.Atoi(r.URL.Query().Get("id"))

	if err != nil || id < 1 {
		http.Error(
			w,
			"invalid id",
			http.StatusBadRequest,
		)
		return
	}

	teacher := h.Service.SearchTeacher(id)

	if teacher == nil {
		http.Error(
			w,
			"teacher not found",
			http.StatusNotFound,
		)
		return
	}

	w.Header().Set("Content-Type", "application/json")

	json.NewEncoder(w).Encode(teacher)
}

func (h *TeacherHandler) CreateTeacher(
	w http.ResponseWriter,
	r *http.Request,
) {
	var request struct {
		Name       string `json:"Name"`
		Speciality string `json:"Speciality"`
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
			"teacher name is required",
			http.StatusBadRequest,
		)
		return
	}

	if strings.TrimSpace(request.Speciality) == "" {
		http.Error(
			w,
			"speciality is required",
			http.StatusBadRequest,
		)
		return
	}

	teacher := models.Teacher{
		Name:       strings.TrimSpace(request.Name),
		Speciality: strings.TrimSpace(request.Speciality),
	}

	success := h.Service.AddTeacher(&teacher)

	if !success {
		http.Error(
			w,
			"could not create teacher",
			http.StatusInternalServerError,
		)
		return
	}

	if err := h.Service.Save(); err != nil {
		http.Error(
			w,
			"failed to save teacher",
			http.StatusInternalServerError,
		)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)

	json.NewEncoder(w).Encode(teacher)
}

func (h *TeacherHandler) UpdateTeacher(
	w http.ResponseWriter,
	r *http.Request,
) {
	id, err := strconv.Atoi(r.URL.Query().Get("id"))

	if err != nil || id < 1 {
		http.Error(
			w,
			"invalid id",
			http.StatusBadRequest,
		)
		return
	}

	var request struct {
		Name       string `json:"Name"`
		Speciality string `json:"Speciality"`
	}

	err = json.NewDecoder(r.Body).Decode(&request)

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
			"teacher name is required",
			http.StatusBadRequest,
		)
		return
	}

	if strings.TrimSpace(request.Speciality) == "" {
		http.Error(
			w,
			"speciality is required",
			http.StatusBadRequest,
		)
		return
	}

	teacher := models.Teacher{
		Name:       strings.TrimSpace(request.Name),
		Speciality: strings.TrimSpace(request.Speciality),
	}

	success := h.Service.UpdateTeacher(id, teacher)

	if !success {
		http.Error(
			w,
			"teacher not found",
			http.StatusNotFound,
		)
		return
	}

	if err := h.Service.Save(); err != nil {
		http.Error(
			w,
			"failed to save teacher",
			http.StatusInternalServerError,
		)
		return
	}

	updatedTeacher := h.Service.SearchTeacher(id)

	w.Header().Set("Content-Type", "application/json")

	json.NewEncoder(w).Encode(updatedTeacher)
}

func (h *TeacherHandler) DeleteTeacher(
	w http.ResponseWriter,
	r *http.Request,
) {
	id, err := strconv.Atoi(r.URL.Query().Get("id"))

	if err != nil || id < 1 {
		http.Error(
			w,
			"invalid id",
			http.StatusBadRequest,
		)
		return
	}

	success := h.Service.DeleteTeacher(id)

	if !success {
		http.Error(
			w,
			"teacher not found",
			http.StatusNotFound,
		)
		return
	}

	if err := h.Service.Save(); err != nil {
		http.Error(
			w,
			"failed to save teacher",
			http.StatusInternalServerError,
		)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}
