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

	print(message)

	text, _ := Reader.ReadString('\n')

	return strings.TrimSpace(text)
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