package cli

import (
	"fmt"

	"student-management-system/services"
)

func Start(
	studentService *services.StudentService,
	teacherService *services.TeacherService,
	courseService *services.CourseService,
) {

	for {

		fmt.Println("\n===== Student Management System =====")
		fmt.Println("1. Student Management")
		fmt.Println("2. Teacher Management")
		fmt.Println("3. Course Management")
		fmt.Println("4. Exit")

		var choice int

		fmt.Print("Choose option: ")
		fmt.Scan(&choice)

		switch choice {

		case 1:
			studentMenu(studentService)

		case 2:
			teacherMenu(teacherService)

		case 3:
			courseMenu(courseService)

		case 4:
			fmt.Println("Goodbye!")
			return

		default:
			fmt.Println("Invalid option")
		}
	}
}
