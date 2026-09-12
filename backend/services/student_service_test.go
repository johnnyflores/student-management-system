package services

import (
	"testing"
	"time"

	"student-management-system/models"
)

func TestAddStudent(t *testing.T) {
	t.Run("add new student", func(t *testing.T) {
		service := StudentService{}

		student := models.Student{
			FirstName:   "Alice",
			LastName:    "Smith",
			Email:       "alice.smith@test.local",
			Phone:       "+10000000001",
			DateOfBirth: time.Date(2008, 5, 10, 0, 0, 0, 0, time.UTC),
			Grade:       models.Grade12,
			Status:      models.StudentActive,
		}

		result := service.AddStudent(&student)

		if !result {
			t.Errorf("expected student to be added")
		}

		if len(service.Students) != 1 {
			t.Errorf("expected 1 student, got %d", len(service.Students))
		}

		if service.Students[0].FirstName != "Alice" {
			t.Errorf("expected first name Alice, got %s", service.Students[0].FirstName)
		}

		if service.Students[0].LastName != "Smith" {
			t.Errorf("expected last name Smith, got %s", service.Students[0].LastName)
		}

		if service.Students[0].Grade != models.Grade12 {
			t.Errorf("expected grade 12, got %s", service.Students[0].Grade)
		}

		if service.Students[0].Status != models.StudentActive {
			t.Errorf("expected active status, got %s", service.Students[0].Status)
		}
	})
}

func TestAddStudentGeneratesNextID(t *testing.T) {
	service := StudentService{
		Students: []models.Student{
			{
				ID:          101,
				FirstName:   "Alice",
				LastName:    "Smith",
				Email:       "alice.smith@test.local",
				Phone:       "+10000000101",
				DateOfBirth: time.Date(2008, 5, 10, 0, 0, 0, 0, time.UTC),
				Grade:       models.Grade12,
				Status:      models.StudentActive,
			},
		},
	}

	student := models.Student{
		FirstName:   "Bob",
		LastName:    "Jones",
		Email:       "bob.jones@test.local",
		Phone:       "+10000000102",
		DateOfBirth: time.Date(2007, 3, 15, 0, 0, 0, 0, time.UTC),
		Grade:       models.Grade11,
		Status:      models.StudentActive,
	}

	result := service.AddStudent(&student)

	if !result {
		t.Errorf("expected student to be added")
	}

	if student.ID != 102 {
		t.Errorf("expected generated ID 102, got %d", student.ID)
	}

	if len(service.Students) != 2 {
		t.Errorf("expected 2 students, got %d", len(service.Students))
	}

	if service.Students[1].ID != 102 {
		t.Errorf("expected stored student ID 102, got %d", service.Students[1].ID)
	}
}

func TestSearchStudent(t *testing.T) {
	service := StudentService{
		Students: []models.Student{
			{
				ID:          102,
				FirstName:   "Maria",
				LastName:    "Smith",
				Email:       "maria.smith@test.local",
				Phone:       "+10000000102",
				DateOfBirth: time.Date(2008, 6, 20, 0, 0, 0, 0, time.UTC),
				Grade:       models.Grade12,
				Status:      models.StudentActive,
			},
		},
	}

	student := service.SearchStudent(102)

	if student == nil {
		t.Errorf("expected student, got nil")
	}

	if student.FirstName != "Maria" {
		t.Errorf("expected Maria, got %s", student.FirstName)
	}

	if student.LastName != "Smith" {
		t.Errorf("expected Smith, got %s", student.LastName)
	}

	if student.ID != 102 {
		t.Errorf("expected ID 102, got %d", student.ID)
	}
}

func TestSearchStudentNotFound(t *testing.T) {
	service := StudentService{
		Students: []models.Student{
			{
				ID:        102,
				FirstName: "Maria",
				LastName:  "Smith",
				Grade:     models.Grade12,
				Status:    models.StudentActive,
			},
		},
	}

	student := service.SearchStudent(999)

	if student != nil {
		t.Errorf("expected no student, got %+v", student)
	}
}

func TestSearchStudentsByName(t *testing.T) {
	service := StudentService{
		Students: []models.Student{
			{
				ID:        101,
				FirstName: "Bob",
				LastName:  "Tom",
				Grade:     models.Grade12,
				Status:    models.StudentActive,
			},
			{
				ID:        102,
				FirstName: "Maria",
				LastName:  "Kean",
				Grade:     models.Grade11,
				Status:    models.StudentActive,
			},
			{
				ID:        104,
				FirstName: "Mark",
				LastName:  "Tom",
				Grade:     models.Grade10,
				Status:    models.StudentActive,
			},
		},
	}

	results := service.SearchStudentsByName("tom")

	if len(results) != 2 {
		t.Fatalf("expected 2 students, got %d", len(results))
	}

	if results[0].FirstName != "Bob" || results[0].LastName != "Tom" {
		t.Errorf(
			"expected Bob Tom, got %s %s",
			results[0].FirstName,
			results[0].LastName,
		)
	}

	if results[1].FirstName != "Mark" || results[1].LastName != "Tom" {
		t.Errorf(
			"expected Mark Tom, got %s %s",
			results[1].FirstName,
			results[1].LastName,
		)
	}
}

