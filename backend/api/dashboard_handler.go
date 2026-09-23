package api

import (
	"encoding/json"
	"net/http"

	"student-management-system/services"
)

type DashboardHandler struct {
	Service *services.DashboardService
}

func (h *DashboardHandler) GetStats(w http.ResponseWriter, r *http.Request) {
	stats := h.Service.GetStats()

	w.Header().Set("Content-Type", "application/json")

	if err := json.NewEncoder(w).Encode(stats); err != nil {
		http.Error(
			w,
			"Failed to encode dashboard statistics",
			http.StatusInternalServerError,
		)
	}
}
