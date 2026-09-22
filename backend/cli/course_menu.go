package cli

import (
	"errors"
	"fmt"

	"student-management-system/models"
	"student-management-system/services"
	"student-management-system/utils"
)

func courseMenu(
	courseService *services.CourseService,
	enrollmentService *services.EnrollmentService,
) {
	for {
		fmt.Println("\n===== Course Management =====")
		fmt.Println("1. Create Course")
		fmt.Println("2. View Courses")
		fmt.Println("3. Enroll Student")
		fmt.Println("4. Unenroll Student")
		fmt.Println("5. View Course Enrollments")
		fmt.Println("6. Back")

		var choice int

		fmt.Print("Choose option: ")
		fmt.Scan(&choice)

		switch choice {

		case 1:
			addCourse(courseService)

		case 2:
			viewCourses(
				courseService,
				enrollmentService,
			)

		case 3:
			enrollStudent(enrollmentService)

		case 4:
			unenrollStudent(enrollmentService)

		case 5:
			viewCourseEnrollments(
				courseService,
				enrollmentService,
			)

		case 6:
			return

		default:
			fmt.Println("Invalid option")
		}
	}
}

func addCourse(service *services.CourseService) {
	course := models.Course{}

	course.Name = utils.ReadString("Enter course name: ")

	if service.TeacherService == nil {
		fmt.Println("Teacher service is unavailable")
		return
	}

	fmt.Println("\n===== Available Teachers =====")

	teachers := service.TeacherService.GetTeachers()

	if len(teachers) == 0 {
		fmt.Println("No teachers available")
		return
	}

	for _, teacher := range teachers {
		fmt.Printf(
			"%d - %s %s (%s)\n",
			teacher.ID,
			teacher.FirstName,
			teacher.LastName,
			teacher.Speciality,
		)
	}

	teacherID := utils.ReadInt("Enter teacher ID: ")

	teacher := service.TeacherService.SearchTeacher(teacherID)

	if teacher == nil {
		fmt.Println("Teacher not found")
		return
	}

	course.TeacherID = teacherID

	if service.AddCourse(&course) {

		if err := service.Save(); err != nil {
			fmt.Println("Error saving course:", err)
			return
		}

		fmt.Println("Course added successfully!")
		fmt.Println("Generated course ID:", course.ID)

	} else {
		fmt.Println("Failed to add course")
	}
}

func viewCourses(
	courseService *services.CourseService,
	enrollmentService *services.EnrollmentService,
) {
	courses := courseService.GetCourses()

	if len(courses) == 0 {
		fmt.Println("No courses found")
		return
	}

	for _, course := range courses {
		fmt.Println("----------------")
		fmt.Println("ID:", course.ID)
		fmt.Println("Name:", course.Name)
		fmt.Println("Teacher ID:", course.TeacherID)

		enrollments := enrollmentService.GetByCourse(course.ID)

		fmt.Println("Students:", len(enrollments))

		for _, enrollment := range enrollments {
			fmt.Println("  Student ID:", enrollment.StudentID)
			fmt.Println("  Enrolled At:", enrollment.EnrolledAt)
		}
	}
}

func enrollStudent(service *services.EnrollmentService) {
	fmt.Println("\n--- Enroll Student in Course ---")

	courseID := utils.ReadPositiveInt("Enter course ID: ")
	studentID := utils.ReadPositiveInt("Enter student ID: ")

	err := service.Enroll(courseID, studentID)

	if err != nil {
		switch {
		case errors.Is(err, services.ErrCourseNotFound):
			fmt.Println("Course not found")

		case errors.Is(err, services.ErrStudentNotFound):
			fmt.Println("Student not found")

		case errors.Is(err, services.ErrAlreadyEnrolled):
			fmt.Println("Student is already enrolled in this course")

		default:
			fmt.Println("Could not enroll student:", err)
		}

		return
	}

	fmt.Println("Student enrolled successfully!")
}

func unenrollStudent(service *services.EnrollmentService) {
	fmt.Println("\n--- Unenroll Student from Course ---")

	courseID := utils.ReadPositiveInt("Enter course ID: ")
	studentID := utils.ReadPositiveInt("Enter student ID: ")

	err := service.Unenroll(courseID, studentID)

	if err != nil {
		switch {
		case errors.Is(err, services.ErrEnrollmentNotFound):
			fmt.Println("Student is not enrolled in this course")

		default:
			fmt.Println("Could not unenroll student:", err)
		}

		return
	}

	fmt.Println("Student unenrolled successfully!")
}

func viewCourseEnrollments(
	courseService *services.CourseService,
	enrollmentService *services.EnrollmentService,
) {
	fmt.Println("\n--- View Course Enrollments ---")

	courseID := utils.ReadPositiveInt("Enter course ID: ")

	course := courseService.SearchCourse(courseID)

	if course == nil {
		fmt.Println("Course not found")
		return
	}

	fmt.Println("\nCourse ID:", course.ID)
	fmt.Println("Course Name:", course.Name)
	fmt.Println("Teacher ID:", course.TeacherID)

	enrollments := enrollmentService.GetByCourse(courseID)

	if len(enrollments) == 0 {
		fmt.Println("No students enrolled in this course")
		return
	}

	fmt.Println("\n--- Enrolled Students ---")

	for _, enrollment := range enrollments {
		student := enrollmentService.StudentService.SearchStudent(
			enrollment.StudentID,
		)

		fmt.Println("----------------")

		if student == nil {
			fmt.Println("Student ID:", enrollment.StudentID)
			fmt.Println("Student not found")
			continue
		}

		printStudent(*student)
	}
}
