package utils

import "student-management-system/models"

func Paginate[T any](items []T, page, limit int) models.Paginated[T] {
	if page < 1 {
		page = 1
	}

	if limit < 1 {
		limit = 10
	}

	total := len(items)
	totalPages := (total + limit - 1) / limit

	start := (page - 1) * limit

	if start >= total {
		return models.Paginated[T]{
			Items:      []T{},
			Page:       page,
			Limit:      limit,
			Total:      total,
			TotalPages: totalPages,
		}
	}

	end := min(start+limit, total)

	return models.Paginated[T]{
		Items:      items[start:end],
		Page:       page,
		Limit:      limit,
		Total:      total,
		TotalPages: totalPages,
	}
}
