package main

import "fmt"

type Student struct {
	ID   int
	Name string
	Age int
	Grade string
}

var students []Student

func main() {

	for {

		fmt.Println("\n===== Student Management System =====")
		addStudent()
		viewStudents()
		searchStudent()
		updateStudent()
		fmt.Println("5. Delete Student")
		fmt.Println("6. Exit")

		var choice int

		fmt.Print("Choose an option: ")
		fmt.Scan(&choice)

		switch choice {

		case 1:
			fmt.Println("Add Student selected")

		case 2:
			fmt.Println("View Student selected")

		case 3:
			fmt.Println("Search Student selected")

		case 4:
			fmt.Println("Update Student selected")

		case 5:
			fmt.Println("Delete Student selected")

		case 6:
			fmt.Println("Goodbye!")
			return

		default:
			fmt.Println("Invalid option")
		}
	}
}

func addStudent() {

	var student Student

	fmt.Print("Enter ID: ")
	fmt.Scan(&student.ID)

	fmt.Print("Enter Name: ")
	fmt.Scan(&student.Name)

	fmt.Print("Enter Age: ")
	fmt.Scan(&student.Age)

	fmt.Print("Enter Grade: ")
	fmt.Scan(&student.Grade)

	students = append(students, student)

	fmt.Println("Student added successfully!")
}

func viewStudents() {

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

func searchStudent() {
	var id int

	fmt.Print("Enter ID to search: ")
	fmt.Scan(&id)

	for _, student := range students {
		if student.ID == id {
			fmt.Println("\nStudent Found")
			fmt.Println("----------------")
			fmt.Println("ID:", student.ID)
			fmt.Println("Name:", student.Name)
			fmt.Println("Age:", student.Age)
			fmt.Println("Grade:", student.Grade)

			return
		}
	}
	fmt.Println("Student not found")
}

func updateStudent() {
	var id int

	fmt.Print("Enter ID to update: ")
	fmt.Scan(&id)

	for i, student := range students {
		if student.ID == id {
			fmt.Println("Student found. Enter new details: ")

			fmt.Print("Enter new name:")
			fmt.Scan(&students[i].Name)

			fmt.Print("Enter new age:")
			fmt.Scan(&students[i].Age)

			fmt.Print("Enter new grade:")
			fmt.Scan(&students[i].Grade)

			fmt.Println("Student updated successfully!")
			return
		}
	}
	fmt.Println("Student not found")
}