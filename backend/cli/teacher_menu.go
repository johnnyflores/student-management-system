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

	teacher.Name = utils.ReadString("Enter teacher name: ")
	teacher.Speciality = utils.ReadString("Enter teacher speciality: ")

	if strings.TrimSpace(teacher.Name) == "" {
		fmt.Println("Teacher name cannot be empty")
		return
	}

	if strings.TrimSpace(teacher.Speciality) == "" {
		fmt.Println("Teacher speciality cannot be empty")
		return
	}

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
		fmt.Println("Name:", teacher.Name)
		fmt.Println("Speciality:", teacher.Speciality)
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
	fmt.Println("Name:", teacher.Name)
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
	fmt.Println("Current name:", teacher.Name)
	fmt.Println("Current speciality:", teacher.Speciality)

	fmt.Println("\nPress Enter to keep the current value.")

	fmt.Printf("Enter new teacher name [%s]: ", teacher.Name)
	name := utils.ReadString("")

	fmt.Printf("Enter new teacher speciality [%s]: ", teacher.Speciality)
	speciality := utils.ReadString("")

	if strings.TrimSpace(name) == "" {
		name = teacher.Name
	}

	if strings.TrimSpace(speciality) == "" {
		speciality = teacher.Speciality
	}

	updatedTeacher := models.Teacher{
		ID:         teacher.ID,
		Name:       strings.TrimSpace(name),
		Speciality: strings.TrimSpace(speciality),
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
	fmt.Println("Name:", teacher.Name)
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
