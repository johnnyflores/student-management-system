package app

import (
	"student-management-system/services"
	"student-management-system/storage"
)

func NewStudentService() (*services.StudentService, error) {

	repository := storage.JSONStorage{
		FileName: "data/students.json",
	}

	students, err := repository.Load()

	if err != nil {
		return nil, err
	}

	service := &services.StudentService{
		Students:   students,
		Repository: repository,
	}

	return service, nil
}

func NewCourseService(
	studentService *services.StudentService,
	teacherService *services.TeacherService,
) (*services.CourseService, error) {
	repository := storage.JSONCourseStorage{
		FileName: "data/courses.json",
	}

	courses, err := repository.Load()

	if err != nil {
		return nil, err
	}

	service := &services.CourseService{
		Courses:        courses,
		Repository:     repository,
		StudentService: studentService,
		TeacherService: teacherService,
	}

	return service, nil
}

func NewTeacherService() (*services.TeacherService, error) {
	repository := storage.JSONTeacherStorage{
		FileName: "data/teachers.json",
	}

	teachers, err := repository.Load()

	if err != nil {
		return nil, err
	}

	service := &services.TeacherService{
		Teachers:   teachers,
		Repository: repository,
	}

	return service, nil
}
