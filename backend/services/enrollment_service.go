package services

import (
	"errors"
	"time"

	"student-management-system/models"
	"student-management-system/storage"
	"student-management-system/utils"
)

var (
	ErrStudentNotFound    = errors.New("student not found")
	ErrAlreadyEnrolled    = errors.New("student already enrolled")
	ErrEnrollmentNotFound = errors.New("student is not enrolled in this course")
)

type EnrollmentService struct {
	Enrollments    []models.Enrollment
	Repository     storage.EnrollmentRepository
	StudentService *StudentService
	CourseService  *CourseService
}

func (s *EnrollmentService) Enroll(
	courseID int,
	studentID int,
) error {

	if s.CourseService == nil {
		return ErrCourseNotFound
	}

	if s.StudentService == nil {
		return ErrStudentNotFound
	}

	if s.CourseService.SearchCourse(courseID) == nil {
		return ErrCourseNotFound
	}

	if s.StudentService.SearchStudent(studentID) == nil {
		return ErrStudentNotFound
	}

	if s.findEnrollmentIndex(courseID, studentID) != -1 {
		return ErrAlreadyEnrolled
	}

	enrollment := models.Enrollment{
		ID:         s.nextID(),
		CourseID:   courseID,
		StudentID:  studentID,
		EnrolledAt: time.Now(),
	}

	s.Enrollments = append(s.Enrollments, enrollment)

	if err := s.Save(); err != nil {
		s.Enrollments = s.Enrollments[:len(s.Enrollments)-1]
		return err
	}

	return nil
}

func (s *EnrollmentService) Unenroll(
	courseID int,
	studentID int,
) error {

	index := s.findEnrollmentIndex(courseID, studentID)

	if index == -1 {
		return ErrEnrollmentNotFound
	}

	original := s.Enrollments

	s.Enrollments = append(
		s.Enrollments[:index],
		s.Enrollments[index+1:]...,
	)

	if err := s.Save(); err != nil {
		s.Enrollments = original
		return err
	}

	return nil
}

func (s *EnrollmentService) GetByCourse(
	courseID int,
) []models.Enrollment {

	enrollments := make([]models.Enrollment, 0)

	for _, enrollment := range s.Enrollments {
		if enrollment.CourseID == courseID {
			enrollments = append(enrollments, enrollment)
		}
	}

	return enrollments
}

func (s *EnrollmentService) GetByStudent(
	studentID int,
) []models.Enrollment {

	enrollments := make([]models.Enrollment, 0)

	for _, enrollment := range s.Enrollments {
		if enrollment.StudentID == studentID {
			enrollments = append(enrollments, enrollment)
		}
	}

	return enrollments
}

func (s *EnrollmentService) findEnrollmentIndex(
	courseID int,
	studentID int,
) int {

	for i, enrollment := range s.Enrollments {
		if enrollment.CourseID == courseID &&
			enrollment.StudentID == studentID {
			return i
		}
	}

	return -1
}

func (s *EnrollmentService) nextID() int {

	maxID := 0

	for _, enrollment := range s.Enrollments {
		if enrollment.ID > maxID {
			maxID = enrollment.ID
		}
	}

	return maxID + 1
}

func (s *EnrollmentService) Save() error {
	return s.Repository.Save(s.Enrollments)
}

func (s *EnrollmentService) Load() error {

	enrollments, err := s.Repository.Load()

	if err != nil {
		return err
	}

	s.Enrollments = enrollments

	return nil
}

func (s *EnrollmentService) GetEnrollmentsPaginated(
	courseID int,
	page int,
	limit int,
) models.Paginated[models.Enrollment] {
	courseEnrollments := s.GetByCourse(courseID)

	return utils.Paginate(courseEnrollments, page, limit)
}
