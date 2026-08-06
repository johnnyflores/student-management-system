package services

import (
	"student-management-system/models"
)


type StudentService struct {
	Students []models.Student
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