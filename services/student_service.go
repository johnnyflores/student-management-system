package services

import (
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
