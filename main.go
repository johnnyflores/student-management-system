package main

import "fmt"
func init() {
	loadStudents()
}

type Student struct {
	ID   int
	Name string
	Age int
	Grade string
}

var students []Student

func main() {

	loadStudents()

	for {

		fmt.Println("\n===== Student Management System =====")
		fmt.Println("1. Add Student")
		fmt.Println("2. View Students")
		fmt.Println("3. Search Student")
		fmt.Println("4. Update Student")
		fmt.Println("5. Delete Student")
		fmt.Println("6. Exit")

		var choice int

		fmt.Print("Choose an option: ")
		fmt.Scan(&choice)

		switch choice {

		case 1:
			addStudent()

		case 2:
			viewStudents()

		case 3:
			searchStudent()

		case 4:
			updateStudent()

		case 5:
			deleteStudent()

		case 6:
			fmt.Println("Goodbye!")
			return
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
	saveStudents()

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

			saveStudents()
			fmt.Println("Student updated successfully!")
			return
		}
	}
	fmt.Println("Student not found")
}

func deleteStudent() {
	var id int

	fmt.Print("Enter student ID to delete: ")
	fmt.Scan(&id)

	for i, student := range students {
		if student.ID == id {
			students = append(students[:i], students[i+1:]...)
			saveStudents()

			fmt.Println("Student deleted successfully!")

			return
		}
	}

	fmt.Println("Student not found")
}

