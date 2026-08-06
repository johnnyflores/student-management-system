package utils

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
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