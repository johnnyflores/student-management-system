package services

import (
	"errors"
	"strings"
	"student-management-system/models"
	"student-management-system/storage"
)

type CourseService struct {
	Courses        []models.Course
	Repository     storage.CourseRepository
	StudentService *StudentService
}

var (
	ErrCourseNotFound     = errors.New("course not found")
	ErrStudentNotFound    = errors.New("student not found")
	ErrAlreadyEnrolled    = errors.New("student already enrolled")
	ErrEnrollmentNotFound = errors.New("student is not enrolled in this course")
)

func (c *CourseService) AddCourse(course *models.Course) bool {
	maxID := 100

	for _, existingCourse := range c.Courses {
		if existingCourse.ID > maxID {
			maxID = existingCourse.ID
		}
	}

	course.ID = maxID + 1
	course.Students = []int{}

	c.Courses = append(c.Courses, *course)

	return true
}

func (c *CourseService) GetCourses() []models.Course {
	return c.Courses
}

func (c *CourseService) SearchCourse(id int) *models.Course {
	for i := range c.Courses {
		if c.Courses[i].ID == id {
			return &c.Courses[i]
		}
	}

	return nil
}

func (c *CourseService) SearchCoursesByName(name string) []models.Course {
	searchName := strings.ToLower(strings.TrimSpace(name))

	if searchName == "" {
		return []models.Course{}
	}

	var results []models.Course

	for _, course := range c.Courses {
		courseName := strings.ToLower(course.Name)

		if strings.Contains(courseName, searchName) {
			results = append(results, course)
		}
	}

	return results
}

func (c *CourseService) AssignStudent(
	courseID int,
	studentID int,
) error {

	// Find course
	courseIndex := -1

	for i := range c.Courses {
		if c.Courses[i].ID == courseID {
			courseIndex = i
			break
		}
	}

	if courseIndex == -1 {
		return ErrCourseNotFound
	}

	// Check student service
	if c.StudentService == nil {
		return ErrStudentNotFound
	}

	// Check student exists
	student := c.StudentService.SearchStudent(studentID)

	if student == nil {
		return ErrStudentNotFound
	}

	// Prevent duplicate enrollment
	for _, id := range c.Courses[courseIndex].Students {
		if id == studentID {
			return ErrAlreadyEnrolled
		}
	}

	// Assign student
	c.Courses[courseIndex].Students = append(
		c.Courses[courseIndex].Students,
		studentID,
	)

	return nil
}


func (c *CourseService) RemoveStudent(courseID int, studentID int) error {
	for i := range c.Courses {
		if c.Courses[i].ID == courseID {

			for j, id := range c.Courses[i].Students {
				if id == studentID {

					c.Courses[i].Students = append(
						c.Courses[i].Students[:j],
						c.Courses[i].Students[j+1:]...,
					)

					return nil
				}
			}
			return ErrEnrollmentNotFound
		}
	}

	return ErrCourseNotFound
}

func (c *CourseService) Save() error {
	return c.Repository.Save(c.Courses)
}

func (c *CourseService) Load() error {
	courses, err := c.Repository.Load()

	if err != nil {
		return err
	}

	c.Courses = courses

	return nil
}