func TestSearchStudentsByNameCaseInsensitive(t *testing.T) {
	service := StudentService{
		Students: []models.Student{
			{
				ID:        101,
				FirstName: "Bob",
				LastName:  "Tom",
				Grade:     models.Grade12,
				Status:    models.StudentActive,
			},
			{
				ID:        104,
				FirstName: "Mark",
				LastName:  "Tom",
				Grade:     models.Grade10,
				Status:    models.StudentActive,
			},
		},
	}

	results := service.SearchStudentsByName("TOM")

	if len(results) != 2 {
		t.Fatalf("expected 2 students, got %d", len(results))
	}

	if results[0].FirstName != "Bob" || results[0].LastName != "Tom" {
		t.Errorf(
			"expected Bob Tom, got %s %s",
			results[0].FirstName,
			results[0].LastName,
		)
	}

	if results[1].FirstName != "Mark" || results[1].LastName != "Tom" {
		t.Errorf(
			"expected Mark Tom, got %s %s",
			results[1].FirstName,
			results[1].LastName,
		)
	}
}

func TestSearchStudentsByNameNotFound(t *testing.T) {
	service := StudentService{
		Students: []models.Student{
			{
				ID:        101,
				FirstName: "Bob",
				LastName:  "Tom",
			},
			{
				ID:        102,
				FirstName: "Maria",
				LastName:  "Kean",
			},
		},
	}

	results := service.SearchStudentsByName("Charles")

	if len(results) != 0 {
		t.Errorf("expected no students, got %d", len(results))
	}
}

func TestSearchStudentsByNameTrimSpace(t *testing.T) {
	service := StudentService{
		Students: []models.Student{
			{
				ID:        101,
				FirstName: "Bob",
				LastName:  "Tom",
			},
		},
	}

	results := service.SearchStudentsByName("  tom  ")

	if len(results) != 1 {
		t.Fatalf("expected 1 student, got %d", len(results))
	}

	if results[0].FirstName != "Bob" || results[0].LastName != "Tom" {
		t.Errorf(
			"expected Bob Tom, got %s %s",
			results[0].FirstName,
			results[0].LastName,
		)
	}
}

func TestSearchStudentsByNameEmpty(t *testing.T) {
	service := StudentService{
		Students: []models.Student{
			{
				ID:        101,
				FirstName: "Bob",
				LastName:  "Tom",
			},
			{
				ID:        102,
				FirstName: "Maria",
				LastName:  "Kean",
			},
		},
	}

	results := service.SearchStudentsByName("")

	if len(results) != 0 {
		t.Errorf(
			"expected no students for empty search, got %d",
			len(results),
		)
	}
}

func TestUpdateStudent(t *testing.T) {
	createdAt := time.Date(
		2026, 1, 1,
		0, 0, 0, 0,
		time.UTC,
	)

	updatedAt := time.Date(
		2026, 1, 2,
		0, 0, 0, 0,
		time.UTC,
	)

	service := StudentService{
		Students: []models.Student{
			{
				ID:          103,
				FirstName:   "Anna",
				LastName:    "Kotle",
				Email:       "anna.kotle@test.local",
				Phone:       "+10000000103",
				DateOfBirth: time.Date(2000, 5, 10, 0, 0, 0, 0, time.UTC),
				Grade:       models.Grade11,
				Status:      models.StudentActive,
				CreatedAt:   createdAt,
				UpdatedAt:   updatedAt,
			},
		},
	}

	result := service.UpdateStudent(
		103,
		models.Student{
			FirstName:   "Anna",
			LastName:    "Smith",
			Email:       "anna.smith@test.local",
			Phone:       "+10000000999",
			DateOfBirth: time.Date(2000, 5, 10, 0, 0, 0, 0, time.UTC),
			Grade:       models.Grade12,
			Status:      models.StudentInactive,
		},
	)

	if !result {
		t.Errorf("expected update success")
	}

	student := service.SearchStudent(103)

	if student == nil {
		t.Fatalf("expected student, got nil")
	}

	if student.FirstName != "Anna" {
		t.Errorf("expected first name Anna, got %s", student.FirstName)
	}

	if student.LastName != "Smith" {
		t.Errorf("expected last name Smith, got %s", student.LastName)
	}

	if student.Email != "anna.smith@test.local" {
		t.Errorf("expected email anna.smith@test.local, got %s", student.Email)
	}

	if student.Phone != "+10000000999" {
		t.Errorf("expected phone +10000000999, got %s", student.Phone)
	}

	if student.Grade != models.Grade12 {
		t.Errorf("expected grade 12, got %s", student.Grade)
	}

	if student.Status != models.StudentInactive {
		t.Errorf("expected inactive status, got %s", student.Status)
	}

	if student.ID != 103 {
		t.Errorf("expected ID 103, got %d", student.ID)
	}

	if !student.CreatedAt.Equal(createdAt) {
		t.Errorf("CreatedAt should not change")
	}

	if !student.UpdatedAt.After(updatedAt) {
		t.Errorf("expected UpdatedAt to be updated")
	}
}

func TestUpdateStudentNotFound(t *testing.T) {
	service := StudentService{
		Students: []models.Student{},
	}

	result := service.UpdateStudent(
		999,
		models.Student{
			FirstName: "Nobody",
			LastName:  "Unknown",
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
				ID:        104,
				FirstName: "John",
				LastName:  "Smith",
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
			},
		},
	}

	result := service.DeleteStudent(999)

	if result {
		t.Errorf("expected delete to fail")
	}
}

func TestSaveStudent(t *testing.T) {
	repository := &MockRepository{}

	service := StudentService{
		Students: []models.Student{
			{
				ID:        101,
				FirstName: "Alice",
				LastName:  "Smith",
			},
		},
		Repository: repository,
	}

	err := service.Save()

	if err != nil {
		t.Errorf("expected save success")
	}

	if len(repository.Students) != 1 {
		t.Errorf(
			"expected 1 saved student, got %d",
			len(repository.Students),
		)
	}
}
