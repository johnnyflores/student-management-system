package cli

import (
	"fmt"
	"strings"

	"student-management-system/models"
	"student-management-system/services"
	"student-management-system/utils"
)

func teacherMenu(service *services.TeacherService) {

	for {

		fmt.Println("\n===== Teacher Management =====")
		fmt.Println("1. Add Teacher")
		fmt.Println("2. View Teachers")
		fmt.Println("3. Search Teacher")
		fmt.Println("4. Update Teacher")
		fmt.Println("5. Delete Teacher")
		fmt.Println("6. Back")

		var choice int

		fmt.Print("Choose option: ")
		fmt.Scan(&choice)

		switch choice {

		case 1:
			addTeacher(service)

		case 2:
			viewTeachers(service)

		case 3:
			searchTeacher(service)

		case 4:
			updateTeacher(service)

		case 5:
			deleteTeacher(service)

		case 6:
			return

		default:
			fmt.Println("Invalid option")
		}
	}
}

func addTeacher(service *services.TeacherService) {
	teacher := models.Teacher{}

	teacher.FirstName = utils.ReadString("Enter teacher first name: ")
	teacher.LastName = utils.ReadString("Enter teacher last name: ")
	teacher.Email = utils.ReadString("Enter teacher email: ")
	specialityInput := strings.TrimSpace(utils.ReadString("Enter teacher speciality: "))

	firstName := strings.TrimSpace(teacher.FirstName)
	lastName := strings.TrimSpace(teacher.LastName)
	email := strings.TrimSpace(teacher.Email)
	teacher.Speciality = models.TeacherSpeciality(specialityInput)

	if firstName == "" {
		fmt.Println("Teacher first name cannot be empty")
		return
	}

	if lastName == "" {
		fmt.Println("Teacher last name cannot be empty")
		return
	}

	if email == "" {
		fmt.Println("Teacher email cannot be empty")
		return
	}

	if !teacher.Speciality.IsValid() {
		fmt.Println("Invalid or missing teacher speciality: ")
		fmt.Println("Allowed specialities: Engineering, Programming, Mathematics, Chemistry, Psychology, Biology")
		return
	}

	teacher.FirstName = strings.TrimSpace(teacher.FirstName)
	teacher.LastName = strings.TrimSpace(teacher.LastName)
	teacher.Email = strings.TrimSpace(teacher.Email)
	teacher.Speciality = models.TeacherSpeciality(strings.TrimSpace(string(teacher.Speciality)))

	if service.AddTeacher(&teacher) {

		if err := service.Save(); err != nil {
			fmt.Println("Error saving teacher:", err)
			return
		}

		fmt.Println("Teacher added successfully!")
		fmt.Println("Generated teacher ID:", teacher.ID)

	} else {
		fmt.Println("Failed to add teacher")
	}
}

func viewTeachers(service *services.TeacherService) {
	teachers := service.GetTeachers()

	if len(teachers) == 0 {
		fmt.Println("No teachers found")
		return
	}

	fmt.Println("\n===== Teachers =====")

	for _, teacher := range teachers {
		fmt.Println("------------------------------")
		fmt.Println("ID:", teacher.ID)
		fmt.Println("First Name:", teacher.FirstName)
		fmt.Println("Last Name:", teacher.LastName)
		fmt.Println("Email:", teacher.Email)
		fmt.Println("Speciality:", teacher.Speciality)
		fmt.Println("Created At:", teacher.CreatedAt.Format("2006-01-02 15:04:05"))
		fmt.Println("Updated At:", teacher.UpdatedAt.Format("2006-01-02 15:04:05"))
	}

	fmt.Println("------------------------------")
}

func searchTeacher(service *services.TeacherService) {
	id := utils.ReadInt("Enter teacher ID: ")

	teacher := service.SearchTeacher(id)

	if teacher == nil {
		fmt.Println("Teacher not found")
		return
	}

	fmt.Println("\n===== Teacher =====")
	fmt.Println("ID:", teacher.ID)
	fmt.Println("First Name:", teacher.FirstName)
	fmt.Println("Last Name:", teacher.LastName)
	fmt.Println("Email:", teacher.Email)
	fmt.Println("Speciality:", teacher.Speciality)
}

func updateTeacher(service *services.TeacherService) {
	id := utils.ReadInt("Enter teacher ID: ")

	teacher := service.SearchTeacher(id)

	if teacher == nil {
		fmt.Println("Teacher not found")
		return
	}

	fmt.Println("\n===== Update Teacher =====")
	fmt.Println("Current first name:", teacher.FirstName)
	fmt.Println("Current last name:", teacher.LastName)
	fmt.Println("Current email:", teacher.Email)
	fmt.Println("Current speciality:", teacher.Speciality)

	fmt.Println("\nPress Enter to keep the current value.")

	fmt.Printf("Enter new first name [%s]: ", teacher.FirstName)
	firstName := utils.ReadString("")

	fmt.Printf("Enter new last name [%s]: ", teacher.LastName)
	lastName := utils.ReadString("")

	fmt.Printf("Enter new email [%s]: ", teacher.Email)
	email := utils.ReadString("")

	fmt.Printf("Enter new speciality [%s]: ", teacher.Speciality)
	specialityInput := utils.ReadString("")

	firstName = strings.TrimSpace(firstName)
	lastName = strings.TrimSpace(lastName)
	email = strings.TrimSpace(email)
	specialityInput = strings.TrimSpace(specialityInput)

	if firstName == "" {
		firstName = teacher.FirstName
	}

	if lastName == "" {
		lastName = teacher.LastName
	}

	if email == "" {
		email = teacher.Email
	}

	speciality := teacher.Speciality

	if specialityInput != "" {
		speciality = models.TeacherSpeciality(specialityInput)

		if !speciality.IsValid() {
			fmt.Println("Invalid teacher speciality")
			fmt.Println("Allowed specialities: Engineering, Programming, Mathematics, Chemistry, Psychology, Biology")
			return
		}
	}

	updatedTeacher := models.Teacher{
		ID:         teacher.ID,
		FirstName:  strings.TrimSpace(firstName),
		LastName:   strings.TrimSpace(lastName),
		Email:      strings.TrimSpace(email),
		Speciality: speciality,
	}

	success := service.UpdateTeacher(id, updatedTeacher)

	if !success {
		fmt.Println("Failed to update teacher")
		return
	}

	if err := service.Save(); err != nil {
		fmt.Println("Error saving teacher:", err)
		return
	}

	fmt.Println("Teacher updated successfully!")
}

func deleteTeacher(service *services.TeacherService) {
	id := utils.ReadInt("Enter teacher ID: ")

	teacher := service.SearchTeacher(id)

	if teacher == nil {
		fmt.Println("Teacher not found")
		return
	}

	fmt.Println("\n===== Teacher =====")
	fmt.Println("ID:", teacher.ID)
	fmt.Println("First Name:", teacher.FirstName)
	fmt.Println("Last Name:", teacher.LastName)
	fmt.Println("Email:", teacher.Email)
	fmt.Println("Speciality:", teacher.Speciality)

	confirmation := utils.ReadString(
		"Are you sure you want to delete this teacher? (y/n): ",
	)

	if strings.ToLower(strings.TrimSpace(confirmation)) != "y" {
		fmt.Println("Delete cancelled")
		return
	}

	success := service.DeleteTeacher(id)

	if !success {
		fmt.Println("Failed to delete teacher")
		return
	}

	if err := service.Save(); err != nil {
		fmt.Println("Error saving teacher:", err)
		return
	}

	fmt.Println("Teacher deleted successfully!")
}
