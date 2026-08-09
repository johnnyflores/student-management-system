package services

import (
	"strings"
	"student-management-system/models"
	"student-management-system/storage"
)

type StudentService struct {
	Students   []models.Student
	Repository storage.StudentRepository
}

func (s *StudentService) AddStudent(student models.Student) bool {

	for _, existingStudent := range s.Students {
		if existingStudent.ID == student.ID {
			return false
		}
	}

	s.Students = append(s.Students, student)

	return true
}

func (s *StudentService) GetStudents() []models.Student {

	return s.Students

}

func (s *StudentService) SearchStudent(id int) *models.Student {

	for i := range s.Students {

		if s.Students[i].ID == id {

			return &s.Students[i]

		}
	}

	return nil
}

func (s *StudentService) SearchStudentsByName(name string) []models.Student {
	searchName := strings.ToLower(strings.TrimSpace(name))

	if searchName == "" {
		return []models.Student{}
	}

	var results []models.Student

	for _, student := range s.Students {
		studentName := strings.ToLower(student.Name)

		if strings.Contains(studentName, searchName) {
			results = append(results, student)
		}
	}

	return results
}

func (s *StudentService) UpdateStudent(id int, updatedStudent models.Student) bool {

	for i := range s.Students {

		if s.Students[i].ID == id {

			s.Students[i].Name = updatedStudent.Name
			s.Students[i].Age = updatedStudent.Age
			s.Students[i].Grade = updatedStudent.Grade

			return true
		}
	}

	return false
}

func (s *StudentService) DeleteStudent(id int) bool {

	for i, student := range s.Students {

		if student.ID == id {

			s.Students = append(
				s.Students[:i],
				s.Students[i+1:]...,
			)

			return true
		}
	}

	return false
}

func (s *StudentService) Save() error {

	return s.Repository.Save(s.Students)

}

func (s *StudentService) GetStudentsPaginated(
	page int,
	limit int,
) models.PaginatedStudents {

	if page < 1 {
		page = 1
	}

	if limit < 1 {
		limit = 10
	}

	total := len(s.Students)

	totalPages := (total + limit - 1) / limit

	start := (page - 1) * limit

	if start >= total {
		return models.PaginatedStudents{
			Students:   []models.Student{},
			Page:       page,
			Limit:      limit,
			Total:      total,
			TotalPages: totalPages,
		}
	}

	end := start + limit

	if end > total {
		end = total
	}

	return models.PaginatedStudents{
		Students:   s.Students[start:end],
		Page:       page,
		Limit:      limit,
		Total:      total,
		TotalPages: totalPages,
	}
}