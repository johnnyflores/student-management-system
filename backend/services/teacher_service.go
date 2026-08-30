package services

import (
	"strings"

	"student-management-system/models"
	"student-management-system/storage"
)

type TeacherService struct {
	Teachers   []models.Teacher
	Repository storage.TeacherRepository
}

func (t *TeacherService) AddTeacher(teacher *models.Teacher) bool {
	maxID := 200

	for _, existingTeacher := range t.Teachers {
		if existingTeacher.ID > maxID {
			maxID = existingTeacher.ID
		}
	}

	teacher.ID = maxID + 1

	t.Teachers = append(t.Teachers, *teacher)

	return true
}

func (t *TeacherService) GetTeachers() []models.Teacher {
	return t.Teachers
}

func (t *TeacherService) SearchTeacher(id int) *models.Teacher {
	for i := range t.Teachers {
		if t.Teachers[i].ID == id {
			return &t.Teachers[i]
		}
	}

	return nil
}

func (t *TeacherService) SearchTeachersByName(name string) []models.Teacher {
	searchName := strings.ToLower(strings.TrimSpace(name))

	if searchName == "" {
		return []models.Teacher{}
	}

	var results []models.Teacher

	for _, teacher := range t.Teachers {
		teacherName := strings.ToLower(teacher.Name)

		if strings.Contains(teacherName, searchName) {
			results = append(results, teacher)
		}
	}

	return results
}

func (t *TeacherService) UpdateTeacher(
	id int,
	updatedTeacher models.Teacher,
) bool {
	for i := range t.Teachers {
		if t.Teachers[i].ID == id {
			t.Teachers[i].Name = updatedTeacher.Name
			t.Teachers[i].Speciality = updatedTeacher.Speciality

			return true
		}
	}

	return false
}

func (t *TeacherService) DeleteTeacher(id int) bool {
	for i, teacher := range t.Teachers {
		if teacher.ID == id {
			t.Teachers = append(
				t.Teachers[:i],
				t.Teachers[i+1:]...,
			)

			return true
		}
	}

	return false
}

func (t *TeacherService) Save() error {
	return t.Repository.Save(t.Teachers)
}

func (t *TeacherService) Load() error {
	teachers, err := t.Repository.Load()

	if err != nil {
		return err
	}

	t.Teachers = teachers

	return nil
}
