package services

import (
	"strings"
	"time"

	"student-management-system/models"
	"student-management-system/storage"
	"student-management-system/utils"
)

type StudentService struct {
	Students   []models.Student
	Repository storage.StudentRepository
}

func (s *StudentService) AddStudent(student *models.Student) bool {
	maxID := 100

	for _, existingStudent := range s.Students {
		if existingStudent.ID > maxID {
			maxID = existingStudent.ID
		}
	}

	student.ID = maxID + 1

	now := time.Now()
	student.CreatedAt = now
	student.UpdatedAt = now

	s.Students = append(s.Students, *student)

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
		fullName := strings.ToLower(
			strings.TrimSpace(student.FirstName + " " + student.LastName),
		)

		if strings.Contains(fullName, searchName) {
			results = append(results, student)
		}
	}

	return results
}

func (s *StudentService) UpdateStudent(id int, updatedStudent models.Student) bool {
	for i := range s.Students {
		if s.Students[i].ID == id {
			s.Students[i].FirstName = updatedStudent.FirstName
			s.Students[i].LastName = updatedStudent.LastName
			s.Students[i].Email = updatedStudent.Email
			s.Students[i].Phone = updatedStudent.Phone
			s.Students[i].DateOfBirth = updatedStudent.DateOfBirth
			s.Students[i].Grade = updatedStudent.Grade
			s.Students[i].Status = updatedStudent.Status
			s.Students[i].UpdatedAt = time.Now()

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
) models.Paginated[models.Student] {
	return utils.Paginate(s.Students, page, limit)
}
