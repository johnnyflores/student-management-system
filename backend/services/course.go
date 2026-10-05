package services

import (
	"errors"
	"strings"
	"student-management-system/models"
	"student-management-system/storage"
	"student-management-system/utils"
)

type CourseService struct {
	Courses        []models.Course
	Repository     storage.CourseRepository
	StudentService *StudentService
	TeacherService *TeacherService
}

var (
	ErrCourseNotFound = errors.New("course not found")
)

func (c *CourseService) AddCourse(course *models.Course) bool {
	maxID := 100

	for _, existingCourse := range c.Courses {
		if existingCourse.ID > maxID {
			maxID = existingCourse.ID
		}
	}

	course.ID = maxID + 1

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

func (s *CourseService) GetCoursesPaginated(
	page int,
	limit int,
) models.Paginated[models.Course] {
	return utils.Paginate(s.Courses, page, limit)
}
