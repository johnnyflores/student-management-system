package cli

import (
	
	"fmt"
	"student-management-system/utils"

	"student-management-system/models"
	"student-management-system/services"
	"student-management-system/storage"
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
			storage.SaveStudents(service.Students)
			fmt.Println("Goodbye!")
			return

		default:
			fmt.Println("Invalid option")
		}
	}
}

func addStudent(service *services.StudentService) {

	id := utils.ReadPositiveInt("Enter student ID: ")

	student := models.Student{ID: id}

	student.Name = utils.ReadString("Enter name: ")

	student.Age = utils.ReadAge("Enter age: ")
	student.Grade = utils.ReadGrade("Enter grade: ")

	if service.AddStudent(student) {

		storage.SaveStudents(service.Students)

		fmt.Println("Student added successfully!")

	} else {

		fmt.Println("Student ID already exists")
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

	var id int

	fmt.Print("Enter student ID: ")
	fmt.Scan(&id)

	student := service.SearchStudent(id)

	if student == nil {

		fmt.Println("Student not found")
		return
	}

	fmt.Println("Student found:")
	fmt.Println("ID:", student.ID)
	fmt.Println("Name:", student.Name)
	fmt.Println("Age:", student.Age)
	fmt.Println("Grade:", student.Grade)
}

func updateStudent(service *services.StudentService) {

	id := utils.ReadPositiveInt("Enter student ID to update: ")


	var student models.Student

	student.Name = utils.ReadString("Enter new name: ")
	student.Age = utils.ReadAge("Enter new age: ")
	student.Grade = utils.ReadGrade("Enter new grade: ")


	if service.UpdateStudent(id, student) {

		storage.SaveStudents(service.Students)

		fmt.Println("Student updated successfully!")

	} else {

		fmt.Println("Student not found")
	}
}

func deleteStudent(service *services.StudentService) {

	var id int

	fmt.Print("Enter student ID to delete: ")
	fmt.Scan(&id)

	if service.DeleteStudent(id) {

		storage.SaveStudents(service.Students)

		fmt.Println("Student deleted successfully")

	} else {

		fmt.Println("Student not found")
	}
}
