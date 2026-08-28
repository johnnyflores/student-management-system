package cli

import (
	"errors"
	"fmt"
	"student-management-system/utils"

	"student-management-system/models"
	"student-management-system/services"
)

func Start(studentService *services.StudentService, courseService *services.CourseService) {

	for {

		fmt.Println("\n===== Student Management System =====")
		fmt.Println("1. Student Management")
		fmt.Println("2. Course Management")
		fmt.Println("3. Exit")

		var choice int

		fmt.Print("Choose option: ")
		fmt.Scan(&choice)

		switch choice {

		case 1:
			studentMenu(studentService)

		case 2:
			courseMenu(courseService)

		case 3:
			fmt.Println("Goodbye!")
			return

		default:
			fmt.Println("Invalid option")
		}
	}
}

func studentMenu(service *services.StudentService) {

	for {

		fmt.Println("\n===== Student Management =====")
		fmt.Println("1. Add Student")
		fmt.Println("2. View Students")
		fmt.Println("3. Search Student")
		fmt.Println("4. Update Student")
		fmt.Println("5. Delete Student")
		fmt.Println("6. Back")

		var choice int

		fmt.Print("Choose option: ")
		fmt.Scan(&choice)

		switch choice {

		case 1:
			addStudent(service)

		case 2:
			viewStudents(service)

		case 3:
			searchStudent(service)

		case 4:
			updateStudent(service)

		case 5:
			deleteStudent(service)

		case 6:
			return

		default:
			fmt.Println("Invalid option")
		}
	}
}

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


func addStudent(service *services.StudentService) {
	student := models.Student{}

	student.Name = utils.ReadString("Enter name: ")
	student.Age = utils.ReadAge("Enter age: ")
	student.Grade = utils.ReadGrade("Enter grade: ")

	if service.AddStudent(&student) {
		if err := service.Save(); err != nil {
			fmt.Println("Error saving data:", err)
			return
		}

		fmt.Println("Student added successfully!")
		fmt.Println("Generated student ID:", student.ID)
	} else {
		fmt.Println("Failed to add student")
	}
}

func viewStudents(service *services.StudentService) {

	students := service.GetStudents()

	if len(students) == 0 {
		fmt.Println("No students found")
		return
	}

	for _, student := range students {

		fmt.Println("----------------")
		fmt.Println("ID:", student.ID)
		fmt.Println("Name:", student.Name)
		fmt.Println("Age:", student.Age)
		fmt.Println("Grade:", student.Grade)
	}
}

func searchStudent(service *services.StudentService) {

	fmt.Println("\n--- Search Student ---")
	fmt.Println("1. Search by ID")
	fmt.Println("2. Search by Name")

	var choice int
	fmt.Print("Choose option: ")
	fmt.Scan(&choice)

	switch choice {

	case 1:
		id := utils.ReadPositiveInt("Enter student ID: ")

		student := service.SearchStudent(id)

		if student == nil {
			fmt.Println("Student not found")
			return
		}

		printStudent(*student)

	case 2:
		name := utils.ReadString("Enter student name: ")

		students := service.SearchStudentsByName(name)

		if len(students) == 0 {
			fmt.Println("No students found")
			return
		}

		for _, student := range students {
			printStudent(student)
		}

	default:
		fmt.Println("Invalid option")
	}
}

func updateStudent(service *services.StudentService) {

	id := utils.ReadPositiveInt("Enter student ID to update: ")

	var student models.Student

	student.Name = utils.ReadString("Enter new name: ")
	student.Age = utils.ReadAge("Enter new age: ")
	student.Grade = utils.ReadGrade("Enter new grade: ")

	if service.UpdateStudent(id, student) {

		service.Save()

		fmt.Println("Student updated successfully!")

	} else {

		fmt.Println("Student not found")
	}
}

func deleteStudent(service *services.StudentService) {

	id := utils.ReadPositiveInt("Enter student ID to delete: ")

	if service.DeleteStudent(id) {

		service.Save()

		fmt.Println("Student deleted successfully")

	} else {

		fmt.Println("Student not found")
	}
}

func printStudent(student models.Student) {
	fmt.Println("----------------")
	fmt.Println("ID:", student.ID)
	fmt.Println("Name:", student.Name)
	fmt.Println("Age:", student.Age)
	fmt.Println("Grade:", student.Grade)
}

func addCourse(service *services.CourseService) {

	course := models.Course{}

	course.Name = utils.ReadString("Enter course name: ")
	course.Teacher = utils.ReadString("Enter teacher name: ")

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