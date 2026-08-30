package cli

import (
	"errors"
	"fmt"

	"student-management-system/models"
	"student-management-system/services"
	"student-management-system/utils"
)

func courseMenu(service *services.CourseService) {

	for {

		fmt.Println("\n===== Course Management =====")
		fmt.Println("1. Create Course")
		fmt.Println("2. View Courses")
		fmt.Println("3. Assign Student")
		fmt.Println("4. Remove Student")
		fmt.Println("5. View Courses Students")
		fmt.Println("6. Back")

		var choice int

		fmt.Print("Choose option: ")
		fmt.Scan(&choice)

		switch choice {

		case 1:
			addCourse(service)

		case 2:
			viewCourses(service)

		case 3:
			assignStudent(service)

		case 4:
			removeStudent(service)

		case 5:
			viewCourseStudents(service)

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
			"%d - %s (%s)\n",
			teacher.ID,
			teacher.Name,
			teacher.Speciality,
		)
	}

	teacherID := utils.ReadInt("Enter teacher ID: ")

	teacher := service.TeacherService.SearchTeacher(teacherID)

	if teacher == nil {
		fmt.Println("Teacher not found")
		return
	}

	course.Teacher = teacherID

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

func viewCourses(service *services.CourseService) {

	courses := service.GetCourses()

	if len(courses) == 0 {
		fmt.Println("No courses found")
		return
	}

	for _, course := range courses {

		fmt.Println("----------------")
		fmt.Println("ID:", course.ID)
		fmt.Println("Name:", course.Name)
		fmt.Println("Teacher:", course.Teacher)
		fmt.Println("Students:", len(course.Students))
	}
}

func assignStudent(service *services.CourseService) {

	fmt.Println("\n--- Assign Student to Course ---")

	courseID := utils.ReadPositiveInt("Enter course ID: ")
	studentID := utils.ReadPositiveInt("Enter student ID: ")

	err := service.AssignStudent(courseID, studentID)

	if err != nil {

		switch {
		case errors.Is(err, services.ErrCourseNotFound):
			fmt.Println("Course not found")

		case errors.Is(err, services.ErrStudentNotFound):
			fmt.Println("Student not found")

		case errors.Is(err, services.ErrAlreadyEnrolled):
			fmt.Println("Student is already enrolled in this course")

		default:
			fmt.Println("Could not assign student:", err)
		}

		return
	}

	if err := service.Save(); err != nil {
		fmt.Println("Error saving course:", err)
		return
	}

	fmt.Println("Student assigned successfully!")
}

func removeStudent(service *services.CourseService) {

	fmt.Println("\n--- Remove Student from Course ---")

	courseID := utils.ReadPositiveInt("Enter course ID: ")
	studentID := utils.ReadPositiveInt("Enter student ID: ")

	err := service.RemoveStudent(courseID, studentID)

	if err != nil {

		switch {
		case errors.Is(err, services.ErrCourseNotFound):
			fmt.Println("Course not found")

		case errors.Is(err, services.ErrEnrollmentNotFound):
			fmt.Println("Student is not enrolled in this course")

		default:
			fmt.Println("Could not remove student:", err)
		}

		return
	}

	if err := service.Save(); err != nil {
		fmt.Println("Error saving course:", err)
		return
	}

	fmt.Println("Student removed successfully!")
}

func viewCourseStudents(service *services.CourseService) {

	fmt.Println("\n--- View Course Students ---")

	courseID := utils.ReadPositiveInt("Enter course ID: ")

	course := service.SearchCourse(courseID)

	if course == nil {
		fmt.Println("Course not found")
		return
	}

	fmt.Println("\nCourse ID:", course.ID)
	fmt.Println("Course Name:", course.Name)
	fmt.Println("Teacher:", course.Teacher)

	if len(course.Students) == 0 {
		fmt.Println("No students enrolled in this course")
		return
	}

	fmt.Println("\n--- Enrolled Students ---")

	for _, studentID := range course.Students {

		student := service.StudentService.SearchStudent(studentID)

		if student == nil {
			fmt.Println("----------------")
			fmt.Println("Student ID:", studentID)
			fmt.Println("Student not found")
			continue
		}

		printStudent(*student)
	}
}
