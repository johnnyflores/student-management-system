package cli

import (
	"fmt"
	"student-management-system/utils"

	"student-management-system/models"
	"student-management-system/services"
)

func Start(service *services.StudentService) {

	for {

		fmt.Println("\n===== Student Management System =====")
		fmt.Println("1. Add Student")
		fmt.Println("2. View Students")
		fmt.Println("3. Search Student")
		fmt.Println("4. Update Student")
		fmt.Println("5. Delete Student")
		fmt.Println("6. Exit")

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

			err := service.Save()

			if err != nil {
				fmt.Println("Error saving data:", err)
			}

			fmt.Println("Goodbye!")
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