package services

import "student-management-system/models"

type DashboardService struct {
	StudentService    *StudentService
	TeacherService    *TeacherService
	CourseService     *CourseService
	EnrollmentService *EnrollmentService
}

func (s *DashboardService) GetStats() models.DashboardStats {
	return models.DashboardStats{
		Students:    len(s.StudentService.Students),
		Teachers:    len(s.TeacherService.Teachers),
		Courses:     len(s.CourseService.Courses),
		Enrollments: len(s.EnrollmentService.Enrollments),
	}
}