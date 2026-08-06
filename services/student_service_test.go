package services

import (
	"testing"

	"student-management-system/models"
)

func TestAddStudent(t *testing.T) {

	t.Run("add new student", func(t *testing.T) {

		service := StudentService{}

		student := models.Student{
			ID:    101,
			Name:  "Alice",
			Age:   20,
			Grade: "A",
		}

		result := service.AddStudent(student)

		if !result {
			t.Errorf("expected student to be added")
		}
	})
}

func TestAddDuplicateStudent(t *testing.T) {

	service := StudentService{
		Students: []models.Student{
			{
				ID:    101,
				Name:  "Alice",
				Age:   20,
				Grade: "A",
			},
		},
	}


	result := service.AddStudent(
		models.Student{
			ID:    101,
			Name:  "Bob",
			Age:   22,
			Grade: "B",
		},
	)


	if result {
		t.Errorf("expected duplicate ID to fail")
	}
}

func TestSearchStudent(t *testing.T) {

	service := StudentService{
		Students: []models.Student{
			{
				ID:    102,
				Name:  "Maria",
				Age:   25,
				Grade: "A",
			},
		},
	}


	student := service.SearchStudent(102)


	if student == nil {
		t.Errorf("expected student, got nil")
	}


	if student.Name != "Maria" {
		t.Errorf("expected Maria, got %s", student.Name)
	}
}

func TestSearchStudentNotFound(t *testing.T) {

	service := StudentService{
		Students: []models.Student{
			{
				ID:    102,
				Name:  "Maria",
				Age:   25,
				Grade: "A",
			},
		},
	}


	student := service.SearchStudent(999)


	if student != nil {
		t.Errorf("expected no student")
	}
}

func TestUpdateStudent(t *testing.T) {

	service := StudentService{
		Students: []models.Student{
			{
				ID:    103,
				Name:  "Anna",
				Age:   28,
				Grade: "B",
			},
		},
	}


	result := service.UpdateStudent(
		103,
		models.Student{
			Name:  "Anna Kotle",
			Age:   29,
			Grade: "A",
		},
	)


	if !result {
		t.Errorf("expected update success")
	}


	student := service.SearchStudent(103)


	if student.Name != "Anna Kotle" {
		t.Errorf("name was not updated")
	}


	if student.Age != 29 {
		t.Errorf("age was not updated")
	}
}

func TestUpdateStudentNotFound(t *testing.T) {

	service := StudentService{
		Students: []models.Student{},
	}


	result := service.UpdateStudent(
		999,
		models.Student{
			Name:  "Nobody",
			Age:   20,
			Grade: "A",
		},
	)


	if result {
		t.Errorf("expected update to fail")
	}
}

func TestDeleteStudent(t *testing.T) {

	service := StudentService{
		Students: []models.Student{
			{
				ID:    104,
				Name:  "John",
				Age:   30,
				Grade: "A",
			},
		},
	}


	result := service.DeleteStudent(104)


	if !result {
		t.Errorf("expected delete success")
	}


	if len(service.Students) != 0 {
		t.Errorf("expected empty student list")
	}
}

func TestDeleteStudentNotFound(t *testing.T) {

	service := StudentService{
		Students: []models.Student{
			{
				ID: 101,
				Name: "Alice",
			},
		},
	}


	result := service.DeleteStudent(999)


	if result {
		t.Errorf("expected delete to fail")
	}
}