package utils

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
	"student-management-system/models"
	"time"
)

var Reader = bufio.NewReader(os.Stdin)

func ReadString(message string) string {

	for {

		fmt.Print(message)

		text, _ := Reader.ReadString('\n')

		text = strings.TrimSpace(text)

		if text != "" {
			return text
		}

		fmt.Println("Input cannot be empty")
	}
}

func ReadInt(message string) int {

	for {

		value := ReadString(message)

		number, err := strconv.Atoi(value)

		if err == nil {
			return number
		}

		fmt.Println("Please enter a valid number")
	}
}

func ReadPositiveInt(message string) int {

	for {

		number := ReadInt(message)

		if number > 0 {
			return number
		}

		fmt.Println("Number must be greater than zero")
	}
}

func ReadGrade(message string) string {

	for {

		grade := ReadString(message)

		validGrades := map[string]bool{
			"A":  true,
			"A+": true,
			"B":  true,
			"B+": true,
			"C":  true,
			"D":  true,
			"F":  true,
		}

		if validGrades[grade] {
			return grade
		}

		fmt.Println("Invalid grade. Use A, A+, B, B+, C, D, or F")
	}
}

func ReadAge(message string) int {

	for {

		age := ReadInt(message)

		if age >= 1 && age <= 100 {
			return age
		}

		fmt.Println("Age must be between 1 and 100")
	}
}

func ReadDate(prompt string) time.Time {
	for {
		fmt.Print(prompt)

		input, err := Reader.ReadString('\n')
		if err != nil {
			fmt.Println("Invalid input. Please try again.")
			continue
		}

		input = strings.TrimSpace(input)

		date, err := time.Parse("2006-01-02", input)
		if err != nil {
			fmt.Println("Invalid date. Use YYYY-MM-DD.")
			continue
		}

		return date
	}
}

func ReadGradeLevel(prompt string) models.GradeLevel {
	for {
		fmt.Print(prompt)

		input, err := Reader.ReadString('\n')
		if err != nil {
			fmt.Println("Invalid input. Please try again.")
			continue
		}

		input = strings.TrimSpace(input)

		grade := models.GradeLevel(input)

		if grade.IsValid() {
			return grade
		}

		fmt.Println("Invalid grade. Please enter a grade from 1 to 12.")
	}
}

func ReadStudentStatus(prompt string) models.StudentStatus {
	for {
		fmt.Print(prompt)

		input, err := Reader.ReadString('\n')
		if err != nil {
			fmt.Println("Invalid input. Please try again.")
			continue
		}

		input = strings.ToLower(strings.TrimSpace(input))

		status := models.StudentStatus(input)

		if status.IsValid() {
			return status
		}

		fmt.Println("Invalid status. Use active, inactive, or graduated.")
	}
}
